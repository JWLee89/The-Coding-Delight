// DoublyLinkedList.cpp : Defines the entry point for the console application.
//

#include "stdafx.h"
#include "DoublyLinkedList.h"
#include <ostream>
#include <iostream>

struct ArrayOutOfBoundsException : public std::exception {
	const char * what() const throw () {
		return "C++ Exception: Index out of bounds boy!Check yo input!";
	}
};

template <class T>
typename DoublyLinkedList<T>::nodePtr DoublyLinkedList<T>::CreateNode(T data)
{
	nodePtr newNode = new Node;
	newNode->data = data;
	newNode->next = nullptr;
	newNode->prev = nullptr;
	return newNode;
}

/**
 *
 * Get node at a specific index
 */
template <class T>
typename DoublyLinkedList<T>::nodePtr DoublyLinkedList<T>::GetNodeAt(int index)
{
	if (this->size <= index)
	{
		throw ArrayOutOfBoundsException();
	}

	int counter = 0;
	// You can compare the size with index to see if 
	// Iterating from the head is faster 
	// or if starting from the tail will be faster.
	nodePtr node = this->head;

	while (counter != index && node != nullptr)
	{
		node = node->next;
		++counter;
	}
	std::cout << "node value is: " << node->data << std::endl;

	return node;
}

template <class T>
void DoublyLinkedList<T>::EmptyList()
{
	nodePtr currentNode = this->head;
	while (currentNode != nullptr)
	{
		nodePtr next = currentNode->next;
		std::cout << "Deleting --> " << currentNode->data << std::endl;
		delete currentNode;
		currentNode = next;
	}
}

/**
 * \brief 
 * \param nodeToDelete 
 */
template <class T>
void DoublyLinkedList<T>::RemoveNode(nodePtr nodeToDelete)
{
	nodePtr prevNode = nodeToDelete->prev;
	nodePtr nextNode = nodeToDelete->next;

	// head
	if (prevNode == nullptr)
	{
		std::cout << "Removing head: " << nodeToDelete->data << std::endl;
		this->head = nullptr;
		this->head = nextNode;
		if (this->head != nullptr)
		{
			this->head->prev = nullptr;
		}
	}
	// tail 
	else if (nextNode == nullptr)
	{
		std::cout << "Removing tail: " << nodeToDelete->data << std::endl;
		this->tail = nullptr;
		this->tail = prevNode;
		if (this->tail != nullptr)
		{
			this->tail->next = nullptr;
		}
	}
	// Middle
	else
	{
		std::cout << "Removing middle: " << nodeToDelete->data << std::endl;
		nextNode->prev = prevNode;
		prevNode->next = nextNode;
	}
	delete nodeToDelete;
	--this->size;
}

template <class T>
DoublyLinkedList<T>::DoublyLinkedList() : size(0)
{
	this->head = nullptr;
	this->tail = nullptr;
	std::cout << "Created new doubly linked list" << std::endl;
}

template <class T>
DoublyLinkedList<T>::~DoublyLinkedList()
{
	std::cout << "Destroying doubly linked list" << std::endl;
	this->EmptyList();
}

template <class T>
void DoublyLinkedList<T>::InsertAtBack(T data)
{
	nodePtr newNode = CreateNode(data);
	if (this->head == nullptr)
	{
		std::cout << "adding first item to the list " << std::endl;
		this->head = newNode;
	}
	else
	{
		if (this->tail == nullptr)
		{
			std::cout << " setting tail for the first time " << std::endl;

			this->tail = newNode;
			this->head->next = this->tail;
			this->tail->prev = this->head;
		}
		else
		{
			std::cout << " adding item to the back of the list " << std::endl;
			nodePtr prevTail = this->tail;
			newNode->prev = prevTail;
			prevTail->next = newNode;
			this->tail = newNode;
		}
	}
	++this->size;
}

template <class T>
void DoublyLinkedList<T>::DeleteAt(int index)
{
	std::cout << "Getting node to delete" << std::endl;
	nodePtr nodeTodelete = nullptr;
	try
	{
		nodeTodelete = GetNodeAt(index);
		RemoveNode(nodeTodelete);
	}
	catch(ArrayOutOfBoundsException &e)
	{
		std::cout << e.what() << index << std::endl;
	}
}

/**
 * \brief 
 * \param data The data to delete
 */
template <class T>
void DoublyLinkedList<T>::Delete(T data)
{
	nodePtr currentNode = this->head;
	while (currentNode != nullptr)
	{
		// Found data to remove
		if (data == currentNode->data)
		{
			RemoveNode(currentNode);
		}
		currentNode = currentNode->next;
	}
}

template <class T>
void DoublyLinkedList<T>::Print() const
{
	nodePtr currentNode = this->head;
	std::cout << "DoublyLinkedList[";
	while (currentNode != nullptr)
	{
		std::cout << currentNode->data << " --> ";
		currentNode = currentNode->next;
	}
	std::cout << "]" << std::endl;
}

template typename DoublyLinkedList<int>::nodePtr DoublyLinkedList<int>::CreateNode(int data);
template typename DoublyLinkedList<int>::nodePtr DoublyLinkedList<int>::GetNodeAt(int index);

template DoublyLinkedList<int>::DoublyLinkedList();
template DoublyLinkedList<int>::~DoublyLinkedList();
template void DoublyLinkedList<int>::InsertAtBack(int data);
template void DoublyLinkedList<int>::EmptyList();
template void DoublyLinkedList<int>::Delete(int index);
template void DoublyLinkedList<int>::DeleteAt(int index);
template void DoublyLinkedList<int>::Print() const;
template void DoublyLinkedList<int>::RemoveNode(nodePtr nodeToDelete);
