import { transports } from "winston";
import { consoleTransportStreamOptons, logger } from ".";

export const httpLogger = logger({ filename: "http.log", level: "http" });

httpLogger.add(new transports.Console(consoleTransportStreamOptons("http")));

export const stream = {
  write(message: string) {
    httpLogger.http(message);
  },
};
