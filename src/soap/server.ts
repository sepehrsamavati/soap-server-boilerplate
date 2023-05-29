import soap from "soap";
import fs from "node:fs/promises";
import config from "../config.js";
import services from "./services/index.js";
import { logger } from "../helpers/logger.js";
import ExitHelper from "../helpers/exitHelper.js";
import { ExpressApplication } from "../api/app.js";

const exitHelper = new ExitHelper(process);

const expressApp = new ExpressApplication();
const httpServer = expressApp.initServer();

const wsdlXmlAsBuffer = await fs.readFile(config.wsdl);
const wsdlXml = wsdlXmlAsBuffer.toString();

const server = soap.listen(httpServer, config.soapPath, services, wsdlXml, () => {
    logger.info("SOAP server ready");
    expressApp.finalizeServer();
});

exitHelper.bindExitHandler();
