/**
     * Merge sort algorithm implementation
     *
     * @param {Array} list the list to be sorted.
     * */
    function mergeSort(list) {

        var len = array.length;
        // an array of length one is technically a sorted list.
        // This is our base case.
        if (len === 1) {
            return list;
        }
        // round up so that first half is equal to or greater than second
        // This means that if we have an odd numbered length,
        // The first half will be greater than the second half
        // Don't have to do this, but simply a stylistic choice.
        var middleIndex = len / 2,

            // Split current li into two: left and right list.
            leftList   = list.slice(0, middleIndex),
            rightList  = list.slice(middleIndex, len);

        leftList = mergeSort(leftList);
        rightList = mergeSort(rightList);

        return merge(leftList, rightList);
    }

    /**
     * Solve the sub-problems and merge them together
     * to form a sub-solution.
     * 
     * Bubble up until we find the solution
     * */
    function merge(leftList, rightList) {
        var result = [];
        while (leftList.length > 0 && rightList.length > 0) {
            var leftItem = leftList[0],
                rightItem = rightList[0];
            if (leftItem > rightItem) {
                result.push(rightItem);
                rightList.shift();
            } else {
                result.push(leftItem);
                leftList.shift();  // remove item that was pushed in
            }
        }

        // if left list has items, add what is left to the results
        while (leftList.length !== 0) {
            result.push(leftList[0]);
            leftList.shift();
        }

        // if right list has items, add what is left to the results
        while (rightList.length !== 0) {
            result.push(rightList[0]);
            rightList.shift();
        }

        // Combine/merge the left and right list after
        // comparing and sorting the results in order.
        return result;
    }

    var list = [11, 28, 8, 15, 50, 20, 90];

    var result = mergeSort(list);

    console.log(result);
