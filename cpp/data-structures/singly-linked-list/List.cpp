#include "stdafx.h"
#include "List.h"
#include <iostream>
#include "Node.h"

/**
 * \brief Create a node
 * \param data 
 * \return 
 */
/*template <class T>
typename List<T>::node_ptr List<T>::CreateNode(T data)
{
	node_ptr newNodePtr = new Node;
	newNodePtr->data = data;
	return newNodePtr;
}*/

void List::IncrementSize()
{
	this->sz++;
}

void List::DecrementSize()
{
	this->sz--;
}

/**
 * \brief Constructor for the linked list
 */
List::List()
{
	this->head = nullptr;	// Initialize. Otherwise, we will get some funky results.
	this->sz = 0;
	std::cout << "Initializing linked list ..." << std::endl;
}

// TODO: Write the implementation in the near future.
List::List(const List& rhs)
{
	std::cout << "Starting the copying process ---- " << std::endl;

	// Call regular constructor
	this->head = nullptr;
	this->sz = 0;

	node_ptr currentNodePtr = rhs.head;
	while (currentNodePtr != nullptr)
	{
		std::cout << "adding: --> " << currentNodePtr->data << std::endl;
		this->Add(currentNodePtr->data);
		currentNodePtr = currentNodePtr->nextNode;
	}
	std::cout << "Copied all elements from right hand side to the left ... " << std::endl;
}


/**
 * \brief 
 * \param data The data to be added to the linked list
 */
void List::Add(int data)
{
	// Step 1.
	node_ptr newNodePtr = new Node;
	newNodePtr->data = data; 
	newNodePtr->nextNode = nullptr;			// Initialize all the fields
	
	// Step 2.
	if (IsEmpty())
	{
		this->head = newNodePtr;
	} 
	// Step 3.
	// List already contains a node. 
	// Therefore, add the node to the front of the linked list.
	else 
	{	
		node_ptr prevHeadPtr = this->head;	// Get reference to current head. 
		this->head = newNodePtr;			// Set newly inserted node to be the new head	
		newNodePtr->nextNode = prevHeadPtr; // Set new head to point to previous head
	}
	// Step 4.
	IncrementSize();
}


/**
 * \brief Look through the linked list O (log n) and find the data to remove.
 * \param data 
 * \return <code>true</code> if data exists and is removed from linked list
 * Otherwise, return <code>false</code>
 */
bool List::Remove(int data)
{
	// Point to the previous node. Used when joining nodes
	node_ptr prevNodePtr = nullptr;
	node_ptr currentNodePtr = head;

	if (IsEmpty())
	{
		return false;
	}
	while (currentNodePtr != nullptr)
	{
		// Found data to remove. Perform remove operation.
		if (data == currentNodePtr->data)
		{
			node_ptr nodeAfterCurrentPtr = currentNodePtr->nextNode;

			// Deleting head 
			if (prevNodePtr == nullptr)
			{
				// Set the node after current Ptr as new head
				this->head = nodeAfterCurrentPtr;
				// For demonstrational purposes
				std::cout << "Deleted HEAD node with value: "
					<< data << "!" << std::endl;
			}
			// Deleting a node that is not the head. 
			else
			{
				// Set previous node to point at node after the one to delete
				prevNodePtr->nextNode = nodeAfterCurrentPtr;
				// For demonstrational purposes
				std::cout << "Deleted node with value: "
					<< data << "!" << std::endl;
			}

			// Deallocate from heap memory.
			delete currentNodePtr;

			DecrementSize();

			return true;
		}
		// Set the previous node pointer now to current node.
		// So that when loop repeats, it will point to previous node.
		prevNodePtr = currentNodePtr;
		// Afterwards, currentNodePtr will move onto the next node.
		currentNodePtr = currentNodePtr->nextNode;
	}
	// Just for demonstrational purposes, log to users 
	// that item was not found in the list.
	std::cout << "Item: " << data
		<< " was not found in the list ... " << std::endl;

	// Deallocate memory so that we dont have a memory leak
	//delete prevNodePtr;
	//delete currentNodePtr;

	return false;
}

/**
 * \return <code>true</code> if list is empty
 */
bool List::IsEmpty()
{
	return this->head == nullptr;
}

// Release memory from the CPU.
void List::EmptyList()
{
	node_ptr currentNodePtr;

	while (this->head != nullptr)
	{
		currentNodePtr = this->head;
		this->head = this->head->nextNode;		// Head points to next node
		delete currentNodePtr;					// afterwards, delete current node
	}
	this->sz = 0;		// set Length to zero.
}


size_t List::Size() const
{
	return this->sz;
}


/**
 * \brief Traverse the current list and print out all the data stored in the nodes.
 */
void List::Traverse() const
{
	node_ptr currentNodePtr = this->head;
	while (currentNodePtr != nullptr)
	{
		std::cout << currentNodePtr->data << " --> ";
		currentNodePtr = currentNodePtr->nextNode;
	}
	std::cout << " Finished iterating linked list --- " << std::endl;
	// clean-up 
	// delete currentNodePtr;
}


List::~List()
{
	std::cout << "Destroying linked list ... " << std::endl;
	this->EmptyList();
}
