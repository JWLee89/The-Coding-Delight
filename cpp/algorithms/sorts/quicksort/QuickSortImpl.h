#pragma once
#include <vector>

class QuickSortImpl
{
private:
	static void SortEfficientImpl(
		std::vector<int> &list, int lowIndex, int highIndex
	);
	static int PartitionList(std::vector<int> &list, int lowIndex,
		int highIndex);

public:
	static std::vector<int> Sort(std::vector<int> list);
	static void SortEfficient(std::vector<int>& list);
	QuickSortImpl();
	~QuickSortImpl();
};
