/**
 * @author Jay Lee
 * @see https://www.thecodingdelight.com
 * Queue implementation for my blog post.
 *
 * For this queue implementation,
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
     * */
    function Node(data, nextNode) {
        if (!(this instanceof Node)) {
            return new Node(data, nextNode);
        }
        this.data = data;
        this.nextNode = nextNode || null;
    }

    Node.prototype.setNext = function setNext(node) {
        this.nextNode = node;
        return this;
    };

    Node.prototype.getNext = function getNext() {
        return this.nextNode;
    };

    /**
     * @this {Queue}
     * @param {Array} item the item to be added to the Queue
     * */
    var checkDataType = function checkDataType(item) {
        var itemType = getType(item),
            queueDataType = this.dataType;
        if (itemType !== queueDataType) {
            throw new Error("Item " + item + " is of type: " + itemType +
                ". Queue only accepts data of type: " + queueDataType);
        }
    };

    /**
     * add single data to the back of the Queue
     *
     * @this {Queue}
     * @param data
     * */
    var addToBack = function addToBack(data) {
        if (this.head == null) {
            this.head = new Node(data);
            this.dataType = getType(data);
        } else {
            checkDataType.call(this, data);
            // Set the new head to added data
            // and next node to current head
            var newNode = new Node(data);

            if (this.tail == null) {
                this.tail = newNode;
                // Update references
                // Head --> Tail
                // Head <-- Tail
                this.head.setNext(this.tail);
            } else {
                var prevTail = this.tail;
                var newTail = new Node(data);

                // have previous tail point to new tail
                prevTail.setNext(newTail);
                this.tail = newTail;
            }
        }
        this.size++;
    };

    /**
     * @constructor
     * */
    function Queue() {
        // Ensure that we are creating a new
        // queue object
        if (!(this instanceof Queue)) {
            return new Queue();
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
     * @param item the item to add to the front of the queue.
     * @return {Queue} this
     * */
    Queue.prototype.enqueue = function enqueue(item) {
        addToBack.call(this, item);
        return this;
    };

    /**
     * Remove item at the front of the queue
     * @return {Queue} this
     * */
    Queue.prototype.dequeue = function dequeue() {
        if (this.head != null) {
            var nextNode = this.head.getNext();
            // if Item contains 2 or more elements
            if (nextNode == null) {
                this.tail = null;
            }
            // Remove current head
            this.head = null;
            this.head = nextNode;
            this.size--;
        }
        return this;
    };

    // Expose Queue to the global scope
    if (window.Queue === undefined) {
        window.Queue = Queue;
    } else {
        throw new Error("Queue is already defined in this scope");
    }

})();

var Queue = Queue();

Queue.enqueue(1).enqueue(2).dequeue().dequeue();

Queue.enqueue(1).enqueue(2).enqueue(3);

Queue.enqueue(100);

console.log(Queue);
