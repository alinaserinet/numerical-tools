import {Fraction, isEqual, mix, multi, recurring} from "../decimal";

class Decimal {
    private readonly number: number | string;
    private integer: number = 0;
    private decimal: number = 0;
    private readonly recurring: number | string = '';
    private fraction: Fraction | null = null;
    public constructor(number: number | string, recurring: string | number);
    public constructor(number: number | string, fraction: Fraction);
    public constructor(number: number | string);

    public constructor(...args: any[]) {
        if(typeof args[1] === 'object') {
            this.number = args[0];
            this.fraction = args[1];
        }
        else {
            this.number = args[0];
            this.recurring = args[1] || '';
        }
        this.separate();
    }

    private separate() {
        const stringNumber = `${this.number}`;
        const [integer, decimal] = stringNumber.split('.');
        this.integer = parseInt(integer);
        this.decimal = parseFloat(`0.${decimal}`);
    }

    private integerToBinary(): string {
        let number = this.integer;
        let result = [];

        while (number > 0) {
            result.push(number % 2);
            number = Math.floor(number / 2);
        }

        return result.reverse().join('');
    }

    private recurringToBinary() {
        this.fraction = recurring(this.recurring, this.decimal || '');
        return this.fractionToBinary();
    }

    public fractionToBinary() {
        if(this.fraction === null) return;

        const repeated = [], result = [], operations = [];
        let recurringStart = -1;
        let tempFraction = this.fraction;

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
                decimal: result.slice(0, recurringStart).join('') || null,
                recurring: result.slice(recurringStart, result.length).join('') || null
            },
            fraction: this.fraction,
            operations
        }
    }

    private decimalToBinary() {
        const repeated = [], result: number[] = [], operations = [];
        let recurringStart = -1;
        let number: number = this.decimal;
        const decimalLength = `${this.decimal}`.split('.')[1].length;

        while(recurringStart === -1) {
            repeated.push(number);
            const integerPart: number = Math.floor(number * 2);
            number = parseFloat(((number * 2) - integerPart).toFixed(decimalLength));
            result.push(integerPart);
            if (number === 0) break;
            repeated.forEach((n, index) => {
                if(n === number) {
                    recurringStart = index;
                }
            });
        }

        return {
            number: {
                integer: this.integerToBinary(),
                decimal: recurringStart === -1 ? result.join('') : result.slice(0, recurringStart).join('') || null,
                recurring: recurringStart === -1 ? null : result.slice(recurringStart, result.length).join('')
            },
        }
    }

    public toBinary() {
        if(this.recurring !== ''){
            return this.recurringToBinary();
        }

        if(this.fraction !== null) {
            return this.fractionToBinary();
        }

        if(this.decimal === 0) {
            return this.integerToBinary();
        }

        return this.decimalToBinary();
    }
}

export default Decimal;