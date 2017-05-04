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
     * @return <code>true</code> if data was found and removed
     * otherwise, return <code>false</code> if failed to remove
     * */
    boolean remove(T dataToRemove);

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
