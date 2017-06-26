#include "stdafx.h"
#include <vector>
#include "QuickSortImpl.h"
#include <iostream>


int main()
{
	std::vector<int> list = { 1,45,2,3,82,7,10,9 };
	QuickSortImpl sort;


	std::vector<int> sortedList = sort.Sort(list);

	for (std::vector<int>::iterator it = sortedList.begin(); it != sortedList.end(); ++it)
	{
		std::cout << *it << std::endl;
	}

	// Sorting original list --> More efficient method
	sort.SortEfficient(list);

	std::cout << "--------------- RESULTS --------------------------" << std::endl;

	for (std::vector<int>::iterator it = list.begin(); it != list.end(); ++it)
	{
		std::cout << *it << std::endl;
	}

    return 0;
}

