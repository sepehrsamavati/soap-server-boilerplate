import soap from "soap";
import { validateSync } from "class-validator";
import { plainToClass } from "class-transformer";
import { ValidatorConstructor } from "../../types/validatorMiddleware";

export default class Validator<T extends object> {
    #Model: new () => T;
    #nextHandler: Function;

    constructor({ Model, handler }: ValidatorConstructor<T>) {
        this.#Model = Model;
        this.#nextHandler = handler;
    }

    get handler (): soap.ISoapServiceMethod {
        const validator = this;
        return (data: unknown, ...others: any[]) => {
            const instance = validator.#createInstance(data);
            const errors = validateSync(instance);
    
            if (errors.length)
                return "Bad request";
            else
                return validator.#nextHandler(instance, ...others);
        };
    }

    #createInstance(rawData: unknown): T {
        return plainToClass(this.#Model, rawData) ?? new this.#Model();
    }
}