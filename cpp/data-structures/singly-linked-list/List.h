#pragma once
class List
{
private: 
	// typedef struct to ensure that we don't have to do the following
  // Node *nodePtr = ...
  // Rather we can do the following
  // node_ptr node
	typedef struct Node
	{
		int data;
		Node *nextNode;
	} * node_ptr;

	// The head node for the singly linked list.
	node_ptr head;

	// size_t is an unsigned integer type for those that don't know
	// It is the type when we do the following
	// sizeof(variableName);
	size_t sz;

	void IncrementSize();
	void DecrementSize();

public:
	List();
	// Copy Constructor
	List(const List& rhs);

	// Copy Constructor when called with equals.
	// Challenge to readers to implement this
	// List & operator = (const List& rhs);

	void Add(int data);
	bool Remove(int data);
	bool IsEmpty();

	void EmptyList();

	// size of linked list:
	size_t Size() const;

	void Traverse() const;
	~List();
};
