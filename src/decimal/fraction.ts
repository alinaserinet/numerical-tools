import gcd from './gcd';

export type Fraction = {
    numerator: number,
    denominator: number
}

type CommonFraction = {
    denominator: number,
    numerator1: number,
    numerator2: number
}

export function sub(fraction1: Fraction, fraction2: Fraction): Fraction {
    const {
        denominator,
        numerator1,
        numerator2
    } = commonDenominator(fraction1, fraction2);

    const numerator: number = numerator1 - numerator2;
    return simple({numerator, denominator});
}

export function sum(fraction1: Fraction, fraction2: Fraction): Fraction {
    const {
        denominator,
        numerator1,
        numerator2
    } = commonDenominator(fraction1, fraction2);

    const numerator: number = numerator1 + numerator2;
    return simple({numerator, denominator});
}

export function multi(fraction1: Fraction, fraction2: Fraction): Fraction {
    let numerator1: number = fraction1.numerator || 1;
    const denominator1: number = fraction1.denominator || 1;
    let numerator2: number = fraction2.numerator || 1;
    const denominator2: number = fraction2.denominator || 1;

    if (typeof fraction1 !== 'object') {
        numerator1 = fraction1;
    }
    if (typeof fraction2 !== 'object') {
        numerator2 = fraction2;
    }

    const numerator: number = numerator1 * numerator2;
    const denominator: number = denominator1 * denominator2;

    return simple({numerator, denominator});
}

export function mix(fraction: Fraction): { int: number, fraction: Fraction } {
    const quotient: number = Math.floor(fraction.numerator / fraction.denominator);
    const remainder: number = fraction.numerator % fraction.denominator;

    return {
        int: quotient,
        fraction: {
            numerator: remainder,
            denominator: fraction.denominator
        }
    }
}

export function isEqual(fraction1: Fraction, fraction2: Fraction): boolean {
    const simple1: Fraction = simple(fraction1);
    const simple2: Fraction = simple(fraction2);
    if(simple1.numerator !== simple2.numerator) return false;
    return simple1.denominator === simple2.denominator;
}

function commonDenominator(fraction1: Fraction, fraction2: Fraction): CommonFraction {
    const denominator: number = fraction1.denominator * fraction2.denominator;
    const numerator1: number = fraction1.numerator * fraction2.denominator;
    const numerator2: number = fraction2.numerator * fraction1.denominator;
    return {denominator, numerator1, numerator2};
}

export function simple(fraction: Fraction) {
    const gcdResult = gcd(fraction.numerator, fraction.denominator);

    return {
        numerator: fraction.numerator / gcdResult,
        denominator: fraction.denominator / gcdResult
    }
}



