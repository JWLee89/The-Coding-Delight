package blogpost.queue;

/**
 * @author  Jay Lee
 */
public class ArrayQueue<T> implements Queue<T> {

    private T[] queueData;
    private int initSize;
    private int size;
    private int front;

    public ArrayQueue(T[] data) {
        int len = data.length;

        // Make an array holding double the number of elements
        queueData = (T[]) new Object[len * 2];

        // Copy items into the queue
        for (int i = 0; i <len; i++) {
            queueData[i] = data[i];
        }
        // Update size status
        size = len;
        this.front = 0;
    }

    public ArrayQueue(int initSize) {
        this.initSize = initSize;
        queueData = (T[]) new Object[initSize];
        this.front = 0;
        this.size = 0;
    }

    /**
     * If not specified, default init queue size is 10
     * Completely arbitrary value as of now
     * */
    public ArrayQueue() {
        this.initSize = 10;
        queueData = (T[]) new Object[initSize];
        this.front = 0;
        this.size = 0;
    }


    @Override
    public void enqueue(T data) {
        incrementSize();
        this.queueData[size + front - 1] = data;
        // Resize queue if required
        if (resizeRequired()) {
            resizeQueue();
        }
    }

    @Override
    public T dequeue() {
        if (isEmpty()) {
            try {
                throw new EmptyQueueException("Queue is empty");
            } catch (EmptyQueueException e) {
                System.out.println(e.getMessage());
                return null;
            }
        }
        T dataToReturn = this.queueData[front];
        this.queueData[front] = null;
        decrementSize();
        return dataToReturn;
    }

    @Override
    public int size() {
        return this.size;
    }

    @Override
    public T front() {
        if (isEmpty()) {
            return null;
        }
        return queueData[front];
    }

    @Override
    public boolean isEmpty() {
        return this.size < 1;
    }

    @Override
    public void print() {
        if (isEmpty()) {
            try {
                throw new EmptyQueueException("Queue is empty");
            } catch (EmptyQueueException e) {
                System.out.println(e.getMessage());
                return;
            }
        }

        // Build string
        StringBuilder sb = new StringBuilder();
        sb.append("Queue: [");

        int index = front;
        int iterationCount = size + index;

        while (index < iterationCount && queueData[index] != null) {
            sb.append(queueData[index]).append(" --> ");
            index++;
        }
        sb.append("]");
        System.out.println(sb.toString());
    }

    /**
     * =====================================
     * ========== PRIVATE METHODS ==========
     * =====================================
     * */
    private void incrementSize() {
        this.size++;
    }

    /**
     * In the queue, we always remove from the front.
     * Therefore, in the array implementation, we need
     * to increment the front index when removing the front item.
     * */
    private void decrementSize() {
        this.front++;
        this.size--;
    }

    /**
     * if last element is not null, we can assume that
     * the array has reached full capacity.
     * */
    private boolean resizeRequired() {
        // List is fully
        return queueData[initSize - 1] != null;
    }

    /**
     * Resize the array once we reach full capacity.
     * If we have enough null references aka deleted items
     * in the front, we may not increase memory space,
     * but rather, move the remaining items to the front of
     * the array.
     *
     * Is O(n) time complexity.
     * */
    private void resizeQueue() {

        System.out.println("--------------- attempting resize ---------------------");
        // check if array is full.
        // if it is, double size of the array
        if (size >= initSize) {
            initSize *= 2;

            System.out.println("increasing size of array to " + initSize);

            // copy elements into the new array.
            int index = 0;
            int endIndex = front + size;
            T[] arr = (T[]) new Object[initSize];
            for (int i = front; i < endIndex; i++) {
                arr[index] = queueData[i];
                index++;
            }
            // Lastly replace existing queue data
            queueData = arr;
        }
        // Otherwise, do not increase size,
        // but simply the non null items to the front
        else {
            int index = 0;
            System.out.println("reshuffling array ------------- Before reshuffle");
            printWithNulls();
            int endIndex = front + size;
            for (int i = front; i < endIndex; i++) {
                queueData[index] = queueData[i];
                queueData[i] = null;
                index++;
            }
            System.out.println("after reshuffle -------------------");
            printWithNulls();
        }
        this.front = 0; // reset front to 0
    }

    /**
     * Just for demonstrational purposes
     * */
    private void printWithNulls() {
        System.out.print("Queue with nulls: [");
        for (T queueDatum : queueData) {
            System.out.print(queueDatum + " --> ");
        }
        System.out.println("]");
    }
}

class EmptyQueueException extends Exception {
    public EmptyQueueException(String msg) {
        super(msg);
    }
}
