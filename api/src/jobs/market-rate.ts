import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { Price } from "../@types";
import { Service } from "typedi";

@Service("market.price")
export class MarketPrice {
  private readonly baseUrl: string = "https://api.coingecko.com";

  public request: AxiosInstance;

  constructor(options?: AxiosRequestConfig) {
    this.request = axios.create({ baseURL: this.baseUrl, ...options });
  }
  /**
   * Gets crypto market price
   * @param {string} quote quote currency eg.bitcoin,ripple etc
   * @param  {string} base base currency eg. usd,gbp etc
   * @returns {Promise<AxiosResponse<Price>>}
   */
  public getPrice(
    quote: string,
    base: string = "usd"
  ): Promise<AxiosResponse<Price>> {
    return this.request.get<Price>(`/api/v3/simple/price`, {
      params: { ids: quote, vs_currencies: base },
    });
  }
}
