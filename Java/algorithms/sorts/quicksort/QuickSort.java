import java.util.ArrayList;
import java.util.List;

public class Sorts {

    static <T extends Comparable<T>> void quickSort(Comparable<T>[] list) {
        quickSortImpl(list, 0, list.length - 1);
    }
    static <T extends Comparable<T>> List<T> quickSort(List<T> list) {
        int len = list.size();
        if (len <= 1) {
            return list;
        }

        // Partition logic here. Feel free to make this polymorphic.
        // For this tutorial, we will make array lists
        List<T> leftList = new ArrayList<>();
        List<T> rightList = new ArrayList<>();

        // pivots. No need for currentIndex and wallIndex since we are pushing into left or right list
        T pivot = list.get(len - 1);

        // At the start, add pivot to the list so that it is to the right of the wall
        rightList.add(pivot);

        for (int i = 0; i < len - 1; i++) {
            T currentItem = list.get(i);
            // Move to left side of the wall
            if (currentItem.compareTo(pivot) < 0) {
                leftList.add(currentItem);
            } else {
                rightList.add(currentItem);
            }
        }

        // Combine the partitioned left and right list.
        List<T> combinedList = new ArrayList<>(quickSort(leftList));
        combinedList.addAll(quickSort(rightList));

        return combinedList;
    }

    /**
     * Private methods here
     * ====================
     *
     * */


    private static <T extends Comparable<T>> void quickSortImpl(Comparable<T>[] list, int lowIndex, int highIndex) {
        if (lowIndex < highIndex) {

            // Get the pivot index after partition plus make swaps needed.
            int pivotIndex = partitionList(list, lowIndex, highIndex);

            quickSortImpl(list, lowIndex, pivotIndex - 1);  // E.g. On first iteration low index is 0, 4 - 1.
            quickSortImpl(list, pivotIndex + 1, highIndex);  // E.g. On first iteration low index is 4 + 1, 7. We are leaving out the index of the pivot
        }
    }

    private static <T extends Comparable<T>> int partitionList(Comparable<T>[] list, int lowIndex, int highIndex) {

        T pivot = (T) list[highIndex];

        int wallIndex = lowIndex; // index of smaller element. On first iteration, it is minus one
        // As you saw in the image, you swap with the first and first element
        // in the first iteration of the loop, wallIndex becomes 0
        // currentIndex is 0 as well.

        for (int currentIndex = lowIndex + 1; currentIndex < highIndex; currentIndex++) {
            // If currentItem is less than or equal to pivot
            T currentItem = (T) list[currentIndex];
            if (currentItem.compareTo(pivot) < 0) {

                // First of all, increment wall index
                wallIndex++;

                System.out.println("Swapping currentItem: " + currentItem + " and item at wall index: " + list[wallIndex]);

                // swap item at wall index with item at current index
                T temp = (T) list[wallIndex];
                list[wallIndex] = list[currentIndex];
                list[currentIndex] = temp;
            }
        }

        // Swap pivot with item immediately to the right of the wall
        T temp = (T)list[wallIndex + 1];
        list[wallIndex+1] = list[highIndex];
        list[highIndex] = temp;

        // return the pivot index, which is exactly to the right of the wall.
        return wallIndex + 1;
    }

    private static <T extends Comparable<T>> void quickSortImpl(List<T> list) {
        int len = list.size();
        if (len <= 1) {
            return;
        }
    }

}
