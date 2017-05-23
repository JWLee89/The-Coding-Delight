public class App {
    public static void main(String[] args) {
        List<Integer> item = new ArrayList<>();

        item.add(10);
        item.add(7);
        item.add(30);
        item.add(1);
        item.add(100);
        item.add(12);
        item.add(18);

        System.out.println("Before merge sort ------------- ");

        for (Integer integer : item) {
            System.out.print(integer + " --> ");
        }

       List<Integer> result =  Sorts.mergeSort(item);

        System.out.println("After merge sort -------------- ");

        for (Integer integer : result) {
            System.out.print(integer + " --> ");
        }

        System.out.println(" -------------- ");

        Integer[] numbers = {1,3,8,27,17,7,9,18,29,20,16,6};

        Comparable<Integer>[] sortedNumbers = Sorts.mergeSort(numbers);

        for (Comparable<Integer> sortedNumber : sortedNumbers) {
            System.out.println(sortedNumber);
        }

    }
}
