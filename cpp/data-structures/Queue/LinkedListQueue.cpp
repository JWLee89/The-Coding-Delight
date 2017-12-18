#include "stdafx.h"
#include "LinkedListQueue.h"
#include <ostream>
#include <iostream>

struct EmptyQueueException : public std::exception {
	const char * what() const throw () {
		return "C++ Exception: Queue is empty ... ";
	}
};

template <class T>
typename LinkedListQueue<T>::nodePtr LinkedListQueue<T>::CreateNode(T data)
{
	nodePtr newNode = new Node;
	newNode->data = data;
	newNode->next = nullptr;
	return newNode;
}

template <class T>
void LinkedListQueue<T>::EmptyQueue()
{
	while (this->head != nullptr)
	{
		nodePtr current_node = this->head;
		std::cout << "Removing " << current_node->data << " ... " << std::endl;
		this->head = this->head->next;
		delete current_node;
	}
	this->tail = nullptr;
	this->size = 0;
}

template <class T>
LinkedListQueue<T>::LinkedListQueue()
{
	this->head = nullptr;
	this->tail = nullptr;
	this->size = 0;
}

template <class T>
LinkedListQueue<T>::~LinkedListQueue()
{
	std::cout << "Cleaning resources ... " << std::endl;
	this->EmptyQueue();
}

/**
 * \brief 
 * \param data The data to add to the queue. 
 * Remember, it is added to the back of the queue. Wait in line!
 */
template <class T>
void LinkedListQueue<T>::Enqueue(const T data)
{
	nodePtr newNode = CreateNode(data);
	if (this->IsEmpty())
	{
		this->head = newNode;
	}
	else
	{
		if (this->tail == nullptr)
		{
			this->tail = newNode;
			this->head->next = this->tail;
		}
		else
		{
			nodePtr prevTail = this->tail;

			this->tail = newNode;
			// Set previous tail's next node pointer to point at new tail
			prevTail->next = this->tail;
		}
	}
	++this->size;
}

template <class T>
T LinkedListQueue<T>::Dequeue()
{
	T dataToReturn;
	if (this->IsEmpty())
	{
		throw EmptyQueueException();
	}
	else
	{
		dataToReturn = this->head->data;
		if (this->tail == nullptr)
		{
			delete this->head;
		}
		else
		{
			// Set next node as the new head.
			nodePtr prevHead = this->head;
			this->head = this->head->next;
			delete prevHead;
		}

	}
	--this->size;
	return dataToReturn;
}

template <class T>
int LinkedListQueue<T>::Size() const
{
	return this->size;
}

template <class T>
bool LinkedListQueue<T>::IsEmpty() const
{
	return this->head == nullptr;
}

template <class T>
void LinkedListQueue<T>::Print() const
{
	nodePtr current_node = this->head;
	int counter = 0;
	std::cout << "LinkedListQueue [";
	// While current_node does not point to null
	while (counter < this->size)
	{
		std::cout << current_node->data << " --> ";
		current_node = current_node->next;
		++counter;
	}
	std::cout << " ]" << std::endl;
}

// Template declaration
template LinkedListQueue<int>::LinkedListQueue();
template LinkedListQueue<int>::~LinkedListQueue();
template void LinkedListQueue<int>::Enqueue(const int data);
template void LinkedListQueue<int>::Print() const;
template int LinkedListQueue<int>::Dequeue();
template int LinkedListQueue<int>::Size() const;
template bool LinkedListQueue<int>::IsEmpty() const;
