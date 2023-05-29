import soap from "soap";

export const fahrenheitToCelsius: soap.ISoapServiceMethod = (args, callback) => {
    const { Fahrenheit } = args;
    return (Fahrenheit - 32) * (5 / 9);
};
