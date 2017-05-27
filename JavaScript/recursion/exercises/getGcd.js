function getGcd(num1, num2) {
    if (num1 % num2 === 0) {
        return num2;
    }
    return getGcd(num2, num1 % num2);
}

console.log(getGcd(280,60));
