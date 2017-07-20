public interface List<T> {

    /**
     * Insert data to the end of the list.
     * */
    void insert(T data);

    /**
     * Insert data after data at a specific index.
     * */
    void insertAfter(T data, int index);

    /**
     * Search from the start of the list and find.
     * data to remove.
     * */
    void remove(T data);

    /**
     * Remove the item at the nth index of the list.
     *
     * @param index
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
