/**
 * @Author Jay
 */
public class App {
    public static void main(String[] args) {
        List<String> data = new LinkedList<>();
        data.add("A");
        data.add("B");
        data.add("C");

        //data.add(2, "D");

        // Here the exception will be triggered
        try {
            data.add(4, "This will not work");
        } catch (IndexOutOfBoundsException e) {
            System.out.println(e.getLocalizedMessage());
        }

        data.print();

        data.remove(0);

        data.remove("C");

        data.print();

    }
}
