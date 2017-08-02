#include "stdafx.h"
#include "App.h"
#include <ostream>
#include <iostream>
#include "DoublyLinkedList.h"

int main()
{
	DoublyLinkedList<int> dll;
	dll.InsertAtBack(1);
	dll.InsertAtBack(2);
	dll.InsertAtBack(3);
	dll.DeleteAt(3);
	dll.DeleteAt(1);
	dll.DeleteAt(0);
	dll.Print();
}
