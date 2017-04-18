var binarySearchTree = BST();

binarySearchTree
    .add(6)
    .add(3)
    .add(5)
    .add(10)
    .add(7)
    .add(15)
    .add(100)
    .add(1);

console.log(binarySearchTree);

binarySearchTree.postOrderTraversal(function(data, node) {
    console.log(data);
});

/*binarySearchTree.remove(2);
binarySearchTree.remove(4);
console.log(binarySearchTree);*/
