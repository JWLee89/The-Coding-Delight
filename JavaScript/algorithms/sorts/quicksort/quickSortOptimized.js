function quickSortOptimized(list, lowIndex, highIndex) {
    if (lowIndex < highIndex) {

        // Get the pivot index index after partition operation plus make swaps needed.
        var  currentPartitionIndex = partitionList(list, lowIndex, highIndex);

        // E.g. On first iteration low index is 0, 4 - 1.
        quickSortOptimized(list, lowIndex, currentPartitionIndex - 1);
        // E.g. On first iteration low index is 4 + 1, 7. We are leaving out the index of the pivot
        quickSortOptimized(list, currentPartitionIndex + 1, highIndex);
    }
}

function partitionList(list, lowIndex, highIndex) {

    // Indexes used for wall partitioning
    var wallIndex = lowIndex - 1;
    var pivot = list[highIndex];          // LastElement


    // INFO: HEADS UP
    // Set wall index and lowIndex to
    // 0 and 1 respectively to avoid unnecessary swap at the start
    for (var currentIndex = lowIndex; currentIndex < highIndex; currentIndex++) {
        var currentItem = list[currentIndex];
        // Perform swap
        if (currentItem < pivot) {
            // Increment wall index
            wallIndex++;

            // perform swap
            // swap item at wall index with item at current index
            var temp = list[wallIndex];
            list[wallIndex] = list[currentIndex];
            list[currentIndex] = temp;
        }
    }

    // Swap pivot with item immediately to the right of the wall
    var temp = list[wallIndex + 1];
    list[wallIndex + 1] = list[highIndex];
    list[highIndex] = temp;

    return wallIndex + 1;   // Return pivot index
}

function quickSort(list) {
    quickSortOptimized(list, 0, list.length - 1);
}

var item = [3, 5, 9, 83, 123, 18, 8, 10];

quickSort(item);

console.log(item);  // [3, 5, 8, 9, 10, 18, 83, 123]
