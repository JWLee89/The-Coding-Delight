#include <iostream>
#include "TestExtern.h"

// I am going to add it here to prove that other files can access BUFFER_SIZE
extern const int BUFFER_SIZE;

int main()
{
	  TestExtern test_extern;						        // Constructor should print out 512, which is the buffer size.
	  std::cout << BUFFER_SIZE << std::endl;		// From TestExtern.cpp 
   
    return 0;
}                                 // Destructor should be called after the main method finishes executing. Print out 512 again.
