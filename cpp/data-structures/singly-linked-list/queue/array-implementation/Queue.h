#pragma once

template <class T>
class Queue
{
private:
	// Internal array
	T *queueData;

	// initial size of array
	int initSize;
	// Front index
	int front;
	int size;

	void DecrementSize();
	void IncrementSize();
	bool ResizeRequired() const;
	void ResizeQueue();

public:
	Queue();
	void Enqueue(T const data);
	T Dequeue();
	~Queue();
	void Print() const;
};
