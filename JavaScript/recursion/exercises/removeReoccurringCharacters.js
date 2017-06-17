function removeReoccurringCharacters(str) {
    if (typeof str !== "string") {
        throw new Error("Please enter a string!");
    }
    var charMap = {};
    var result = [];
    var removeRepeatingChar = function(str) {
    var len = str.length;
        if (len === 0) {
            return str;
        }
        var firstChar = str.charAt(0);
        if (!charMap.hasOwnProperty(firstChar)) {
            charMap[firstChar] = true;  // mark as having occurred
            result.push(firstChar);     // push into results
        }
        removeRepeatingChar(str.substring(1, len));
    };
    removeRepeatingChar(str);
    return result.join('');
}

function removeReoccurringCharactersIter(str) {
    if (typeof str !== "string") {
        throw new Error("Please enter a string!");
    }
    var charMap = {};
    var result = [];
    var charArray = str.split('');
    for (var i = 0; i <charArray.length; i++) {
        var currentChar = charArray[i];
        // Character doesn't exist. Add to result
        if (!charMap.hasOwnProperty(currentChar)) {
            charMap[currentChar] = true;    // mark as character having occurred
            result.push(currentChar);       // push into results
        }
        // Otherwise, do nothing
    }
    return result.join('');
}

console.log(removeReoccurringCharacters("trolla"));
