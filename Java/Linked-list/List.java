/**
 * @Author Jay Lee
 */
public interface List<T> {
    /**
     * Remove data at a certain index
     * @param index
     * @throws IndexOutOfBoundsException
     * */
    void remove(int index) throws IndexOutOfBoundsException;

    /**
     * @param data
     * Remove data that is considered identical to what is passed
     * */
    void remove(T data);


    /**
     * @param data
     * Add data to the start of the list.
     * */
    void add(T data);

    /**
     * add item at a particular index.
     * @param index
     * @param data
     * @throws IndexOutOfBoundsException
     * */
    void add(int index, T data) throws IndexOutOfBoundsException;

    /**
     * Get the current size of the list
     * @return size of list
     * */
    int size();

    /**
     * Traverse through the list and print all the items
     * */
    void print();

    /**
     * Check if the list is empty.
     * @return boolean
     * */
    boolean isEmpty();
}
