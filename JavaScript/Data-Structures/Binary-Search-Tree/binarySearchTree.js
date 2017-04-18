/**
 * My implementation of the Binary Search Tree Data Structure
 * Purely for demonstration and learning purposes. However, if anybody
 * has any good feedback on improving the implementation, I am all ears.
 * Please leave a comment on http://thecodingdelight.com or send me an email.
 * @link http://thecodingdelight.com
 * @author Jay Lee
 * */
// Wrap binary search tree in IIFE to minimize pollution of the global scope
(function() {
    /**
     * Nodes will represent the data in a Binary Search tree.
     * It has anywhere between zero to two children.
     * Nodes with zero children are called leafNodes.
     * We will not be creating getters and setter methods on the
     * Node prototype.
     * */
    function Node(data, leftChild, rightChild) {
        // We won't be using new Keyword to create an object.
        if (!(this instanceof Node)) {
            return new Node(data, leftChild, rightChild);
        }
        this.data = data;
        this.parentNode = null;
        this.rightChild = rightChild;
        this.leftChild = leftChild;
    }

    /**
     * Check if current node is leaf and return true if it is.
     * @return {boolean}
     * */
    Node.prototype.isLeaf = function isLeaf() {
        return this.rightChild == null &&
            this.leftChild == null;
    };

    Node.prototype.getLeftChild = function getLeftChild() {
        return this.leftChild;
    };

    /**
     * Set left child
     * @return this
     * */
    Node.prototype.setLeftChild = function setLeftChild(data) {
        this.leftChild = Node(data);
        return this;
    };

    Node.prototype.getRightChild = function getRightChild() {
        return this.rightChild;
    };

    Node.prototype.getParentNode = function getParentNode() {
        return this.parentNode;
    };

    Node.prototype.setParentNode = function setParentNode(parentNode) {
        this.parentNode = parentNode;
        return this;
    };

    /**
     * Set left child
     * @return this
     * */
    Node.prototype.setRightChild = function setRightChild(data) {
        this.rightChild = Node(data);
        return this;
    };

    /**
     * End Node-related implementation details.
     * --------------------------------------------------
     * */

    /**
     * Begin Binary Search Tree implementation details.
     * --------------------------------------------------
     * */

    function BinarySearchTree() {
        // We won't be using new Keyword to create an object.
        if (!(this instanceof BinarySearchTree)) {
            return new BinarySearchTree();
        }
        this.size = 0;
        this.root = undefined;                  // Root of the binary search tree.
        this.compare = function(a, b) {         // Default comparator function.
            return a > b;
        };
        this.equals = function(a, b) {          // Default equals comparator
            return a === b;
        };
        this.dataType = undefined;              // Determines the data type of the tree based on the type of the first element inserted
    }

    /**
     * Cache methods used more than once
     * */
    var objProto = Object.prototype;
    var toString = objProto.toString;
    var isObject = function isObject(item) {
        toString.call(item) === "[object Object]";
    };

    /**
     * Private methods here
     * */

    /**
     * @return string
     * */
    function getDataType(data) {
        return toString.call(data);
    }

    /**
     * Set the data type based on what was inserted
     * */
    function setDataType(data) {
        this.dataType = getDataType(data);
    }

    function incrementSize() {
        this.size++;
    }

    function decrementSize() {
        this.size--;
    }

    function addToEmptyTree(data) {
        this.root = Node(data);
    }

    /**
     * Note that it might be more efficient to use a while loop
     * rather than using recursion
     * @this BinarySearchTree
     * */
    function addNode(currentNode, dataToInsert) {
        // Current data is greater than data to insert. Go down one level to the left.
        if (this.compare(currentNode.data, dataToInsert)) {
            var leftChild = currentNode.leftChild;
            if (leftChild != null) {
                // traverse the tree until we find the place to insert node.
                addNode.call(this, leftChild, dataToInsert);
            } else {
                currentNode.setLeftChild(dataToInsert);
                currentNode.getLeftChild().setParentNode(currentNode);      // Set parent node
            }
            // Current data is less than data to insert. Go down one level to the right.
        } else {
            var rightChild = currentNode.rightChild;
            if (rightChild != null) {
                // call method recursively until we find the place to insert node.
                // We can also do it iteratively
                addNode.call(this, rightChild, dataToInsert);
            } else {
                currentNode.setRightChild(dataToInsert);
                currentNode.getRightChild().setParentNode(currentNode);      // Set parent node
            }
        }
    }

    function removeNode(currentNode, dataToDelete) {
        var parentChildIdentifier = null;
        // If we find item that is equal, we will remove it.
        // This time, we will use a while loop.
        while (currentNode != null) {
            var currentData = currentNode.data;
            // Found data to remove. Destroy the node object.
            if (this.equals(currentData, dataToDelete)) {
                destroyNodeObject.call(this, currentNode, parentChildIdentifier);
                break;
            }
            // Default behavior is left is greater than right.
            // In another words, if current data is greater than data to delete.
            // Go left in this case
            else if (this.compare(currentData, dataToDelete)) {
                currentNode = currentNode.leftChild;
                parentChildIdentifier = "leftChild";
            } else { // traverse right
                currentNode = currentNode.rightChild;
                parentChildIdentifier = "rightChild";
            }
        }
    }

    /**
     * @param node Destroy this node
     * @param parentChildIdentifier the Key of the parent that needs to @param node.
     * The easiest case is when the node we are destroying has zero children.
     * Just remove it. Easy!
     * */
    function destroyNode(node, parentChildIdentifier) {
        var parent = node.getParentNode();
        parent[parentChildIdentifier] = null;
    }

    /**
     * Link parent and child. This is preparation for destroying the
     * current node.
     * @param node The current node that is going to be removed.
     * @param childKey The key of @param node's child that needs to be connected to parent.
     * @param parentChildIdentifier the Key of the parent that needs to @param node.
     * */
    function linkParentAndChild(node, childKey, parentChildIdentifier) {
        var parent = node.getParentNode();
        var child = node[childKey];
        // Set parent node of new child to parent
        child.setParentNode(parent);
        // set parent's left or right child to left or right child of current node
        parent[parentChildIdentifier] = child;
    }

    /**
     * Destroy node object by removing the appropriate key
     * in the parent object. Admittedly, this is more difficult
     * to implement in JavaScript than your traditional OOP language
     * like Java.
     * */
    function destroyNodeObject(node, parentChildIdentifier) {
        // Means it has no parents. Remove the root reference.
        if (parentChildIdentifier == null) {
            this.root = null;
            return;
        }

        var leftChild = node.getLeftChild(),
            rightChild = node.getRightChild();

        // Check how many children this tree has.
        // Operations are fairly simple for nodes with zero or a single child node.
        if (leftChild == null && rightChild == null) {
            destroyNode(node, parentChildIdentifier);
        } else if (leftChild != null) {
            // Link the parent object and the child
            linkParentAndChild(node, "leftChild", parentChildIdentifier);
            // Destroy the node
        } else if (rightChild != null) {
            linkParentAndChild(node, "rightChild", parentChildIdentifier);
        } else {
            // The most complex case: Node to delete has two children.
            // TODO: Work on it when you can
        }
    }

    /**
     * Depth-first search implementation details
     * ================================
     * */

    /**
     * In-order traversal implementation details. For the sake of clarity,
     * I have decided to go with a recursive approach. Go from lowest to highest
     * Go first to the far left,
     * then one above, go to the right.
     * If it has child nodes, repeat the process.
     * In-order traversal: Left, Root, Right
     * @param node The current node we are at.
     * @param fn accepts a function. First argument is the data, second is the node object.
     * */
    function inOrderTraversalImpl(node, fn) {
        // Visit left subtree first
        if (node.getLeftChild() != null) {
            inOrderTraversalImpl(node.getLeftChild(), fn);
        }

        // Apply function to the node
        fn(node.data, node);

        // Then visit the right subtree
        if (node.getRightChild() != null) {
            inOrderTraversalImpl(node.getRightChild(), fn);
        }
    }

    /**
     * Pre-order traversal implementation details. For the sake of clarity,
     * I have decided to go with a recursive approach.
     * Pre-order traversal: Root, Left, Right
     * 1. Visit the root.
     * 2. Traverse the left subtree.
     * 3. Traverse the right subtree.
     * @param node The current node we are at.
     * @param fn accepts a function. First argument is the data, second is the node object.
     * */
    function preOrderTraversalImpl(node, fn) {
        // Apply function to the node
        fn(node.data, node);

        // Visit left subtree first
        if (node.getLeftChild() != null) {
            preOrderTraversalImpl(node.getLeftChild(), fn);
        }

        // Then visit the right subtree
        if (node.getRightChild() != null) {
            preOrderTraversalImpl(node.getRightChild(), fn);
        }
    }

    /**
     * Post-order traversal implementation details. For the sake of clarity,
     * I have decided to go with a recursive approach.
     * Post-order traversal: Left, Right, Root
     * 1. Traverse the left subtree, i.e., call Postorder(left-subtree)
     * 2. Traverse the right subtree, i.e., call Postorder(right-subtree)
     * 3. Visit the root.
     * @param node The current node we are at.
     * @param fn accepts a function. First argument is the data, second is the node object.
     * */
    function postOrderTraversalImpl(node, fn) {
        // Visit left subtree first
        if (node.getLeftChild() != null) {
            postOrderTraversalImpl(node.getLeftChild(), fn);
        }

        // Then visit the right subtree
        if (node.getRightChild() != null) {
            postOrderTraversalImpl(node.getRightChild(), fn);
        }
        // Apply function to the node
        fn(node.data, node);
    }

    /**
     * Public API of the Binary Search Tree.
     * Unless otherwise specified, public API functions are chainable.
     * In another words, they all return <code>this</code>.
     * ------------------------------------------------------------------------
     * */

    /**
     * @param data
     * */
    BinarySearchTree.prototype.add = function add(data) {
        if (this.isEmpty()) {
            addToEmptyTree.call(this, data);
            // Set the data type of the list
            setDataType.call(this, data);
        } else {
            var insertedItemDataType = getDataType(data);
            var listDataType = this.dataType;
            // If the data type is different from what the list accepts, throw error
            if (insertedItemDataType !== listDataType) {
                throw new Error("Inserted data: " + data + " is of type ~~~ " +
                    insertedItemDataType + ". This tree only accepts " + listDataType);
            }
            addNode.call(this, this.root, data);
        }
        incrementSize.call(this);
        return this;
    };

    /**
     * Remove data from the Binary Search Tree
     * @param data The data to remove
     * */
    BinarySearchTree.prototype.remove = function remove(data) {
        if (!this.isEmpty()) {
            removeNode.call(this, this.root, data);
            decrementSize.call(this);
        }
    };

    /**
     * return <code>true</code> if Node is empty.
     * @return boolean
     * */
    BinarySearchTree.prototype.isEmpty = function isEmpty() {
        return this.root == null;
    };

    /**
     * Give users the ability to override the compare method with their own implementation
     * @return this
     * */
    BinarySearchTree.prototype.compare = function compare(comparator) {
        if (typeof comparator !== 'function') {
            throw new Error("Please pass in a function");
        }
        this.compare = compare;
        return this;
    };

    /**
     * Give users the ability to override the default equality check method
     * with their own implementation
     * @return this
     * */
    BinarySearchTree.prototype.equals = function equals(equalsComparator) {
        if (typeof comparator !== 'function') {
            throw new Error("Please pass in a function");
        }
        this.equals = equalsComparator;
        return this;
    };


    // Expose the Binary Search Tree variable
    if (window.BST === undefined) {
        window.BST = BinarySearchTree;
    }
    if (window.BinarySearchTree === undefined) {
        window.BinarySearchTree = BinarySearchTree;
    } else {
        throw new Error("BinarySearchTree is already defined");
    }

    /**
     * Apply in-order traversal method
     * @return this
     * */
    BinarySearchTree.prototype.inOrderTraversal = function inOrderTraversal(fn) {
        inOrderTraversalImpl(this.root, fn);
        return this;
    };

    /**
     * Apply in-order traversal method
     * @return this
     * */
    BinarySearchTree.prototype.preOrderTraversal = function preOrderTraversal(fn) {
        preOrderTraversalImpl(this.root, fn);
        return this;
    };

    /**
     * Apply in-order traversal method
     * @return this
     * */
    BinarySearchTree.prototype.postOrderTraversal = function postOrderTraversal(fn) {
        postOrderTraversalImpl(this.root, fn);
        return this;
    };

})(); /* End Binary Search Tree Implementation */
