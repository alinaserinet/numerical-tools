import {Decimal} from "./src/converter";

const number = new Decimal('11', {numerator: 1, denominator: 99});

console.log(number.toBinary());