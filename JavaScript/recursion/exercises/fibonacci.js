/**
 * In order to optimize the fibonacci function, use memoization!
 * fibonacci(5) --> 5
 * fibonacci(10) --> 55
 * fibonacci(15) --> 610
 *
 * @param {Number} num the nth number of a fibonacci series
 * @return {Number} the result of the nth number of a fibonacci series.
 */
function fibonacci(num) {
    if (num <= 2) {
        switch (num) {
            case 1: case 2: return 1;
            case 0: return 0;
            default: throw new Error("Please insert a positive integer");
        }
    }
    return fibonacci(num - 1) + fibonacci(num - 2);
}
