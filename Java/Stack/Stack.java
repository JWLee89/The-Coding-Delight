public class Stack<T extends Comparable<T>> {


    private Node<T> lastItem;
    private int size;

    /**
     * Empty constructor with no operation.
     * */
    public Stack() {
        // No OP
    }

    /**
     * Provide a nice helper constructor to convert existing arrays
     * into stacks. How nice of us right?
     * */
    public Stack(T[] data) {
        toStack(data);
    }


    public int size() { return this.size; }

    /**
     * Get the item at the top of the stack
     * without removing it
     * */
    public T peek() {
        return getLastItem().getData();
    }

    /**
     * return <code>true</code> if empty
     * */
    public boolean isEmpty() {
        return this.lastItem == null;
    }

    /**
     * Two cases:
     * 1. Stack is empty: simply set head to new node
     * 2. Stack is not empty:
     * Set newly inserted data as the lastItem (or top of the stack)
     * Update reference to point the new data to the previous lastItem.
     *
     * lastItem --> null;
     * new head --> head;
     * */
    public void push(T data) {
        if (isEmpty()) {
            addToEmptyStack(data);
        } else {
            addToNotEmptyStack(data);
        }
        incrementSize();
    }

    /**
     * Print all the items currently available on the stack
     * */
    public void print() {
        Node<T> currentNode = lastItem;
        while (currentNode != null) {
            System.out.print(currentNode);
            System.out.print(" --> ");
            currentNode = currentNode.getNextNode();
        }
        System.out.println();
    }

    /**
     * Remove the element at the top of the stack
     * @throws EmptyStackException
     * */
    public T pop() throws EmptyStackException {
        if (isEmpty()) {
            throw new EmptyStackException("The stack is empty ...");
        }
        T lastData = getLastItem().getData();
        decrementSize();
        removeLastItem();
        return lastData;
    }

    /**
     * ==============================
     * ======= Private methods ======
     * ==============================
     * */

    private void incrementSize() {
        this.size++;
    }

    private void decrementSize() {
        this.size--;
    }

    /**
     * @return lastItem: the item that is at the top of the stack
     * */
    private Node<T> getLastItem() {
        return lastItem;
    }

    private void removeLastItem() {
        Node<T> newLastItem = lastItem.getNextNode();
        // Check if the element to remove is
        // the last item on the stack
        if (newLastItem == null) {
            lastItem = null;
        } else {    // If there are more than one items on the stack
            lastItem = lastItem.getNextNode();
        }
    }

    /**
     * Convert array to stack
     * I placed the logic of adding to empty stack and
     * adding to non-empty stack separately to avoid unnecessary repeated
     * checks of isEmpty() and also to highlight what is happening in the
     * toStack() method below.
     * @param data
     * */
    private void toStack(T[] data) {
        if (isEmpty()) {
            int dataLength = data.length;
            addToEmptyStack(data[0]);
            for (int i = 1; i < dataLength; i++) {
                addToNotEmptyStack(data[i]);
            }
        } else {
            for (T datum : data) {
                addToNotEmptyStack(datum);
            }
        }
    }

    /**
     * Add to an empty stack
     * @param data
     * */
    private void addToEmptyStack(T data) {
        this.lastItem = new Node<T>(data);
    }

    /**
     * This code will run with the assumption that the
     * stack is not empty
     * @param data
     * */
    private void addToNotEmptyStack(T data) {
        // Step 1. Create the reference to the current lastItem (before insertion)
        Node<T> prevLastItem = lastItem;
        // Step 2. set the lastItem to the new node created with inserted data
        lastItem = new Node<T>(data);
        // Step 3. Set the next node of the new lastItem to point at the previous last item.
        lastItem.setNextNode(prevLastItem);
    }
}
