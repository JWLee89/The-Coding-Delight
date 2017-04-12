#pragma once
#include <iostream>
// Just added for demonstration purpose. 
extern const int BUFFER_SIZE;

class TestExtern
{
public:
	TestExtern();	
	~TestExtern()	// Don't write destructor implementations in the header file like this. For demonstration purposes only.
	{
		// Can also access BUFFER_SIZE in header file. Nice!
		std::cout << "Destructor called. Buffer size: " << BUFFER_SIZE << std::endl;
	}
};
