import express from "express";
import config from "../config.js";
import { Server } from "node:http";
import { logger } from "../helpers/logger.js";
import { errorRequestHandler, notFoundHandler } from "./errorHandlers.js";

export class ExpressApplication {
    #app: express.Application = express();
    #server?: Server;

    initServer() {
        if (this.#server) return this.#server;

        this.#server = this.#app.listen(config.port);
        this.#server.once("listening", () => {
            logger.info(`Express listening on http://127.0.0.1:${config.port}`);
        });

        return this.#server;
    }

    finalizeServer() {
        if (this.#server) return;

        this.#attachErrorHandlers();
    }

    #attachErrorHandlers() {
        this.#app.use(notFoundHandler);
        this.#app.use(errorRequestHandler);
    }
}
