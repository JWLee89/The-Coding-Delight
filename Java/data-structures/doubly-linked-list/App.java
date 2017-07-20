public class App {
    public static void main(String[] args) {
        List<Integer> dll = new DoublyLinkedList<>();
        dll.insert(1);
        dll.insert(2);
        dll.insert(3);
        dll.insert(4);
        dll.insert(5);
        dll.insert(6);
        dll.insert(7);
        dll.insert(8);

        dll.remove(3);

        dll.insertAfter(9, 5);

        dll.print();

        dll.removeAt(2);

        dll.print();

        dll.removeAt(4);

        dll.print();
    }
}
