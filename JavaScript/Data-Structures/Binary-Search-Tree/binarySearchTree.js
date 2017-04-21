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
        if (data == null) {
            this.leftChild = null;
        } else if (data instanceof Node) {
            this.leftChild = data;
        } else {
            this.leftChild = Node(data);
        }
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
        if (data == null) {
            this.rightChild = null;
        } else if (data instanceof Node) {
            this.rightChild = data;
        } else {
            this.rightChild = Node(data);
        }
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
        this.root = null;                                           // Root of the binary search tree.
        this.compare = function compare(currentNodeData, dataToInsert) { // Default comparator function.
            return currentNodeData > dataToInsert;
        };
        this.equals = function equals(a, b) {                            // Default equals comparator
            return a === b;
        };
        this.dataType = null;                                       // Determines the data type of the tree based on the type of the first element inserted
    }

    /**
     * Cache methods used more than once
     * */
    var objProto = Object.prototype;
    var toString = objProto.toString;
    var isObject = function isObject(item) {
       return toString.call(item) === "[object Object]";
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
     * rather than using recursion. But recursion, can improve the readability
     * of the code, especially if the problem involves doing the same action
     * over and over again, which is what recursion is.
     * Needless to say, for or while loops are also for repeating a code block, but
     * recursion can be more intuitive, because the function or subroutine we are calling
     * has a name, which describes the very thing we are doing over and over again.
     * @param currentNode the node that we are comparing.
     * @param dataToInsert this will be compared with the value stored in the current node.
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

    /**
     * Remove a node from the binary search tree via recursive call.
     * Recursive call can be made, because each sub-tree in it of itself is a binary search tree!!
     * What I mentioned just now is really important!
     * @param currentNode the node that we are comparing.
     * @param dataToDelete The data we are searching for. When found, the node holding the data will be deleted
     * @param parentChildIdentifier represents the child identifier key in the parent node. E.g. leftChild or rightChild.
     * Will be null if it is a root node.for since root node doesn't have a parent. If set to leftChild, it means the following:
     * "The current node is the left child of the parent".
     * Hope the term above makes sense.
     * @this BinarySearchTree
     * */
    function removeNode(currentNode, dataToDelete, parentChildIdentifier) {
        if (currentNode == null) { // No elements. Set root to null
            return currentNode;
        }

        var currentData = currentNode.data,
            leftChild = currentNode.getLeftChild(),
            rightChild = currentNode.getRightChild(),
            parent = currentNode.getParentNode();

        // Found data to remove. Destroy the node object.
        if (this.equals(currentData, dataToDelete)) {
            // Check how many children this tree has.
            // Operations are fairly simple for nodes with zero or a single child node.

            if (leftChild == null && rightChild == null) {
                if (parent) {
                    parent[parentChildIdentifier] = null;       // Deference the current node from the parent object if it has a parent.
                }
                console.log("removing " + currentNode.data);
                return null;                                    // Set the current node to null.
            }

            if (leftChild == null) {                                // Left child does not exist.
                console.log("remove a node with a right child");
                currentNode = null;                                 // Dereference the current node.
                if (parent) {
                    console.log("Data to link. Parent: " + parent.data + ". rightChild: " + rightChild.data);
                    parent[parentChildIdentifier] = rightChild;     // Have appropriate parent child node pointer point to the child
                }
                return rightChild;                                  // Set the root node to the right child of the current node.
            } else if (rightChild == null) {
                console.log("remove a node with a left child");
                currentNode = null;                                 // Dereference the current node.
                if (parent) {
                    console.log("Data to link. Parent: " + parent.data + ". leftChild: " + leftChild.data);
                    parent[parentChildIdentifier] = leftChild;      // Have appropriate parent child node pointer point to the child
                }
                return leftChild;                                   // Set the root node to the left child of the current Node
            } else {
                console.log("removing a node with two children ...");

                // The most complex case: Node to delete has two children.
                // 1. Get maximum node in the left subtree.
                var maxNodeLeftSubTree = getMaxNode(leftChild);
                // 2. Set the data of the current node to that of the max node in the left Sub-tree
                currentNode.data = maxNodeLeftSubTree.data;
                // 3. Remove the node in the left sub-tree with the maximum value. Otherwise, there will be two copies.
                // Think of this as simply copying the value and deleting the previous instance of the copy. Because that's what it is!
                console.log("Max node left sub-tree: " + maxNodeLeftSubTree.data);
                // Remove the largest node on the left sub-tree.
                var leftChild = removeNode.call(this, leftChild, maxNodeLeftSubTree.data);
                currentNode.setLeftChild(leftChild);
            }
        }
        // Default behavior is left is greater than right.
        // In another words, if current data is greater than data to delete.
        // Go to the left sub-tree. Otherwise, go to the right sub-tree.
        // The last parameter, "leftChild" is the parentChildIdentifier.
        // Lets users know that the current node is the left child of the parent.
        else if (this.compare(currentData, dataToDelete)) {
            console.log("traversing left: ");
            var leftRemoval = removeNode.call(this, leftChild, dataToDelete, "leftChild");
            console.log("Right removal data: " + (leftRemoval ? leftRemoval.data : " - is null"));
            console.log("----------------------------------------------");
            currentNode.setLeftChild(leftRemoval);
        } else {
            console.log("traversing right: ");
            var rightRemoval = removeNode.call(this, rightChild, dataToDelete, "rightChild");
            console.log("Right removal data: " + (rightRemoval ? rightRemoval.data : " - is null"));
            console.log("----------------------------------------------");
            currentNode.setRightChild(rightRemoval);
        }
        console.log("Current node: " + currentNode.data);
        return currentNode;
    }

    /**
     * Destroy node object by removing the appropriate key
     * in the parent object. Admittedly, this is more difficult
     * to implement in JavaScript than your traditional OOP language
     * like Java.
     * @param currentNode The node that will be destroyed
     * @param parentChildIdentifier The key that shows users whether the current node is a left or right child of parent node
     * @return the appropriate child element
     * */
    function destroyNodeObject(currentNode, parentChildIdentifier) {
        var leftChild = currentNode.getLeftChild(),
            rightChild = currentNode.getRightChild(),
            parent = currentNode.getParentNode();

        // Check how many children this tree has.
        // Operations are fairly simple for nodes with zero or a single child node.
        if (leftChild == null && rightChild == null) {
            console.log("removing " + currentNode.data);
            parent[parentChildIdentifier] = null;   // Deference the current node from the parent object
            return null;                            // Set the current node to null.
        }

        if (leftChild == null) {                // Left child does not exist.
            console.log("remove a node with a child");
            currentNode = null;                 // Dereference the current node.
            rightChild["parentNode"] = null;    // Remove reference from the parent
            return rightChild;                  // Set the root node to the right child of the current node.
        }
        else if (rightChild == null) {          // Right child does not exist.
            console.log("remove a node with a left child");
            currentNode = null;                 // Dereference the current node.
            leftChild["parentNode"] = null;     // Remove reference from the parent
            return leftChild;                   // Set the root node to the left child of the current Node
        } else {
            console.log("removing a node with two children ...");
            // The most complex case: Node to delete has two children.
            // 1. Get maximum node in the right subtree.
            var maxNodeLeftSubTree = getMaxNode(leftChild);
            // 2. Set the data of the current node to that of the max node in the leftSub-tree
            currentNode.data = maxNodeLeftSubTree.data;
            // 3. Remove the node in the left sub-tree with the maximum value. Otherwise, there will be two copies.
            // Think of this as simply copying the value and deleting the previous instance of the copy. Because that's what it is!
            console.log("Max node left sub-tree: " + maxNodeLeftSubTree.data);
            // Remove the largest node on the left sub-tree.
            var leftChild = removeNode.call(this, leftChild, maxNodeLeftSubTree.data);
            currentNode.setLeftChild(leftChild);
        }
        return currentNode;
    }

    /**
     * Get minimum node from a certain node.
     * Logically speaking, to get the minimum value in a sub-tree,
     * we need to go to the far left.
     * Go far left via recursive call until there is no left child.
     * Return the node that doesn't have a left child.
     * */
    function getMinNode(currentNode) {
        var leftChild = currentNode.getLeftChild();
        if (leftChild != null) {
            currentNode = getMinNode(leftChild);
        }
        return currentNode;
    }

    /**
     * Get maximum node from a certain node.
     * Conversely to acquiring the min node, we head to the far right.
     * Return the node that doesn't have a right child.
     * */
    function getMaxNode(currentNode) {
        var rightChild = currentNode.getRightChild();
        if (rightChild != null) {
            currentNode = getMaxNode(rightChild);
        }
        return currentNode;
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
     * 1. Traverse the left subtree, i.e., call postOrderTraversalImpl(left-subtree) recursively
     * 2. Traverse the right subtree, i.e., call postOrderTraversalImpl(right-subtree) recursively
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
     * Add data to the binary tree.
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
     * @param dataToRemove The data to remove
     * */
    BinarySearchTree.prototype.remove = function remove(dataToRemove) {
        if (!this.isEmpty()) {
            this.root = removeNode.call(this, this.root, dataToRemove);
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

    /**
     * Return the "lowest" value from the tree.
     * */
    BinarySearchTree.prototype.min = function min() {
        if (!this.isEmpty()) {
            return getMinNode(this.root).data;
        }
        throw new Error("Cannot call min() on empty tree");
    };

    /**
     * Return the "highest" value from the tree.
     * */
    BinarySearchTree.prototype.max = function max() {
        if (!this.isEmpty()) {
            return getMaxNode(this.root).data;
        }
        throw new Error("Cannot call max() on empty tree");
    };

    /**
     * Apply in-order traversal method
     * @return this
     * */
    BinarySearchTree.prototype.inOrderTraversal = function inOrderTraversal(fn) {
        inOrderTraversalImpl(this.root, fn);
        return this;
    };

    /**
     * Apply pre-order traversal method
     * @return this
     * */
    BinarySearchTree.prototype.preOrderTraversal = function preOrderTraversal(fn) {
        preOrderTraversalImpl(this.root, fn);
        return this;
    };

    /**
     * Apply post-order traversal method
     * @return this
     * */
    BinarySearchTree.prototype.postOrderTraversal = function postOrderTraversal(fn) {
        postOrderTraversalImpl(this.root, fn);
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

})(); /* End Binary Search Tree Implementation */
