import Validator from "../../../middlewares/validator.js";
import CelsiusToFahrenheitDTO from "../../../dto/celsiusToFahrenheit.js";

export const celsiusToFahrenheit = new Validator({
    Model: CelsiusToFahrenheitDTO,
    handler: (data) => {
        const { Celsius } = data;
        return (Celsius * (9 / 5)) + 32;
    }
}).handler;
