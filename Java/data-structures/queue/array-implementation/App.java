/**
 * Created by Jay Lee on 2017-07-13.
 */
public class App {
    public static void main(String[] args) {
        Queue<Integer> queue = new ArrayQueue<>();
        queue.enqueue(1);
        queue.enqueue(2);
        queue.enqueue(3);
        queue.enqueue(4);
        queue.enqueue(5);

        queue.dequeue();
        queue.dequeue();
        queue.dequeue();

        queue.print();

        queue.enqueue(6);
        queue.print();
        queue.enqueue(7);
        queue.enqueue(8);
        queue.enqueue(9);
        queue.enqueue(10);
        queue.enqueue(11);
        queue.enqueue(12);

        queue.print();

        System.out.println(queue.size());

        System.out.println("Removing: " + queue.dequeue() + " from the queue");

        queue.print();

        System.out.println("Size of queue is: " + queue.size());

        System.out.println(queue.front() + " removed");

        queue.dequeue();

        queue.print();

        System.out.println(queue.front() + " removed");

        queue.dequeue();

        queue.print();

        queue.enqueue(13);
        queue.enqueue(14);
        queue.enqueue(15);
        queue.enqueue(16);
        queue.enqueue(17);
        queue.enqueue(18);
        queue.enqueue(19);

        queue.print();

    }
}
