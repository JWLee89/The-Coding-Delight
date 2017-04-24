function factorial(num) {
        var nextNum = num - 1;
        // Base case
        if (num === 1) {
            return num; // return 1;
        }
        return num * factorial(nextNum);
    }

    console.log(factorial(5));      // 120

    function iterativeFactorial(num) {
        if (num < 0) {
            throw new Error("Negative factorial results in undefined value.");
        }
        var result = 1;
        while (num > 1) {
            result *= num;
            num--;
        }
        return result;
    }

    console.log(iterativeFactorial(5));
