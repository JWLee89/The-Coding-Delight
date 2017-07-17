/**
 * @author Jay Lee
 *
 * Implementation of the queue data structure
 * for demonstration and educational purposes.
 *
 * Function expressions will be private functions
 * E.g.
 * var privateFunction = function privateFunction() {
 *     // I am a private function
 * };
 * function declarations starting with a capital letter
 * will be Constructor functions.
 * E.g.
 * function Queue() {
 *     // Constructor function
 * }
 *
 * */
(function() {

    /**
     * @constructor Queue constructor function
     * */
    function Queue() {
        if (!(this instanceof Queue)) {
            return new Queue();
        }
        // default starting size of queue
        this.initSize = 10;
        this.queueData = new Array(10);
        this.size = 0;
        this.front = 0;
    }

    /**
     * =========================================
     * =========== Private functions ===========
     * =========================================
     * */


    /**
     * Increment size.
     * @this {Queue}
     * */
    var incrementSize = function incrementSize() {
        this.size++;
    };

    /**
     * Increment the size of front index.
     * decrement size.
     * @this {Queue}
     * */
    var decrementSize = function decrementSize() {
        this.front++;
        this.size--;
    };

    /**
     * Check to see if we need to resize the internal array.
     *
     * @this {Queue}
     * @return {boolean} <p><code>true</code> if last element in list
     * is not empty. Otherwise, return <code>false</code>.</p>
     * */
    var resizeRequired = function resizeRequired() {
        return this.queueData[this.initSize - 1] != null;
    };

    /**
     * Resize the queue. If all the indexes are full, the increase the size
     * of the array.
     * Otherwise, move all the items that have actual values to the front of the
     * array.
     *
     * @this {Queue}
     * */
    var resizeQueue = function resizeQueue() {

        var front       = this.front;
        var queueData   = this.queueData;
        var initSize    = this.initSize;
        var size        = this.size;

        if (size >= initSize) {
            this.initSize *= 2;
            // copy elements into the new array.
            var index = 0;
            var arr     = new Array(initSize);

            for (var i = front; i < size; i++) {
                arr[index] = queueData[i];
                index++;
            }
            // Lastly replace existing queue data
            this.queueData = arr;
        }
        // Otherwise, do not increase size,
        // but simply the non null items to the front
        else {
            var index = 0;
            console.log("reshuffling array ------------- Before reshuffle");
            // printWithNulls();
            for (var i = front; i < initSize; i++) {
                queueData[index] = queueData[i];
                queueData[i] = null;
                index++;
            }
            console.log("after reshuffle -------------------");
            // printWithNulls();
        }
        this.front = 0; // reset front to 0
    };

    /**
     * Add item to the front of the queue.
     * @return this
     * */
    Queue.prototype.enqueue = function enqueue(data) {
        incrementSize.call(this);
        this.queueData[this.front + this.size - 1] = data;
        // Resize queue if required
        if (resizeRequired.call(this)) {
            resizeQueue.call(this);
        }
        return this;
    };

    /**
     * Remove item at the front of the queue.
     * @return this
     * */
    Queue.prototype.dequeue = function dequeue() {
        this.queueData[this.front] = null;
        decrementSize.call(this);
        return this;
    };

    /**
     * @return {boolean} <p><code>true</code> if queue is empty.
     * Otherwise, return <code>false</code>.</p>
     * */
    Queue.prototype.isEmpty = function isEmpty() {
        return this.size === 0;
    };

    /**
     * Get the size of the list.
     * @return {number} the size of the list.
     * */
    Queue.prototype.size = function size() {
        return this.size;
    };

    if (window.Queue === undefined) {
        window.Queue = Queue;
    } else {
        console.log("Queue is already defined");
    }

})();

var queue = new Queue();
queue.enqueue(1).enqueue(2);

queue.dequeue().dequeue()
    .enqueue(1)
    .enqueue(2)

    .dequeue()

    .enqueue(3)
    .enqueue(4)
    .enqueue(5)
    .enqueue(6)
    .enqueue(7)
    .enqueue(8)
    .enqueue(9);

console.log(queue);

queue
    .enqueue(10)
    .enqueue(11)
    .enqueue(12);

console.log(queue);
