 function factorial(num) {
    var nextNum = num - 1;
    // Base case
    if (num === 1) {
        return num; // return 1;
    }
    return num * factorial(nextNum);
}

console.log(factorial(5));      // 120
