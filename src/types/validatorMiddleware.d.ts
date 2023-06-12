export type ValidatorConstructor<T> = {
    Model: new () => T;
    handler: (dto: T, callback?: ((data: any) => void) | undefined, headers?: any, req?: any, res?: any, sender?: any) => any;
};
