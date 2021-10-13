import {Fraction, isEqual, mix, multi, recurring} from "../decimal";

class Decimal {
    private readonly number: number | string;
    private integer: number = 0;
    private decimal: number | string = '';
    private readonly recurring: number | string;

    constructor(number: number | string, recurring: number | string = '') {
        this.number = number;
        this.recurring = recurring;
        this.separate();
        this.integerToBinary();
    }

    private separate() {
        const stringNumber = `${this.number}`;
        const [integer, decimal] = stringNumber.split('.');
        this.integer = parseInt(integer);
        this.decimal = parseInt(decimal) || '';
    }

    private integerToBinary(): string {
        let number = this.integer;
        let result = [];

        while (number > 0) {
            result.push(number % 2);
            number = Math.floor(number / 2);
        }

        return result.reverse().join('')
    }

    private recurringToBinary() {
        const repeated = [], result = [], operations = [];
        let recurringStart = -1;
        const fraction: Fraction = recurring(this.recurring, this.decimal);
        let tempFraction = fraction;

        while (recurringStart === -1) {
            repeated.push(tempFraction);
            const res = mix(multi(tempFraction, {numerator: 2, denominator: 1}));
            result.push(res.int);

            const operation = {
                operands: [tempFraction, 2],
                operators: ['*'],
                result: [res.int, res.fraction]
            }

            operations.push(operation);

            tempFraction = res.fraction;
            repeated.forEach((r, index) => {
                if (r && isEqual(r, tempFraction)) {
                    recurringStart = index;
                }
            });
        }

        return {
            number: {
                integer: this.integerToBinary(),
                decimal: result.splice(0, recurringStart).join('') || null,
                recurring: result.splice(recurringStart, result.length).join('') || null
            },
            fraction,
            operations
        }
    }

    private decimalToBinary() {
        const repeated = [], result = [], operations = [];
        let flag: boolean = true;
        let number = this.decimal;

        return null;
    }

    public toBinary() {
        if(this.recurring !== ''){
            return this.recurringToBinary();
        }

        if(this.decimal === '') {
            return this.integerToBinary();
        }

        return this.decimalToBinary();
    }
}

export default Decimal;