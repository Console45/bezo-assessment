import { Service } from "typedi";
import { createHmac } from "crypto";
import axios, { AxiosInstance, AxiosResponse } from "axios";
import { CoinbaseClientOpts, Header, Signature } from "src/@types";

@Service("coinbase.client")
export class Coinbase {
  private readonly APIKEY: string;
  private readonly APISECRET: string;
  private readonly baseUrl: string = "https://api.coinbase.com/";
  private readonly apiVersion: string | null = null;
  public requestInstance: AxiosInstance;

  /**
   * Coinbase client
   * =================
   * initialize Coinbase client with api key and secret
   * @param CoinbaseClientOpts Coinbase client options
   */
  constructor({ apiKey, apiSecret, apiVersion }: CoinbaseClientOpts) {
    this.APIKEY = apiKey;
    this.APISECRET = apiSecret;
    if (apiVersion) {
      this.apiVersion = apiVersion;
    }
    this.requestInstance = axios.create({ baseURL: this.baseUrl });
  }
  /**
   * Signs Coinbase api request
   * @param method request method(http verb)
   * @param path request path url(api url path extending the base url)
   * @param body request body
   * @returns {Signature}
   */
  private createSignature(
    method: string,
    path: string,
    body: any = ""
  ): Signature {
    const timestamp = Math.floor(Date.now() / 1000);
    const message: string = timestamp + method + path + body;
    const signature = createHmac("sha256", this.APISECRET)
      .update(message)
      .digest("hex");
    return {
      signature,
      timestamp,
    };
  }
  /**
   * Create and return a coinbase request header
   * @param signature request signature
   * @param timestamp request timestamp
   * @returns {Header}
   */
  private createRequestHeader(signature: string, timestamp: number): Header {
    return {
      "CB-ACCESS-SIGN": signature,
      "CB-ACCESS-TIMESTAMP": timestamp,
      "CB-ACCESS-KEY": this.APIKEY,
      "CB-VERSION": this.apiVersion,
    };
  }

  /**
   * Create get request
   * @param path api url path
   * @returns {Promise<AxiosResponse<T>>}
   */
  public getRequest<T>(path: string): Promise<AxiosResponse<T>> {
    const { signature, timestamp } = this.createSignature("GET", path);
    return this.requestInstance.get<T>(path, {
      headers: this.createRequestHeader(signature, timestamp),
    });
  }

  /**
   * Create post request
   * @param path api url path
   * @param body request body
   * @returns {Promise<AxiosResponse<T>>}
   */
  public postRequest<T>(path: string, body: any): Promise<AxiosResponse<T>> {
    const { signature, timestamp } = this.createSignature("POST", path, body);
    return this.requestInstance.post<T>(path, body, {
      headers: this.createRequestHeader(signature, timestamp),
    });
  }
}
