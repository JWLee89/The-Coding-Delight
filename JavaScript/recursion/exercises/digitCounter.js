/**
     * Check how many times a particular digit occurred in a number.
     *
     * Please note that this is for demonstration purposes only.
     * Do not use this code in production!
     *
     * */
    function getDigitCount(num, digit) {
        // Validation checks
        if (typeof digit !== "string") {
            digit = digit.toString();
        }
        if (digit.length !== 1) {
            throw new Error("Please enter a single digit.");
        }
        if (typeof num !== "number") {
            throw new Error("num must be of type number");
        }
        // Keep track of digits
        var digitOccurCount = 0;

        // Convert number to string
        num = num.toString();
        var recursiveDigitCounter = function(num, digit) {
            // Base case
            if (num.length === 0) {
                return;
            }
            var currentNumber = num.charAt(0);
            if (currentNumber === digit) {
                digitOccurCount++;
            }
            recursiveDigitCounter(num.substring(1, num.length), digit);
        };
        recursiveDigitCounter(num, digit);
        return digitOccurCount;
    }

    console.log(getReoccuringDigits(79092342, 2));
