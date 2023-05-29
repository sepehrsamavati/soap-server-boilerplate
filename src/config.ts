import * as dotenv from "dotenv";
dotenv.config();

const config = Object.freeze({
    isDevelopment: process.env.NODE_ENV !== "production",
    alwaysConsoleLog: false,
    port: parseInt(process.env.SOAP_SERVER_PORT ?? '5055'),
    soapPath: process.env.SOAP_SERVICE_PATH ?? "/",
    wsdl: process.env.SOAP_SERVICE_WSDL ?? "WSDL.xml"
});

export default config;
