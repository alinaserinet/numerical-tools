import {simple, Fraction} from "./fraction";

export default function (recurring: string | number, decimal: string | number = ''): Fraction {
    const recurringLength: number = recurring.toString().length;
    const decimalLength: number = decimal.toString().length;

    const decimalRatio: number = 10 ** decimalLength;
    const recurringRatio: number = 10 ** recurringLength;

    const xRatio: number = decimalRatio * recurringRatio;
    const denominator: number = xRatio - decimalRatio;

    if (typeof decimal === "string") {
        decimal = parseInt(decimal) || 0;
    }

    const combineDecimals: number = parseInt(decimal + '' + recurring) || 0;
    const numerator: number = combineDecimals - decimal;

    return simple({numerator, denominator});
}