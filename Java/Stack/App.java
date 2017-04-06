/**
 * @author Jay
 */
public class App {

    public static void main(String[] args) {

        Stack<Integer> numbers = new Stack<>();

        numbers.push(1);
        numbers.push(2);
        numbers.push(3);
        numbers.push(4);
        numbers.push(5);

        System.out.println("Size of the stack: " + numbers.size());

        numbers.print();

        System.out.println("Popping the last element off the stack: " + numbers.pop() +
                ". Size is now: " + numbers.size());

        numbers.print();

        numbers.push(100);

        System.out.println("Popping the last element off the stack: " + numbers.pop() +
                ". Size is now: " + numbers.size());

        numbers.pop();  // Popping off 4
        numbers.pop();  // Popping off 3
        numbers.pop();  // Popping off 2
        numbers.pop();  // Popping off 1

        // Throw EmptyStackException
        try {
            numbers.pop();
        } catch (EmptyStackException e) {
            System.out.println(e.getMessage());
        }

        System.out.println("----------------------------------------------");

        Integer[] arrayOfNumbers = {10,9,8,7,6,5,4};
        // Initialize stack by passing array of numbers
        numbers = new Stack<>(arrayOfNumbers);

        numbers.print();

        System.out.println("The last element in this new stack is: " + numbers.peek());

    }
}
