import soap from "soap";

export const celsiusToFahrenheit: soap.ISoapServiceMethod = (args, callback) => {
    const { Celsius } = args;
    return (Celsius * (9 / 5)) + 32;
};
