#include "stdafx.h"
#include "Sort.h"


int main()
{
	std::vector<int> list = { 1,4,7,23,5,26,2,13,4,12,53,23,53,8,19,16,34 };

	std::cout << "before sort --------------" << std::endl;

	for(std::vector<int>::iterator it = list.begin(); it != list.end(); it++)
	{
		std::cout << *it << std::endl;
	}

	std::cout << "------------------------------ " << std::endl;

	Sort::MergeSort(list);

	std::cout << "after sort --------------" << std::endl;

	for (std::vector<int>::iterator it = list.begin(); it != list.end(); it++)
	{
		std::cout << *it << std::endl;
	}

	std::cout << "------------------------------ " << std::endl;

    return 0;
}
