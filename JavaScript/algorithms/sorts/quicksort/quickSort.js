/**
 * The quick sort implementation using an imaginary wall.
 * The implementation details that were shown with the diagram above.
 * Note that the wall is used as a visual guide to help programmers learn
 * how quick sort works.
 *
 * The pivot is the most important concept in the quick sort.
 * */
function quickSortWithWall(list) {
    // Base case
    if (list.length <= 1) {
        return list;
    }
    return partitionList(list);
}

/**
 * Partitioning operation here.
 * */
function partitionList(list) {

    var len = list.length;
    var leftList = [];
    var rightList = [];
    var pivot = list[len - 1];          // LastElement

    // Indexes used for wall partitioning
    var currentIndex = 0,
        wallIndex = 1;                  // Going to add pivot to the rightList in advance, so start at index 1

    // Add pivot as the first element in the right list pre-emptively
    rightList[0] = pivot;

    for (var i = 0; i < len - 1; i++) {
        var currentItem = list[i];
        if (currentItem < pivot) {
            leftList[currentIndex] = currentItem;
            currentIndex++;
        } else {
            rightList[wallIndex] = currentItem;
            wallIndex++;
        }
    }
    // Recursively call quick sort with partitioned lists. Divide and conquer YEAH!
    return quickSortWithWall(leftList).concat(quickSortWithWall(rightList));
}

function quickSort(list) {
    var len = list.length;
    if (len <= 1) {
        return list;
    }
    // Partitioning operation
    var leftList = [];
    var rightList = [];
    var pivot = list[len - 1];      // LastElement

    for (var i = 0; i < len - 1; i++) {
        var currentItem = list[i];
        // Add to left list if pivot is less than array.
        if (currentItem < pivot) {
            leftList.push(currentItem)
        } else {
            rightList.push(currentItem)
        }
    }
    // Add pivot to front of right array
    rightList.unshift(pivot);
    // Combine the partitioned items
    return quickSort(leftList).concat(quickSort(rightList));
}

/**
 * Contains the partition algorithm with two indexes:
 * 1. The wall index.
 * 2. Current index.
 *
 * */
function quickSortVersion2(list) {
    var len = list.length;
    if (len <= 1) {
        return list;
    }
    var pivot = list[len - 1];
    return partitionList(list);
}

var item = [3, 5, 9, 83, 123, 18, 8, 10];

console.log(quickSortWithWall(item));
