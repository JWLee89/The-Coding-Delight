#pragma once
#include <vector>
#include <ostream>
#include <iostream>

class Sort
{
private: 
	template <typename T>
	static void Merge(std::vector<T>& originalList,
		std::vector<T>& leftList,
		std::vector<T>& rightList);
public:
	Sort();
	template <typename T>
	static void MergeSort(std::vector<T> &list);
	~Sort();
};

template <typename T>
void Sort::MergeSort(std::vector<T>& list)
{
	int size = list.size();
	int middleIndex = ceil(size / 2);
	
	if (size != 1)
	{	
		std::vector<T> leftList;
		std::vector<T> rightList;

		// Copy items into the left and right list
		for (int i = 0; i < middleIndex; i++)
		{
			leftList.push_back(list[i]);
		}

		for (int i = middleIndex; i < size; i++)
		{
			rightList.push_back(list[i]);
		}

		MergeSort(leftList);
		MergeSort(rightList);

		Merge(list, leftList, rightList);
	}
}

// added here to prevent compile time linking error
template <typename T>
void Sort::Merge(std::vector<T>& list, std::vector<T>& leftList, std::vector<T>& rightList)
{
	list.clear();

	while (!leftList.empty() && !rightList.empty())
	{
		T leftListItem = leftList[0];
		T rightListItem = rightList[0];
		if (leftListItem < rightListItem) 
		{
			list.push_back(leftList[0]);
			leftList.erase(leftList.begin());
		}
		else
		{
			list.push_back(rightList[0]);
			rightList.erase(rightList.begin());
		}
	}

	while (!leftList.empty())
	{
		list.push_back(leftList[0]);
		leftList.erase(leftList.begin());
	}

	while (!rightList.empty())
	{
		list.push_back(rightList[0]);
		rightList.erase(rightList.begin());
	}
}
