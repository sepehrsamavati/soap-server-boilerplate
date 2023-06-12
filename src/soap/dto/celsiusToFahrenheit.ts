import { Type } from "class-transformer";
import { IsDefined, IsNumber } from "class-validator";

export default class CelsiusToFahrenheitDTO {
    @Type(() => Number) // type convert (runtime)
    @IsDefined()        // required (runtime)
    @IsNumber()         // check type (runtime)
    Celsius!: number;   // will fill later, type is number (code only)
}