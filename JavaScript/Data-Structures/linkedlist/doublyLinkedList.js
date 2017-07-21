/**
 * @author Jay Lee
 * @see https://www.thecodingdelight.com
 * Doubly Linked List implementation for my blog post.
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
     * with pointers to the next and previous node
     *
     * @param data the data
     * @param {Node} nextNode pointer to the next node
     * @param {Node} prevNode pointer to the previous node
     * */
    function Node(data, nextNode, prevNode) {
        if (!(this instanceof Node)) {
            return new Node(data, nextNode, prevNode);
        }
        this.data = data;
        this.nextNode = nextNode || null;
        this.prevNode = prevNode || null;
    }

    Node.prototype.setPrev = function setPrev(node) {
        this.prevNode = node;
        return this;
    };

    Node.prototype.setNext = function setNext(node) {
        this.nextNode = node;
        return this;
    };

    Node.prototype.getNext = function getNext() {
        return this.nextNode;
    };

    Node.prototype.getPrev = function getPrev() {
        return this.prevNode;
    };

    /**
     * @this {DoublyLinkedList}
     * @param {Array} item the item to be added to the list
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
     * @param data Data to add to the front of the list
     * @this {DoublyLinkedList}
     * */
    var addToFront = function addToFront(data) {
        if (this.head == null) {
            this.head = new Node(data);
            // Tail and head cannot point at the same node
            this.tail = null;
        } else {
            if (this.tail == null) {
                this.tail = new Node(data);
                // Update references
                // Head --> Tail
                // Head <-- Tail
                this.head.setNext(this.tail);
                this.tail.setPrev(this.head);
            } else {
                var prevHead = this.head;
                var newHead = new Node(data);

                // Update references
                // newHead.next --> prevHead
                // prevHead.prev <-- newHead
                newHead.setNext(prevHead);
                prevHead.setPrev(newHead);
                this.head = newHead;
            }
        }
        this.size++;
    };

    /**
     * add single data to the back of the doubly linked list
     *
     * @this {DoublyLinkedList}
     * @param dataToAdd
     * */
    var addToBack = function addToBack(dataToAdd) {
        if (this.head == null) {
            this.head = new Node(dataToAdd);
            this.dataType = getType(dataToAdd);
        } else {
            checkDataType.call(this, dataToAdd);
            // Set the new head to added data
            // and next node to current head
            var newNode = new Node(dataToAdd);

            if (this.tail == null) {
                this.tail = newNode;
                // Update references
                // Head --> Tail
                // Head <-- Tail
                this.head.setNext(this.tail);
                this.tail.setPrev(this.head);
            } else {
                var prevTail = this.tail;
                var newTail = new Node(dataToAdd);

                // Update references
                // prevTail --> newTail
                // prevTail <-- newTail
                newTail.setPrev(prevTail);
                prevTail.setNext(newTail);
                this.tail = newTail;
            }
        }
        this.size++;
    };

    /**
     * @return <code>true</code> if index is closer to end of linked list.
     * @param index
     * @param size the size of the doubly linked list
     * Return <code>false</code> otherwise.
     * */
    var isCloserToEnd = function isCloserToEnd(index, size) {
        // If index / size is greater than 0.5,
        // return 1. Otherwise, 0.
        return  Math.round(index / size) === 1;
    };

    /**
     * add single data at a specific index.
     * Item currently sitting at that index will be pushed down.
     *
     * @this {DoublyLinkedList}
     * @param dataToAdd
     * @param {Number} index
     * */
    var insertAfter = function insertAfter(dataToAdd, index) {
        var length = this.size;
        if (index > length) {
            throw new Error("Index out of bounds: " + index);
        }
        // Get node at a specific index
        var currentNode = getNodeAt.call(this, index);
        // Add node
        insertNode.call(this, dataToAdd, currentNode, currentNode.getNext());
    };

    var insertNode = function insertNode(dataToAdd, currentNode, nextNode) {
        var newNode = new Node(dataToAdd);
        // If next node is null, current node is the tail node
        if (nextNode == null) {
            console.log("Inserting tail node");
            this.tail = newNode;
            this.tail.setPrev(currentNode);
            currentNode.setNext(newNode);
        } else {
            // Has both next and previous node.
            // Is somewhere in the middle of the linked list.
            console.log("Inserting non head/tail node");

            // First, have both prev and next node
            // point to node to insert
            currentNode.setNext(newNode);
            nextNode.setPrev(newNode);

            // Afterwards, have node to insert
            // prevNode point back to prev node.
            // and nextNode point to next node
            newNode.setPrev(currentNode);
            newNode.setNext(nextNode);
        }
        // NOTE: We don't have to worry
        // about the case where list is empty
        // If list is empty, we will throw an exception
        // Because we can't insert after an element,
        // if there are no elements in the list
        // to begin with.
        this.size++;
    };

    /**
     * @this {DoublyLinkedList}
     * */
    var removeNode = function removeNode(nodeToRemove) {
        var prevNode = nodeToRemove.getPrev();
        var nextNode = nodeToRemove.getNext();
        // Head node does not have a previous node
        if (prevNode == null) {
            this.head = null;
            this.head = nextNode;
            this.head.setPrev(null);
        } else if (nextNode == null) {
            // Tail does not have a next node
            this.tail = null;
            this.tail = prevNode;
            this.tail.setNext(null);
        } else {
            // Is somewhere in the middle of the linked list
            // Set current node to null
            nodeToRemove = null;
            // connect the previous and next nodes together
            prevNode.setNext(nextNode);
            nextNode.setPrev(prevNode);
        }
        this.size--;
    };

    var getNodeAt = function getNodeAt(index) {
        var currentNode;
        var counter;
        if (isCloserToEnd(index)) {
            currentNode = this.tail;
            counter = this.size - 1;
            console.log("iterating from the tail");
            while (currentNode != null && counter !== index) {
                currentNode = currentNode.getPrev();
                counter--;
            }
        } else {
            currentNode = this.head;
            counter = 0;
            console.log("iterating from the head");
            while (currentNode != null && counter !== index) {
                currentNode = currentNode.getNext();
                counter++;
            }
        }
        return currentNode;
    };

    /**
     * Remove item if the item is deemed equal by
     * linked list equality check standards
     *
     * @this {DoublyLinkedList}
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
     * @constructor
     * */
    function DoublyLinkedList() {

        // Ensure that we are creating a new
        // Linked List object
        if (!(this instanceof DoublyLinkedList)) {
            return new DoublyLinkedList();
        }
        // initialize before adding any items
        this.size = 0;
        this.head = null;
        this.tail = null;
        // Default equality check is strict equality check.
        this.equals = function compareTo(a, b) {
            return a === b;
        };
    }

    /**
     * @param item added onto the back of the list
     * @return {DoublyLinkedList} this
     * */
    DoublyLinkedList.prototype.add = function add(item) {
        addToBack.call(this, item);
        return this;
    };

    /**
     * @param item the item to add to the front of the list.
     * @return {DoublyLinkedList} this
     * */
    DoublyLinkedList.prototype.addFront = function addFront(item) {
        addToFront.call(this, item);
        return this;
    };

    /**
     * @param item to add to the list.
     * @param {Number} index the index after which to insert item.
     * @return {DoublyLinkedList} this
     * */
    DoublyLinkedList.prototype.addAfter = function addAfter(item, index) {
        insertAfter.call(this, item, index);
        return this;
    };

    /**
     * Remove item at the front of the list
     * @return {DoublyLinkedList} this
     * */
    DoublyLinkedList.prototype.removeFromFront = function removeFromFront() {
        if (this.head != null) {
            var nextNode = this.head.getNext();
            // Set prev node of next to null if it exists
            if (nextNode != null) {
                nextNode.setPrev(null);
            } else {
                this.tail = null;
            }
            // Remove current head
            this.head = null;
            this.head = nextNode;
            this.size--;
        }
        return this;
    };

    /**
     * Remove item at the back of the list
     * @return {DoublyLinkedList} this
     * */
    DoublyLinkedList.prototype.removeFromBack = function removeFromBack() {
        if (this.head != null) {
            if (this.tail != null) {
                // Two or more elements exist
                var newTail = this.tail.getPrev();
                this.tail = null;
                newTail.setNext(null);
                this.tail = newTail;
            } else {
                // Tail is null but head is not null
                // means that this is the last element
                this.head = null;
            }
            this.size--;
        }
        return this;
    };

    /**
     * Remove item at a specific index.
     * @param {Number} index the position of the item to remove.
     * @return {DoublyLinkedList} this
     * */
    DoublyLinkedList.prototype.removeAt = function removeAt(index) {
        if (this.index > this.size - 1) {
            throw new Error("DoublyLinkedList is currently of size " + this.size);
        }
        var nodeToRemove = getNodeAt.call(this, index);
        removeNode.call(this, nodeToRemove);
        return this;
    };

    /**
     * Remove item by equality check
     *
     * @param itemToRemove
     * @return this
     * */
    DoublyLinkedList.prototype.remove = function remove(itemToRemove) {
        removeItem.call(this, itemToRemove);
        return this;
    };

    // Expose doubly linked list to the global scope
    if (window.DoublyLinkedList === undefined) {
        window.DoublyLinkedList = DoublyLinkedList;
    } else {
        throw new Error("DoublyLinkedList is already defined in this scope");
    }

})();

var DoublyLinkedList = DoublyLinkedList();

DoublyLinkedList.add(1).add(2).removeFromFront().removeFromFront();

DoublyLinkedList.add(1).add(2).add(3);

DoublyLinkedList.addAfter(4, 2);

DoublyLinkedList.removeFromBack();

DoublyLinkedList.removeAt(0);

DoublyLinkedList.addFront(100);

console.log(DoublyLinkedList);
