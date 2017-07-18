// Queue.cpp : Defines the entry point for the console application.
//

#include "stdafx.h"
#include "Queue.h"
#include <ostream>
#include <iostream>

template <class T>
void Queue<T>::DecrementSize()
{
	++this->front;
	--this->size;
}

template <class T>
void Queue<T>::IncrementSize()
{
	++this->size;
}

template <class T>
bool Queue<T>::ResizeRequired() const
{
	return this->queueData[this->initSize - 1] != NULL;
}

template <class T>
void Queue<T>::ResizeQueue()
{
	std::cout << "Resizing or reshuffling queue. Size: " << this->size 
			  << ". initSize: " << this->initSize << std::endl;
	if (this->size >= this->initSize)
	{
		this->initSize *= 2;
		std::cout << "Doubling size of the array to: " << this->initSize << std::endl;
		// () to get default null value
		T *newQueueData = new T[initSize]();
		int i = this->front; 
		int index = 0;
		int endIndex = i + this->size;
		for (; i < endIndex; ++i)
		{
			newQueueData[index] = this->queueData[i];
			++index;
		}

		// Free memory
		delete[] this->queueData;

		// Assign newly created array to queueData
		this->queueData = newQueueData;
	}
	else
	{
		std::cout << "Reshuffling array --------------------" << std::endl;
		// Reshuffle Array
		int index = 0;
		int endIndex = this->front + this->size;
		for (int i = front; i < endIndex; i++)
		{
			queueData[index] = queueData[i];
			queueData[i] = NULL;
			index++;
		}
	}
	this->front = 0;
}

template <class T>
Queue<T>::Queue(): initSize(10), front(0), size(0)
{
	// () to get default null value
	this->queueData = new T[this->initSize]();
}

template <class T>
void Queue<T>::Enqueue(const T data)
{
	this->IncrementSize();
	this->queueData[this->front + this->size - 1] = data;
	if (this->ResizeRequired())
	{
		this->ResizeQueue();
	}
}

template <class T>
T Queue<T>::Dequeue()
{
	T dataToReturn = this->queueData[front];
	this->queueData[front] = NULL;
	this->DecrementSize();
	return dataToReturn;
}

template <class T>
Queue<T>::~Queue()
{
	std::cout << "Cleaning up array --> " << std::endl;
	delete[] this->queueData;
}

template <class T>
void Queue<T>::Print() const
{
	int endIndex = this->front + this->size;

	std::cout << "Front index: " << this->front << ". size: " << this->size << std::endl;

	std::cout << "Queue [";
	for (int i = this->front; i < endIndex; i++)
	{
		std::cout << this->queueData[i] << " --> ";
	}
	std::cout << "]" << std::endl;
}

// Template declaration
template Queue<int>::Queue<int>();
template Queue<int>::~Queue<int>();
template int Queue<int>::Dequeue();
template void Queue<int>::Enqueue(const int data);
template void Queue<int>::Print() const;
template void Queue<int>::IncrementSize();
template void Queue<int>::DecrementSize();
