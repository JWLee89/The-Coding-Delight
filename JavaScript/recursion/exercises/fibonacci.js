/**
 * In order to optimize the fibonacci function, use memoization!
 */
function fibonacci(num) {
    if (num <= 2) {
        switch (num) {
            case 1: case 2: return 0;
            case 0: return 1;
            default: throw new Error("Please insert a positive integer");
        }
    }
    return fibonacci(num - 1) + fibonacci(num - 2);
}
