import { transports } from "winston";
import { consoleTransportStreamOptons, logger } from ".";

export const authLogger = logger({ filename: "auth.log" });

authLogger.add(new transports.Console(consoleTransportStreamOptons("info")));
