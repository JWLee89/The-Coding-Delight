var counter = 1;
/**
 * Perform binary search on a SORTED list
 * @param {Array} array a sorted array
 * @param {Number} an item we want to find in the list.
 * */
function binarySearch(array, value) {
    var length = array.length;
    var middleIndex = Math.floor(length / 2);
    var middleItem = array[middleIndex];

    console.log("search attempt no. " + counter);
    counter++;

    // First base case: finding the value
    if (middleItem === value) {
        return value;
    }
    // second Base case: if array has only one item, no point searching the array.
    // Return default value of a function, which is undefined
    if (length > 1) {
        if (middleItem > value) {
            // search left half of current array
            return binarySearch(array.slice(0, middleIndex), value);
        } else {
            // search right half of current array
            return binarySearch(array.slice(middleIndex, length), value);
        }
    }
}

console.log(binarySearch([1,2,3,4,5,6,7,8,9,10,11,12,13,14], 4));
