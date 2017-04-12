#include "stdafx.h"
#include "TestExtern.h"
#include <iostream>
#include <string>

// extern variable so that main method can also access it.
extern const int BUFFER_SIZE = 512;

TestExtern::TestExtern()
{
	std::cout << "Buffer size from header is: " << BUFFER_SIZE << std::endl;
}
