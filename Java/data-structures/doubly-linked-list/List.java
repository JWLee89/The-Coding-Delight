public interface List<T> {

    /**
     * Insert data to the end of the list.
     * @param data the data to add.
     * */
    void insert(T data);

    /**
     * Insert data after the node at a specific index.
     * @param data the data to add.
     * @param index the index of node after which we will add data.
     * */
    void insertAfter(T data, int index);

    /**
     * Search from the start of the list and find
     * data to remove.
     * @param data the data to remove.
     * */
    void remove(T data);

    /**
     * Remove first item from the list.
     * In another word, remove the head node.
     * */
    void removeFromFront();

    /**
     * Remove last item from the list.
     * In another word, remove the tail node.
     * */
    void removeFromBack();

    /**
     * Remove the item at the nth index of the list.
     *
     * @param index the index of the item to remove
     * @throws IndexOutOfBoundsException
     * */
    void removeAt(int index) throws IndexOutOfBoundsException;

    /**
     * Print items inside of the list.
     * */
    void print();

    /**
     * Get the size of the list.
     * */
    int size();

}
