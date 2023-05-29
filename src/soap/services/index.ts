import soap from "soap";
import { celsiusToFahrenheit } from "./TempConvert/TempConvertSoap/CelsiusToFahrenheit.js";
import { fahrenheitToCelsius } from "./TempConvert/TempConvertSoap/FahrenheitToCelsius.js";

const services: soap.IServices = {};

services.TempConvert = {
    TempConvertSoap: {
        FahrenheitToCelsius: fahrenheitToCelsius,
        CelsiusToFahrenheit: celsiusToFahrenheit
    }
};

Object.freeze(services);

export default services;
