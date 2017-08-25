#pragma once
/**
 * \brief 
 * \tparam T 
 */
template <class T> class LinkedListQueue
{
	/**
	 * \brief Node of the underlying linked list
	 */
	typedef struct Node
	{
		T data;
		Node* next;

	} *nodePtr;

private: 
	nodePtr head;
	nodePtr tail;
	int size;
	
	/**
	 * Private methods
	 * ==================
	 */
	nodePtr CreateNode(T data);

	/**
	 * Clean up dynamically allocated resources
	 */
	void EmptyQueue();

public:
	LinkedListQueue();
	~LinkedListQueue();
	void Enqueue(const T data);
	T Dequeue();
	int Size() const;
	bool IsEmpty() const;
	void Print() const;
};
