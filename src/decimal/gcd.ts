function gcd(number1: number, number2: number): number {
    if(number2 === 0)
        return Math.abs(number1);
    return gcd(number2, number1 % number2);
}

export default gcd;