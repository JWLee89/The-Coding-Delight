/**
 * @Author Jay Lee
 * */
public class DoublyLinkedList<T extends Comparable<T>> implements List<T> {

    private Node<T> head;
    private Node<T> tail;
    private int size;

    /**
     * Insert data at the end of the list
     * */
    @Override
    public void insert(T data) {
        insertAtFront(data);
    }

    @Override
    public void insertAfter(T data, int index) {
        if (index > size - 1) {
            throw new IndexOutOfBoundsException("DoublyLinkedList is currently of size " + this.size);
        }
        // Get node at a specific index
        Node<T> currentNode = getNodeAt(index);
        // Add node
        insertNode(data, currentNode, currentNode.getNext());
    }

    @Override
    public void remove(T data) {
        Node<T> currentNode = this.head;
        while (currentNode != null) {
            T currentData = currentNode.getData();
            // Found data to remove
            if (currentData.compareTo(data) == 0) {
                removeNode(currentNode);
            }
            currentNode = currentNode.getNext();
        }
    }

    @Override
    public void removeFromFront() {
        if (this.head != null) {
            Node<T> nextNode = this.head.getNext();
            // Set prev node of next to null if it exists
            if (nextNode != null) {
                nextNode.setPrev(null);
            }
            // Remove current head
            this.head = null;
            this.head = nextNode;
            this.size--;
        }
    }

    @Override
    public void removeFromBack() {
        if (this.head != null) {
            if (this.tail != null) {
                // Two or more elements exist
                Node<T> newTail = this.tail.getPrev();
                this.tail = null;
                newTail.setNext(null);
                this.tail = newTail;
            } else {
                // Tail is null but head is not null
                // means that this is the last element
                this.head = null;
            }
            this.size--;
        }
    }

    @Override
    public void removeAt(int index) throws IndexOutOfBoundsException {
        if (index > size - 1) {
            throw new IndexOutOfBoundsException("DoublyLinkedList is currently of size " + this.size);
        }
        Node<T> nodeToRemove = getNodeAt(index);
        removeNode(nodeToRemove);
    }

    @Override
    public void print() {
        System.out.println(this.toString());
    }

    @Override
    public int size() {
        return this.size;
    }

    @Override
    public String toString() {
        Node<T> currentNode = this.head;
        StringBuilder sb = new StringBuilder();
        sb.append("DoublyLinkedList: [size = ");
        sb.append(this.size).append(", Nodes=[");
        while (currentNode != null) {
            sb.append(currentNode.getData()).append(" --> ");
            currentNode = currentNode.getNext();
        }
        sb.append("null]]");
        return sb.toString();
    }

    /**
     * =========================================
     * ============ PRIVATE METHODS ============
     * =========================================
     * */

    /**
     * @return <code>true</code> if index is closer to end of linked list.
     * Return <code>false</code> otherwise.
     * */
    private boolean isCloserToEnd(int index) {
        // If index / size is greater than 0.5,
        // return 1. Otherwise, 0.
        return ((int) Math.round(((double)index / this.size))) == 1;
    }

    private Node<T> getNodeAt(int index) {
        Node<T> currentNode;
        int counter;
        if (isCloserToEnd(index)) {
            currentNode = this.tail;
            counter = this.size - 1;
            System.out.println("iterating from the tail");
            while (currentNode != null && counter != index) {
                currentNode = currentNode.getPrev();
                counter--;
            }
        } else {
            currentNode = this.head;
            counter = 0;
            System.out.println("iterating from the head");
            while (currentNode != null && counter != index) {
                currentNode = currentNode.getNext();
                counter++;
            }
        }
        return currentNode;
    }

    private void insertAtFront(T data) {
        if (this.head == null) {
            this.head = new Node<>(data);
            // Tail and head cannot point at the same node
            this.tail = null;
        } else {
            if (this.tail == null) {
                 // @Credit @alphaveneno Thank you for pointing out this mistake
                 // Current head becomes new tail,
                 // Since we are adding the second element
                 this.tail = this.head;
                 // Set new head
                 this.head = new Node<>(data);
                 // Lastly, update references
                 // Head --> Tail
                 // Head <-- Tail
                 this.head.setNext(this.tail);
                 this.tail.setPrev(this.head);
            } else {
                Node<T> prevHead = this.head;
                Node<T> newHead = new Node<>(data);

                // Update references
                // newHead.next --> prevHead
                // prevHead.prev <-- newHead
                newHead.setNext(prevHead);
                prevHead.setPrev(newHead);
                this.head = newHead;
            }
        }
        this.size++;
    }

    private void insertAtBack(T data) {
        if (this.head == null) {
            Node<T> nodeToInsert = new Node<>(data);
            this.head = nodeToInsert;
            // Tail and head cannot point at the same node
            this.tail = null;
        } else {
            //
            if (this.tail == null) {
                this.tail = new Node<>(data);
                // Update references
                // Head --> Tail
                // Head <-- Tail
                this.head.setNext(this.tail);
                this.tail.setPrev(this.head);
            } else {
                Node<T> prevTail = this.tail;
                Node<T> newTail = new Node<>(data);

                // Update references
                // prevTail --> newTail
                // prevTail <-- newTail
                newTail.setPrev(prevTail);
                prevTail.setNext(newTail);
                this.tail = newTail;
            }
        }
        this.size++;
    }

    private void insertNode(T dataToInsert,
                            Node<T> currentNode, Node<T> nextNode) {

        Node<T> newNode = new Node<>(dataToInsert);
        // If next node is null, current node is the tail node
        if (nextNode == null) {
            System.out.println("Inserting tail node");
            this.tail = newNode;
            this.tail.setPrev(currentNode);
            currentNode.setNext(newNode);
        } else {
            // Has both next and previous node.
            // Is somewhere in the middle of the linked list.
            System.out.println("Inserting non head/tail node");

            // First, have both prev and next node
            // point to node to insert
            currentNode.setNext(newNode);
            nextNode.setPrev(newNode);

            // Afterwards, have node to insert
            // prevNode point back to prev node.
            // and nextNode point to next node
            newNode.setPrev(currentNode);
            newNode.setNext(nextNode);
        }
        // NOTE: We don't have to worry
        // about the case where list is empty
        // If list is empty, we will throw an exception
        // Because we can't insert after an element,
        // if there are no elements in the list
        // to begin with.
        this.size++;
    }

    private void removeNode(Node<T> nodeToRemove) {
        Node<T> prevNode = nodeToRemove.getPrev();
        Node<T> nextNode = nodeToRemove.getNext();
        // Head node does not have a previous node
        if (prevNode == null) {
            this.head = null;
            this.head = nextNode;
            this.head.setPrev(null);
        } else if (nextNode == null) {
            // Tail does not have a next node
            this.tail = null;
            this.tail = prevNode;
            this.tail.setNext(null);
        } else {
            // Is somewhere in the middle of the linked list
            // Set current node to null
            nodeToRemove = null;
            // connect the previous and next nodes together
            prevNode.setNext(nextNode);
            nextNode.setPrev(prevNode);
        }
        this.size--;
    }
}
