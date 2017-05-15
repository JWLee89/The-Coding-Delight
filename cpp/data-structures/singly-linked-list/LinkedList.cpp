// LinkedList.cpp : Defines the entry point for the console application.
//

#include "stdafx.h"
#include "List.h"
#include <iostream>

// Check for memory leaks
#define _CRTDBG_MAP_ALLOC
#include <crtdbg.h>

int main()
{
	List listOfints;
	listOfints.Add(10);
	listOfints.Add(20);
	listOfints.Add(30);

	listOfints.Traverse();

	listOfints.Remove(20);

	listOfints.Traverse();

	List newList = listOfints;
	newList.Add(1337);

	newList.Traverse(); 

	// Memory leak dump check
	_CrtDumpMemoryLeaks();

    return 0;
}

