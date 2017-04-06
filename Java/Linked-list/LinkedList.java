/**
 * Basic Implementation of the linked list. 
 * FYI: Traditionally, 
 * The List interface as implemented in java.util package should 
 * extend Collection, which extends the Iterable interface.
 * @Author Jay
 */
public class LinkedList<T extends Comparable<T>> implements List<T> {

    private Node<T> head;
    private int size;


    @Override
    public void remove(int index) throws IndexOutOfBoundsException {
        validateInputIndex(index);

        decrementSize();

        // Replace current head
        if (index == 0) {
            removeHead();
            return;
        }

        // Prepare for iteration
        Node<T> currentNode = head;

        // Decrement index, since we want reference to the previous node
        // Before getting node to delete
        index--;

        // Get to the specified index via pointer traversal
        for(int i = 0; i < index; i++) {
            currentNode = currentNode.getNextNode();
        }


        Node<T> nodeToDelete = currentNode.getNextNode();

        Node<T> nodeAfterDeletedNode = nodeToDelete.getNextNode();

        // Delete the node by nulling it so that it is eligible for garbage collection
        nodeToDelete = null;

        // If we are removing "B" from A, B, C We will go from
        // A --> B -- C -- null
        // to
        // A --> C --> null
        // A needs to change pointer reference from
        // B to point at C

        // Update pointer references
        currentNode.setNextNode(nodeAfterDeletedNode);
    }

    @Override
    public void remove(T data) {

        if (isEmpty()) return;

        Node<T> currentNode = head;
        // We have found data to remove. It is the head
        if (currentNode.getData().compareTo(data) == 0) {
            removeHead();
        } else {
            // Look for the data to remove.
            remove(data, head, head.getNextNode());
        }
        decrementSize();
    }

    @Override
    public void add(T data) {
        if (this.isEmpty()) {
            Node<T> newData = new Node<T>(data);
            head = newData;
        } else {
            // addNodeAtEnd(head, data);
            addNodeAtStart(data);
        }
        incrementSize();
    }

    /**
     * Yes i know I am validating DRY here by repeating code in the remove(int index) method
     * But this is purely for demonstration purpose to show the entire process behind removing by index.
     * */
    @Override
    public void add(int index, T data) throws IndexOutOfBoundsException {

        validateInputIndex(index);

        // Prepare for iteration
        Node<T> currentNode = head;

        // Decrement index, since we want currentNode to point to the node
        // at the index right before where the data is supposed to be inserted.
        index--;

        // Get to the specified index via pointer traversal
        for(int i = 0; i < index; i++) {
            currentNode = currentNode.getNextNode();
        }

        // Create new node.
        Node<T> nodeToInsert =  new Node<T>(data);

        // Update pointer references
        // Get next node before updating reference.
        Node<T> nextNode = currentNode.getNextNode();

        // currentNode = "B"
        System.out.println("Current Node: " + currentNode);

        // newNode = "D"
        System.out.println("next node: " + nextNode);

        // nextNode = "C"
        System.out.println("Node to insert: " + nodeToInsert);
        System.out.println("----------------------------------------------------------------------------------");

        // current node will now point at the newly created node
        // E.g.   D
        //       \ /
        //   A, B,  C
        // after insert, should be, A --> B --> D --> C --> null
        // if we are inserting "D" at index 2
        // B will now point at D
        // and D will point at C
        currentNode.setNextNode(nodeToInsert);
        nodeToInsert.setNextNode(nextNode);

        // Increment the size
        incrementSize();
    }

    @Override
    public int size() {
        return this.size;
    }


    /**
     * Print the list of nodes
     * */
    @Override
    public void print() {
        Node<T> currentNode = head;
        while(currentNode != null) {
            System.out.print(currentNode + " --> ");
            currentNode = currentNode.getNextNode();
        }
        System.out.println();
    }

    @Override
    public boolean isEmpty() {
        return this.head == null;
    }

    /**
     * ==============================
     * ======= Private methods ======
     * ==============================
     * */

    private void validateInputIndex(int index) throws IndexOutOfBoundsException {
        if (index >= size()) {
            throw new IndexOutOfBoundsException("index: " + index + ". Is out of bounds for list of size: " + size());
        }
    }

    private void incrementSize() {
        this.size++;
    }

    private void decrementSize() {
        this.size--;
    }

    /**
     * Add data to the end of the linked list
     * */
    private void addNodeAtEnd(Node<T> currentNode, T dataToAdd) {
        if (currentNode.getNextNode() != null) {
            addNodeAtEnd(currentNode.getNextNode(), dataToAdd);
        } else {
            currentNode.setNextNode(new Node<T>(dataToAdd));
        }
    }

    /**
     * Add data to the start of the linked list
     * */
    private void addNodeAtStart(T dataToAdd) {
        Node<T> newHead = new Node<T>(dataToAdd);
        newHead.setNextNode(head);
        head = newHead;
    }

    /**
     * Remove the head and update reference
     * A --> B --> C
     * Head       Tail
     * B --> C
     * B = new head
     *
     * */
    private void removeHead() {
        Node<T> nextElement = head.getNextNode();
        head = nextElement;
    }

    /**
     * Remove Data
     * */
    private void remove(T data, Node<T> prevNode, Node<T> currentNode) {
        while (currentNode != null) {
            Node<T> nextNode = currentNode.getNextNode();
            if (currentNode.getData().compareTo(data) == 0) {
                // Found data to remove. Delete current data and link the next node with the previous node
                // If we are removing "B" from A, B, C We will go from
                // A --> B -- C -- null
                // to
                // A --> C --> null
                // A needs to change pointer reference from
                // B to point at C
                prevNode.setNextNode(nextNode); // update pointer reference
                currentNode = null;             // set current node to null to remove it
                return;                         // Break out of the loop
            }
            // update the references for the next iteration
            prevNode = currentNode;
            currentNode = nextNode;
        }
    }
}
