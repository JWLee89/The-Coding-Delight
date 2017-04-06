/**
 * @Author Jay
 */
public class Node<T extends Comparable<T>> {

    // The data
    private T data;
    // Pointer to the next node
    private Node<T> nextNode;

    public Node(T data) {
        this.data = data;
    }

    /*
     * =====================================
     * ======== Getters and Setters ========
     * =====================================
     * */
    public T getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }

    public Node<T> getNextNode() {
        return nextNode;
    }

    public void setNextNode(Node<T> nextNode) {
        this.nextNode = nextNode;
    }

    // In most cases int is recommended to override the toString() method
    // so that the data will be converted into a string format
    // that is meaningful to the user
    @Override
    public String toString() {
        return "Node{" +
                "data=" + data +
                '}';
    }
}
