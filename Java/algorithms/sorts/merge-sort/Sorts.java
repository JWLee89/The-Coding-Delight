/**
 * @Author Jay Lee
 */
class Sorts {

    /**
     * Merge sort using the list interface
     * Feel free to change the implementation to however you want
     * */
    static <T extends Comparable<T>>
           List<T> mergeSort(List<T> list) {

        int size = list.size();

        if (size < 2) {
            return list;
        }

        int middleIndex = (int) Math.ceil((double)size / 2);

        List<T> leftList = list.subList(0, middleIndex);
        List<T> rightList = list.subList(middleIndex, size);

        leftList = mergeSort(leftList);
        rightList = mergeSort(rightList);

        return merge(leftList, rightList);
    }

    private static <T extends Comparable<T>>
        List<T> merge(List<T> leftList, List<T> rightList) {


        List<T> resultList = new LinkedList<>();

        int leftIndex = 0;
        int rightIndex = 0;
        int leftSize = leftList.size();
        int rightSize = rightList.size();
        int size = leftList.size() + rightList.size();

        for (int i = 0; i < size; i++) {
            if (rightIndex >= rightSize ||
                    (leftIndex < leftSize && leftList.get(leftIndex).compareTo(rightList.get(rightIndex)) < 0)) {
                resultList.add(leftList.get(leftIndex));
                leftIndex++;
            } else {
                resultList.add(rightList.get(rightIndex));
                rightIndex++;
            }
        }

        return resultList;
    }

    /**
     * Merge Sort using Arrays
     * There is plenty of room for refactoring so feel free
     * to go bonkers with the refactoring.
     * */
    static <T extends Comparable<T>> Comparable<T>[] mergeSort(Comparable<T>[] arr) {

        int len = arr.length;

        if (len < 2) {
            return arr;
        }

        int middle = (int) Math.ceil((double) len / 2);

        Comparable<T>[] leftList = copyArray(arr, 0, middle);
        Comparable<T>[] rightList = copyArray(arr, middle, len);

        leftList = mergeSort(leftList);
        rightList = mergeSort(rightList);

        return merge(leftList, rightList);
    }

    private static <T extends Comparable<T>> Comparable<T>[] merge(Comparable<T>[] leftList, Comparable<T>[] rightList) {

        int leftLen = leftList.length, rightLen = rightList.length;

        Comparable[] results = new Comparable[leftLen + rightLen];

        int leftIndex = 0;
        int rightIndex = 0;

        for (int i = 0 ; i< results.length; i++) {

            // Left is greater so move right item to the results array
            if (rightIndex >= rightLen ||
                    (leftIndex < leftLen &&
                            leftList[leftIndex].compareTo((T) rightList[rightIndex]) < 0)) {
                results[i] = leftList[leftIndex];
                leftIndex++;
            } else {
                results[i] = rightList[rightIndex];
                rightIndex++;
            }
        }

        return results;
    }



    /**
     * Copies array
     * @param startIndex
     * @param endIndex
     *
     * @throws IndexOutOfBoundsException
     * */
    private static <T extends Comparable<T>> Comparable<T>[] copyArray(Comparable<T>[] arr, int startIndex, int endIndex) {

        int len = endIndex - startIndex;
        int i = 0;

        Comparable[] results = new Comparable[len];

        for (; startIndex < endIndex; startIndex++) {
            results[i] = arr[startIndex];
            i++;
        }
        return results;
    }

}
