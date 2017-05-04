package avlTree;

/**
 * Created by Jay Lee on 2017-04-29.
 */
public class AvlTree<T extends Comparable<T>> implements Tree<T> {

    private Node<T> rootNode;

    @Override
    public void insert(T data) {
        rootNode = insertData(rootNode, data);
    }

    @Override
    public boolean remove(T dataToRemove) {
        if (isEmpty()) {
            return false;
        }
        rootNode = removeNode(rootNode, dataToRemove);
        return rootNode.getData().compareTo(dataToRemove) == 0;
    }

    @Override
    public void traverse() {
        if (isEmpty()) {
            return;
        }
        inOrderTraversal(this.rootNode);
    }

    @Override
    public boolean isEmpty() {
        return this.rootNode == null;
    }

    /**
     * @throw RuntimeException if the tree is empty and this si called
     * @return the height + 1 (+1 is to offset the -1 based counting)
     * */
    @Override
    public int height() throws RuntimeException {
        if (isEmpty()) {
            throw new RuntimeException("The AVL Tree is empty ...");
        }
        return this.rootNode.getHeight() + 1;       // +1 to make it zero based again
    }

    /*
     * ==============================
     * =    Private methods here    =
     * ==============================
     * */

    /**
     * Recursive implementation of removing data from a tree
     * Three cases:
     * 1. No child nodes.
     * 2. Single child.
     * 3. Two children.
     * @return the node that is to be removed. Return null if no data is removed.
     * */
    private Node<T> removeNode(Node<T> currentNode, T dataToRemove) {

        // Base case
        if (currentNode == null) {
            return currentNode;
        }

        Node<T> leftChild = currentNode.getLeftChild();
        Node<T> rightChild = currentNode.getRightChild();
        T currentData = currentNode.getData();

        if (dataToRemove.compareTo(currentData) == 0) {

            System.out.println("Found the data that we want to remove: " + currentData);

            if (leftChild == null && rightChild == null) {
                System.out.println("Removing a leaf node");
                return null;
            } else if (leftChild == null) {
                System.out.println("Removing a node with a right child");
                currentNode = null;
                return rightChild;
            } else if (rightChild == null) {
                System.out.println("Removing a node with a left child");
                currentNode = null;
                return leftChild;
            } else {
                System.out.println("Removing a node with two children");
                // Find the largest node on the left sub-tree
                Node<T> largestInLeftSubtree = getMaxNode(leftChild);

                // Swap the root node with the largest in left sub-tree
                currentNode.setData(largestInLeftSubtree.getData());
                // Set left-child recursively. Remove the copy left of the largest left child
                currentNode.setLeftChild(removeNode(currentNode.getLeftChild(), largestInLeftSubtree.getData()));

            }
        } else if (dataToRemove.compareTo(currentData) < 0) {
            System.out.println("Traversing to the left ---");
            currentNode.setLeftChild(removeNode(leftChild, dataToRemove));
        } else {
            System.out.println("Traversing to the right ---");
            currentNode.setRightChild(removeNode(rightChild, dataToRemove));
        }

        // Update the height parameter
        currentNode.setHeight(calculateTreeHeight(currentNode));

        // Check on every delete operation whether tree has become unbalanced
        return balanceTreeAfterDeletion(currentNode);
    }

    /**
     * Check whether the tree is unbalanced after a delete operation
     * @return Node The node that is deleted.
     * */
    private Node<T> balanceTreeAfterDeletion(Node<T> currentNode) {

        int balanceValue = getBalanceValue(currentNode);

        // Left heavy situation. Can be left-left or left-right
        if (balanceValue > 1) {
            // Left-right rotation required. Left rotation on the right child of the root node.
            if (getBalanceValue(currentNode.getLeftChild()) < 0) {
                currentNode.setLeftChild(leftRotation(currentNode.getLeftChild()));
            }

            return rightRotation(currentNode);
        }

        // Right heavy situation. Can be right-right or right-left
        if (balanceValue < -1) {
            // right - left situation. Left rotation on the right child of the root node.
            if (getBalanceValue(currentNode.getRightChild()) > 0) {
                currentNode.setRightChild(rightRotation(currentNode.getRightChild()));
            }
            // left rotation on the root node
            return leftRotation(currentNode);
        }

        return currentNode;
    }

    /**
     * Get the maximum node is a particular sub-tree
     *
     * @param currentNode the root node of the sub-tree
     *                    we will be examining
     * */
    private Node<T> getMaxNode(Node<T> currentNode) {
        while (currentNode.getRightChild() != null) {
            currentNode = currentNode.getRightChild();
        }
        return currentNode;
    }

    /**
     * Get the minimum node in a particular sub-tree
     *
     * @param currentNode the root node of the sub-tree
     *                    we will be examining
     * */
    private Node<T> getMinNode(Node<T> currentNode) {
        while (currentNode.getLeftChild() != null) {
            currentNode = currentNode.getLeftChild();
        }
        return currentNode;
    }

    /**
     * Used internally
     *
     * Height is calculated via the following formula
     * height = max (leftSubTreeHeight, rightSubTreeHeight) + 1
     *
     * @return -1 if the node is null.  Otherwise, return the height.
     * */
    private int height(Node<T> currentNode) {
        if (currentNode == null) {
            return -1;
        }
        return currentNode.getHeight();
    }

    /**
     * Implement recursively to avoid storing a node pointer to the parent.
     * Remember that in the JavaScript implementation of the Binary Search Tree,
     * we required the pointer to the parent.
     *
     * This method will ALWAYS return the root.
     *
     * @param rootNode
     * @param dataToInsert
     * */
    private Node<T> insertData(Node<T> rootNode, T dataToInsert) {

        // The current root node is empty. Create a new node here
        if (rootNode == null) {
            return new Node<T>(dataToInsert);
        }

        // Is data to insert smaller than the current key value.
        // Go to the left.
        if (dataToInsert.compareTo(rootNode.getData()) < 0) {
            rootNode.setLeftChild(insertData(rootNode.getLeftChild(), dataToInsert));
        } else {
            rootNode.setRightChild(insertData(rootNode.getRightChild(), dataToInsert));
        }

        // Finally, update the height calculateTreeHeight(rootNode)
        rootNode.setHeight(calculateTreeHeight(rootNode));

        rootNode = balanceTree(rootNode, dataToInsert);

        return rootNode;
    }

    /**
     * After the insertion/removal method, check to see if tree is balanced.
     * Check for the following four cases
     * 1. Left rotation       - right heavy situation
     * 2. Right rotation      - Left heavy situation
     * 3. Left-right rotation - right heavy situation
     * 4. Right-left rotation - Left heavy situation
     *
     *
     * */
    private Node<T> balanceTree(Node<T> currentNode, T dataToInsert) {

        int balanceValue = getBalanceValue(currentNode);

        // Right heavy situation - left rotation
        if (isRightHeavy(balanceValue)
                && dataToInsert.compareTo(currentNode.getRightChild().getData()) > 0) {
            return leftRotation(currentNode);
        }

        // Left heavy situation - Right rotation
        if (isLeftHeavy(balanceValue)
                && dataToInsert.compareTo(currentNode.getLeftChild().getData()) < 0) {
            return rightRotation(currentNode);
        }

        // Left right
        if (isLeftHeavy(balanceValue) &&
                dataToInsert.compareTo(currentNode.getLeftChild().getData()) > 0) {
            currentNode.setLeftChild(insertData(currentNode.getLeftChild(), dataToInsert));
            return rightRotation(currentNode);
        }

        // right-left
        if (isRightHeavy(balanceValue) &&
                dataToInsert.compareTo(currentNode.getLeftChild().getData()) < 0) {
            currentNode.setRightChild(insertData(currentNode.getRightChild(), dataToInsert));
            return leftRotation(currentNode);
        }

        return currentNode;
    }

    /**
     * Get the balance value of the current node. If difference between the height
     * of the left and right subtree is greater than 1, that means it is skewed disproportionately
     * to the left. It is therefore left heavy situation.
     * If however, the difference is -2 or less, that means it is skewed disproportionately
     * to the right, meaning it is a right heavy situation.
     * Otherwise, it is balanced.
     * */
    private int getBalanceValue(Node<T> currentNode) {
        if (currentNode == null) {
            return 0;
        }
        return height(currentNode.getLeftChild()) - height(currentNode.getRightChild());
    }

    /**
     * Check if the current sub-tree is balanced. If difference between the height
     * of the left and right subtree is 1 or zero, then it is balanced.
     * Otherwise, it is unbalanced.
     *
     * @param currentNode
     * */
    private boolean isBalanced(Node<T> currentNode) {
        return Math.abs(getBalanceValue(currentNode)) < 2;
    }

    /**
     * Check to see if current element is balanced based on balance value
     * @param balanceValue
     * */
    private boolean isBalanced(int balanceValue) {
        return balanceValue < 2 && balanceValue > -2;
    }

    /**
     * Check if tree is left heavy based on balance value.
     * Left heavy trees have more items on the left sub-tree than the right.
     * */
    private boolean isLeftHeavy(int balanceValue) {
        return balanceValue > 1;
    }

    /**
     * Check if tree is right heavy based on balance value\
     * Right heavy trees have more items on the right sub-tree than the left.
     * */
    private boolean isRightHeavy(int balanceValue) {
        return balanceValue < -1;
    }
    /**
     * Get the height of the tree and increment it by 1 to get the actual height.
     * Get it by taking the greater value between the height of the left and right sub-tree
     * and add one to that value.
     * Null pointers return a height of zero, because -1 + 1 = 0.
     * */
    private int calculateTreeHeight(Node<T> currentNode) {
        return Math.max(height(currentNode.getLeftChild()), height(currentNode.getRightChild())) + 1;
    }

    /**
     * A recursive implementation of the right rotation.
     * We will be utilizing the pseudo code that we wrote in the post
     *
     *
     * */
    private Node<T> rightRotation(Node<T> currentNode) {
        System.out.println("Beginning right rotation ... on node: " + currentNode.getData());

        Node<T> newRootNode = currentNode.getLeftChild();
        Node<T> rightChildOfLeft = newRootNode.getRightChild();

        // Step 1. Set newRootNode as the new root node.
        newRootNode.setRightChild(currentNode);

        // Step 2. Set the right child of the new left child of the new root node. Quite a tongue twister right?
        currentNode.setLeftChild(rightChildOfLeft);

        // Step 3. Update the height of the trees that were updated.
        newRootNode.setHeight(calculateTreeHeight(newRootNode));
        currentNode.setHeight(calculateTreeHeight(currentNode));

        return newRootNode;
    }

    private Node<T> leftRotation(Node<T> currentNode) {

        System.out.println("Beginning left rotation ... on node: " + currentNode.getData());

        Node<T> newRootNode = currentNode.getRightChild();
        Node<T> leftChildOfRight = newRootNode.getLeftChild();

        // Step 1. set the left child of the new root node
        newRootNode.setLeftChild(currentNode);

        // Step 2. set the right child of the new left child
        currentNode.setRightChild(leftChildOfRight);

        // Step 3. Update the height of the trees that were updated.
        newRootNode.setHeight(calculateTreeHeight(newRootNode));
        currentNode.setHeight(calculateTreeHeight(currentNode));

        return newRootNode;
    }


    /**
     * In order traversal implementation
     * 1. Visit left sub-tree
     * 2. Visit root
     * 3. Visit right sub-tree
     *
     * @param currentNode the node that we are currently at
     * */
    private void inOrderTraversal(Node<T> currentNode) {

        Node<T> leftChild = currentNode.getLeftChild();

        if (leftChild != null) {
            inOrderTraversal(leftChild);
        }

        System.out.print(currentNode + " --> ");

        Node<T> rightChild = currentNode.getRightChild();

        if (rightChild != null) {
            inOrderTraversal(rightChild);
        }

    }

    /**
     * Pre order traversal implementation
     * 1. Visit root
     * 2. Visit left sub-tree
     * 3. Visit right sub-tree
     *
     * @param currentNode the node that we are currently at
     * */
    private void preOrderTraversal(Node<T> currentNode) {

        System.out.print(currentNode + " --> ");

        Node<T> leftChild = currentNode.getLeftChild();

        if (leftChild != null) {
            preOrderTraversal(leftChild);
        }

        Node<T> rightChild = currentNode.getRightChild();

        if (rightChild != null) {
            preOrderTraversal(rightChild);
        }
    }

    /**
     * Post order traversal
     * 1. Visit the left sub-tree
     * 2. Visit the right sub-tree
     * 3. Visit root
     *
     * @param currentNode the node that we are currently at
     * */
    private void postOrderTraversal(Node<T> currentNode) {
        Node<T> leftChild = currentNode.getLeftChild();

        if (leftChild != null) {
            preOrderTraversal(leftChild);
        }

        Node<T> rightChild = currentNode.getRightChild();

        if (rightChild != null) {
            preOrderTraversal(rightChild);
        }

        System.out.print(currentNode + " --> ");
    }

}

/**
 * The node class for the tree.
 * Make sure that it can only be instantiated by classes inside of this package.
 * */
class Node<T extends Comparable<T>> {
    private T data;
    private Node<T> leftChild;
    private Node<T> rightChild;
    private int height;

    public Node(T data) {
        this.data = data;
    }

    public T getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }

    Node<T> getLeftChild() {
        return leftChild;
    }

    void setLeftChild(Node<T> leftChild) {
        this.leftChild = leftChild;
    }

    Node<T> getRightChild() {
        return rightChild;
    }

    void setRightChild(Node<T> rightChild) {
        this.rightChild = rightChild;
    }

    int getHeight() {
        return height;
    }

    public void setHeight(int height) {
        this.height = height;
    }

    @Override
    public String toString() {
        return "Node{" +
                "data=" + data +
                '}';
    }
}
