#include "stdafx.h"
#include "QuickSortImpl.h"
#include <iostream>

std::vector<int> QuickSortImpl::Sort(std::vector<int> list)
{
	int size = list.size();
	if (list.size() <= 1)
	{
		return list;
	}

	// Partition operation
	std::vector<int> leftList;
	std::vector<int> rightList;

	// Set pivot as last element
	int pivot = list.back();

	// Insert pivot as first element of rightList
	rightList.push_back(pivot);

	for (int i = 0; i < size - 1; i++)
	{
		int currentElement = list[i];
		if (currentElement < pivot)
		{
			leftList.push_back(currentElement);
		}
		else
		{
			rightList.push_back(currentElement);
		}
	}

	// partition recursively
	leftList = Sort(leftList);
	rightList = Sort(rightList);

	// Combine the leftList and rightList
	leftList.insert(leftList.end(), rightList.begin(), rightList.end());

	// Return result
	return leftList;
}

void QuickSortImpl::SortEfficient(std::vector<int>& list)
{
	SortEfficientImpl(list, 0, list.size() - 1);
}

QuickSortImpl::QuickSortImpl()
{
}


QuickSortImpl::~QuickSortImpl()
{
}


/**
 * \brief 
 * \param list 
 * \param lowIndex 
 * \param highIndex 
 * \return 
 */
void QuickSortImpl::SortEfficientImpl(std::vector<int> &list, int lowIndex, int highIndex)
{
	if (lowIndex < highIndex)
	{
		int pivotIndex = PartitionList(list, lowIndex, highIndex);
		std::cout << "pivot index: " << pivotIndex << std::endl;

		// Recursively sort left list
		SortEfficientImpl(list, lowIndex, pivotIndex - 1);

		// Sort right list
		SortEfficientImpl(list, pivotIndex + 1, highIndex);
	}
}


/**
 * \brief Partition the list and return the index of the pivot.
 * \param list 
 * \param lowIndex 
 * \param highIndex 
 * \return 
 */
int QuickSortImpl::PartitionList(std::vector<int> &list, int lowIndex, int highIndex)
{
	int pivot = list.back();

	// set wallIndex to zero and currentIndex to 1 to 
	// avoid unnecessary swapping first element with itself.
	int wallIndex = lowIndex - 1;		
	int currentIndex = lowIndex;

	for (; currentIndex < highIndex; currentIndex++)
	{
		int currentItem = list[currentIndex];
		if (currentItem < pivot)
		{
			// Increment wall index
			wallIndex++;

			// Perform swap
			// swap item at wall index with item at current index
			std::iter_swap(list.begin() + currentIndex, list.begin() + wallIndex);
		}
	}

	// Swap pivot with item immediately to the right of the wall
	std::iter_swap(list.begin() + (wallIndex + 1), list.begin() + highIndex);

	return wallIndex + 1;	// Return pivot index
}
