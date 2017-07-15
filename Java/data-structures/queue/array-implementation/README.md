# Queue Array Implementation

Hello, 

All the implementations of the queue data structure that uses a regular array as the underlying data structure will be posted here.

# API Documentation

Basic API documentation for the queue interface.

## `void enqueue(T data)`

Add data to the front of the queue.

```
queue.enqueue(1);          // Add item to the front of the queue
```

## `T dequeue()`

Remove the first item or the item at the front of the queue. Not to be confused with dequeue (double-ended queue). 
Return the item that was removed.

E.g. 
```
queue.enqueue(1);          // Add item to the front of the queue
int one = queue.dequeue(); // 1
```
## `int size()`

Get the size of the Queue.

## `T front()`

Get data at the front of the Queue.

 * **Returns:** T data

     <p>

## `boolean isEmpty()`

Check if queue is empty.

## `void print()`

Print items in the queue.
