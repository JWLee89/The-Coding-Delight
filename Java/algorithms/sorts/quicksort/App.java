import java.util.ArrayList;
import java.util.List;

public class App {
    public static void main(String[] args) {
        Integer[] arr = {4 ,8 ,7 ,5 ,2 ,3 , 6, 1};
        //Integer[] arr = {1,45,2,3,82,7,10,9};
        Sorts.quickSort(arr);

        System.out.println("----------------------------");
        System.out.println("Iterating through the SORTED list ...");
        for (Integer i : arr) {
            System.out.println(i);
        }

        // List
        List<Integer> list = new ArrayList<>();
        list.add(1);
        list.add(45);
        list.add(2);
        list.add(3);
        list.add(82);
        list.add(7);
        list.add(10);
        list.add(9);

        System.out.println("Quick sorting list -------------------------");

        List<Integer> SortedList = Sorts.quickSort(list);

        for (Integer integer : SortedList) {
            System.out.println(integer);
        }
    }
}
