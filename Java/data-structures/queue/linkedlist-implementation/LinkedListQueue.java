
/**
 * @Author Jay Lee
 * @see https://www.thecodingdelight.com
 * */
public class LinkedListQueue<T> implements Queue<T> {

    private int size;
    private Node<T> head;
    private Node<T> tail;

    @Override
    public void enqueue(T data) {
        if (this.isEmpty()) {
            this.head = new Node<T>(data, null);
        } else {
            // If tail is null, this is the second element
            if (this.tail == null) {
                this.tail = new Node<T>(data, null);
                this.head.setNextNode(this.tail);
            } else {
                // More than two elements present
                // If this is the case, set the current tail
                // to point to the newly inserted node
                // Afterwards, set the newly inserted node as the new tail.
                // We need a tail to make sure insertion to our queue can
                // be done in O(1) constant time.
                Node<T> previousTail = this.tail;
                Node<T> newTail = new Node<T>(data, null);
                previousTail.setNextNode(newTail);
                this.tail = newTail;
            }
        }
        this.size++;
    }

    @Override
    public T dequeue() {
        // Queue is a FIFO data structure.
        // We only provide users with access to interact
        // with the head node.
        // If the list is empty return null and do nothing
        Node<T> nodeToReturn = this.head;
        if (this.isEmpty()) {
            return null;
        } else {
            // Removing the second last element from the list
            if (this.tail == null) {
                this.head = null;
            } else {
                // Set new head to next node, regardless of whether
                // it is a null pointer
                this.head = this.head.getNextNode();
            }
            // Lastly, decrement size of the queue
            this.size--;
        }
        return nodeToReturn.getData();
    }

    @Override
    public int size() {
        return this.size;
    }

    @Override
    public T front() {
        return this.head.getData();
    }

    @Override
    public boolean isEmpty() {
        return this.head == null;
    }

    @Override
    public void print() {
        System.out.println(this.toString());
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder("LinkedListQueue: {");
        Node<T> currentNode = this.head;

        while (currentNode != null) {
            sb.append(currentNode.getData());
            currentNode = currentNode.getNextNode();
            if (currentNode != null) {
                sb.append(" --> ");
            }
        }
        sb.append("}");
        return sb.toString();
    }
}
