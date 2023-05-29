import { logger } from "./logger.js";

type Disposables = undefined;

export default class ExitHelper {
    #process: NodeJS.Process;
    // #propName;

    #sigintCalls = 0;
    #bound = false;
    static readonly forceShutdownCalls = 3;

    constructor(p: NodeJS.Process, disposables?: Disposables) {
        this.#process = p;
        // this.#propName = disposables.;
    }

    async #cleanup(timeout = 0) {
        let timer: NodeJS.Timeout | null = null;
        if(timeout) timer = setTimeout(() => {
            logger.info("Connection cleanup timeout! Force shutdown...");
            this.#process.exit(1);
        }, timeout).unref();

        /*
            Do cleanups
        */

        if(timer)
            clearTimeout(timer);

        return;
    }

    async shutdown (reason: string | number) {
        logger.info("🔴 Exiting application,", typeof reason === "number" ? `exit code: ${reason}` : `reason: '${reason}'`);
        await this.#cleanup(10000);
        this.#process.exit(typeof reason === "number" ? reason : 1);
    };

    bindExitHandler() {
        if(this.#bound) return;

        this.#process.on("SIGINT", async () => {
            if (this.#sigintCalls === 0) {
                logger.info("Shutting down...");
                await this.#cleanup();
                this.#process.exit(0);
            }
            else
                console.log(`Force shutdown ${this.#sigintCalls}/${ExitHelper.forceShutdownCalls}`);

            if (this.#sigintCalls >= ExitHelper.forceShutdownCalls) this.#process.exit();

            this.#sigintCalls++;
        });

        this.#process.on("beforeExit", (exitCode: number) => {
            logger.info(`Exit code: ${exitCode}`);
        });
    }
}