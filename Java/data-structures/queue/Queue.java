package blogpost.queue;

/**
 * Created by Jay Lee on 2017-07-13.
 */
public interface Queue<T> {
    /**
     * Insert data into the Queue
     * */
    void enqueue(T data);

    /**
     * Remove and return the element at the front of the queue
     * */
    T dequeue();

    /**
     * Get the size of the Queue
     * */
    int size();

    /**
     * Get data at the front of the Queue
     * @return T data
     * */
    T front();

    /**
     * Check if queue is empty
     * */
    boolean isEmpty();

    /**
     * Print items in the queue
     * */
    void print();
}
