/**
 * @Author Jay
 */
public interface Tree<T extends Comparable<T>> {
    /**
     * @param data The data to insert
     * */
    void insert(T data);
    /**
     * @param dataToRemove
     * */
    void remove(T dataToRemove);

    /**
     * traverse the tree.
     * */
    void traverse();

    /**
     * return the height of the tree or the root node
     * */
    int height() throws RuntimeException;

    boolean isEmpty();
}
