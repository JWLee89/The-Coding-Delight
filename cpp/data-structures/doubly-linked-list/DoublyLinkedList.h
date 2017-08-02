#pragma once
template <class T>
class DoublyLinkedList
{

private:

	int size; 

	typedef struct Node
	{
		T data; 
		Node* next;
		Node* prev; 
	} * nodePtr;

	nodePtr head; 
	nodePtr tail;

	nodePtr CreateNode(T data);
	nodePtr GetNodeAt(int index);
	void EmptyList();
	void RemoveNode(nodePtr nodeToDelete);

public:
	DoublyLinkedList();
	~DoublyLinkedList();
	void InsertAtBack(T data);
	void DeleteAt(int index);
	void Delete(T data);
	void Print() const;
};
