/**
     * @param str the String to reverse.
     *
     * Function call returns
     * reverseStr("troll");
     * return reverseStr("roll") + "t";
     * return reverseStr("oll") + "r";
     * return reverseStr("ll") + "0";
     * return reverseStr("l") + "l";
     * return "l";
     *
     * Results will bubble up as reverseStr("l") is popped off the call stack,
     * followed by reverseStr("ll");
     *
     * l
     * ll
     * llo
     * llor
     * llort
     * */
    function reverseStr(str) {
        if (str.length <= 1) {  // to prevent empty string from overflowing call stack
            return str;
        }
        return reverseStr(str.substr(1)) + str.charAt(0);
    }

    console.log(reverseStr("troll"));   // Should return "llort"
