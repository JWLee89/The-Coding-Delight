/**
 * @Author Jay Lee
 * @see https://www.thecodingdelight.com
 * A basic Linked List implementation for my blog.
 *
 * For this linked list implementation,
 * function expressions will be private functions
 * E.g.
 * var privateFunction = function privateFunction() {
 *     // I am a private function
 * };
 * function declarations starting with a capital letter
 * will be Constructor functions.
 * E.g.
 * function Node() {
 *     // Constructor function
 * }
 * */
(function () {
    "use strict";
    var toString = Object.prototype.toString;

    var getType = function getType(item) {
        return toString.call(item);
    };

    /**
     * Node is a wrapper around data
     * with a pointer to the next node
     *
     * @param data the data
     * @param {Node} nextNode
     * */
    function Node(data, nextNode) {
        if (!(this instanceof Node)) {
            return new Node(data, nextNode);
        }
        this.data = data;
        this.nextNode = nextNode || null;
    }

    var cloneNode = function cloneNode(node) {
        return new Node(node.data, node.nextNode);
    };

    /**
     * @this {LinkedList}
     * @param {Array} list of items to be added
     * */
    var checkDataType = function checkDataType(item) {
        var itemType = getType(item),
            listDataType = this.dataType;
        if (itemType !== listDataType) {
            throw new Error("Item " + item + " is of type: " + itemType +
                ". Linked list only accepts data of type: " + listDataType);
        }
    };

    /**
     * add a list of data into the linked list
     *
     * @this {LinkedList}
     * @param dataToAdd
     * */
    var addSingle = function addSingle(dataToAdd) {
        checkDataType.call(this, dataToAdd);
        if (this.head == null) {
            this.head = Node(dataToAdd);
        } else {
            // Set the new head to added data and next node to current head
            this.head = Node(dataToAdd, this.head);
        }
        this.size++;
    };

    /**
     * add a list of data into the linked list
     *
     * @this {LinkedList}
     * @param {Array} list of items to be added
     * */
    var addBatch = function addBatch(list) {
        for (var i = 0; i < list.length; i++) {
            addSingle.call(this, list[i]);
        }
    };

    var insertNodeAt = function insertNodeAt(nodeToPushDown, dataToAdd) {
        var temp = null;
        if (nodeToPushDown != null) {
            temp = cloneNode(nodeToPushDown);
        }
        // Insert at index
        nodeToPushDown.data = dataToAdd;
        nodeToPushDown.nextNode = temp;
    };

    /**
     * add single data at a specific index.
     * Item currently sitting at that index will be pushed down.
     *
     * @this {LinkedList}
     * @param dataToAdd
     * @param {Number} index
     * */
    var addSingleAt = function addSingleAt(dataToAdd, index) {
        var length = this.size;
        if (index > length) {
            throw new Error("Index out of bounds: " + index);
        }
        var i = 0, currentNode = this.head, previousNode;

        // Traverse the linked list
        while (i < index) {
            previousNode = currentNode;
            currentNode = currentNode.nextNode;
            i++;
        }
        // Index points at last element.
        // Insert at end of linked list
        if (currentNode == null) {
            previousNode.nextNode = new Node(dataToAdd);
        } else {
            insertNodeAt(currentNode, dataToAdd);
        }
        this.size++;
    };

    /**
     * Add batch of nodes to the linked list
     * TODO: Refactor this hot mess when you can
     * */
    var addBatchFrom = function addBatchFrom(currentNode, list, addToEnd) {

        var len = list.length - 1, i = 0, nodeToAddAtTheEnd;

        if (addToEnd) {
            currentNode.nextNode = new Node(list[0]);
            currentNode = currentNode.nextNode;
        } else {
            nodeToAddAtTheEnd = cloneNode(currentNode);
        }

        // Afterwards, start looping from second element in list
        for (; i < len; i++) {
            // set next node
            currentNode.data = list[i];
            currentNode.nextNode = new Node(list[i + 1]);
            // move to next node
            currentNode = currentNode.nextNode;
        }
        // Lastly, set last element to be item that was replaced
        // at the start if we are NOT adding to the end
        if (!addToEnd) {
            currentNode.nextNode = nodeToAddAtTheEnd;
        }
    };

    /**
     * Add a list of data to the linked list at a specific index.
     * Item currently sitting at that index will be pushed down.
     *
     * @this {LinkedList}
     * @param {Array} dataListToAdd
     * @param {Number} index
     * */
    var addBatchAt = function addBatchAt(dataListToAdd, index) {
        var length = this.size;
        if (index > length) {
            throw new Error("Index out of bounds: " + index);
        }
        var i = 0, currentNode = this.head, previousNode;

        // Traverse the linked list
        while (i < index) {
            previousNode = currentNode;
            currentNode = currentNode.nextNode;
            i++;
        }
        // Index points at last element.
        // Insert at end of linked list
        if (currentNode == null) {
            addBatchFrom(previousNode, dataListToAdd, true);
        } else {
            addBatchFrom(currentNode, dataListToAdd, false);
        }
        this.size += length;
    };

    /**
     * Remove item if the item is deemed equal by
     * linked list equality check standards
     *
     * @this {LinkedList}
     * @param itemToRemove
     * */
    var removeItem = function removeItem(itemToRemove) {
        var currentNode = this.head, prevNode = null;
        while (currentNode != null) {

            console.log("comparing: " + currentNode.data + " and " + itemToRemove);

            if (currentNode.data === itemToRemove) {
                console.log("Found item to remove");
                // If we are removing the head
                if (prevNode == null) {
                    console.log("removing head");
                    // set head to next node
                    this.head = currentNode.nextNode;
                } else {
                    // Update references
                    var tempNextNode = currentNode.nextNode;
                    currentNode = prevNode;
                    currentNode.nextNode = tempNextNode;
                }
                this.size--;
                return this;
            }

            // Update pointers and traverse again
            prevNode = currentNode;
            currentNode = currentNode.nextNode;
        }
        console.log("Cannot find item to remove ... boo!");
        return this;
    };

    /**
     * @param items. An item or a list of items that will be batch added into the linked list
     * at start up
     * */
    function LinkedList(items) {

        // Ensure that we are creating a new
        // Linked List object
        if (!(this instanceof LinkedList)) {
            return new LinkedList(items);
        }

        // intialize before adding any items
        this.size = 0;
        // If item is array
        if (Array.isArray(items)) {
            if (items.length > 0) {
                this.dataType = getType(items[0]);
                addBatch.call(this, items);
            } else {
                throw new Error("Please pass in a list with more than one element");
            }
        } else {
            this.dataType = getType(items);
            addSingle.call(this, items);
        }

        // Default equality check is strict equality check.
        this.equals = function compareTo(a, b) {
            return a === b;
        };
    }

    /**
     * @param itemsToAdd either an item or a collection of items to add
     * @return this
     * */
    LinkedList.prototype.add = function add(itemsToAdd) {
        if (Array.isArray(itemsToAdd)) {
            addBatch.call(this, itemsToAdd);
        } else {
            addSingle.call(this, itemsToAdd);
        }
        return this;
    };

    LinkedList.prototype.addByIndex = function addByIndex(itemsToAdd, index) {
        if (Array.isArray(itemsToAdd)) {
            addBatchAt.call(this, itemsToAdd, index);
        } else {
            addSingleAt.call(this, itemsToAdd, index);
        }
        return this;
    };

    /**
     * Remove item by equality check
     *
     * @param itemToRemove
     * @return this
     * */
    LinkedList.prototype.remove = function remove(itemToRemove) {
        removeItem.call(this, itemToRemove);
        return this;
    };

    if (window.LinkedList === undefined) {
        window.LinkedList = LinkedList;

    } else {
        throw new Error("LinkedList is already defined in this scope");
    }

})();

// 4 --> 3 --> 2 --> 1 --> null
var linkedList = LinkedList([1, 2, 3, 4]);

console.log(linkedList);
// 4 -- > 2 --> 1 --> null
// 2 --> 1 --> null
linkedList.remove(3).remove(4);

console.log(linkedList);

// 100 --> 2 --> 1 --> null
linkedList.addByIndex(100, 0);

console.log(linkedList);

// 100 --> 2 --> 1 --> 50 --> 49 --> 48 null
linkedList.addByIndex([50, 49, 48], 3);

console.log(linkedList);

// 100 --> 2 --> 1 --> 53 --> 52 --> 51
// --> 50 --> 49 --> 48 null
linkedList.addByIndex([53, 52, 51], 3);

console.log(linkedList);
