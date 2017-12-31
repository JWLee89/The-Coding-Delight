/**
 * Merge Sort Blind
 *
 * FYI, this took me 20 minutes to write up, which includes
 * fixing bugs, writing comments and whatnot.
 *
 * Before starting, for me, I need to visualize the algorithm
 * This results in me doing poorly in timed coding interviews
 * Because I tend to skip the visualization phase and move onto coding,
 * which results in me missing out on key logic or failing to consider some
 * edge cases.
 *
 * Anyway, I am going to write out my entire thought process in the comments
 * so it may get a little cluttered.
 * */
function mergeSort(inputs) {
    // Thought 1: base case
    // Because an array of one length is technically sorted
    if (inputs.length < 2) {
        return inputs;
    }
    // Need to math.ceil to round it up, since
    // in JavaScript, numbers are floats.
    // We are rounding it up because the length property is one-based
    // whereas indexes are zero based.
    var middle = Math.ceil(inputs.length / 2);

    // Split the array into halves.
    // We are going to do it the old fashioned way using loops
    // so that we all see how this works
    var index = 0;

    // Declare left and right array.
    var leftArr = [], rightArr = [];

    // left Array insertion
    for (; index < middle; index++) {
        leftArr.push(inputs[index]);
    }

    // Right array insertion.
    for (;index < inputs.length; index++) {
        rightArr.push(inputs[index]);
    }

    // call mergeSort recursively.
    leftArr = mergeSort(leftArr);
    rightArr = mergeSort(rightArr);

    // Now that we have our array, we are going to
    // recursively work on splitting the array until we
    // have an array of length one, which is technically
    // Sorted.
    // Afterwards, we need to stitch the results back
    // In a sorted manner.
    return merge(leftArr, rightArr);
}

function merge(leftInputs, rightInputs) {
    var sortedResults = [];
    // We are going to continue sorting until one of the arrays is empty
    // Technically if one side is empty, that means that the result is sorted.
    // Afterwards, we dump the results from the non-empty array into the sorted results
    while (true) {

        // Left is empty, so dump all the sorted results into the array
        if (!leftInputs.length) {
            while (rightInputs.length) {
                sortedResults.push(rightInputs.shift());
            }
            break;
        }

        // Right input is empty, so dump all results into the sorted result
        if (!rightInputs.length) {
            while (leftInputs.length) {
                sortedResults.push(leftInputs.shift());
            }
            break;
        }

        // Both left and right list are not empty, so start comparing.
        // Remember, we only operate on the first element on each array
        var left = leftInputs[0];
        var right = rightInputs[0];

        // Compare and remove the first element from the array
        // It is important that we use shift to remove the first element and
        // place it in the sorted result
        // Otherwise, we get an infinite loop
        if (left <= right) {
            sortedResults.push(leftInputs.shift());
        } else {
            sortedResults.push(rightInputs.shift());
        }
    }

    return sortedResults;
}

var arr = [1,7,28,81,8,2,4,7];
console.log(mergeSort(arr));
