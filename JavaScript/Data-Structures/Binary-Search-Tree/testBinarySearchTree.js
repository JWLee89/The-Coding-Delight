
/**
 * Example for removing node with a single child.
 * This is used in the post
 * */

var binarySearchTree = BST();

binarySearchTree
    .add(6)
    .add(3)
    .add(5)
    .add(10)
    .add(7)
    .add(15)
    .add(12)
    .add(11)
    .add(13);

binarySearchTree.remove(15);

console.log("Max: " + binarySearchTree.max());
console.log("Min: " + binarySearchTree.min());

//binarySearchTree.remove(3);

console.log(binarySearchTree);


binarySearchTree.inOrderTraversal(function(data, node) {
    console.log("callback data " + data);
});


/**
 * Example for removing node with two children.
 * This is also used in the post
 * */
var removeTwoChildBst = BST();

removeTwoChildBst
    .add(6)
    .add(3)
    .add(5)
    .add(1)
    .add(10)
    .add(8)
    .add(7)
    .add(12)
    .add(11)
    .add(13);

removeTwoChildBst.remove(10);

console.log(removeTwoChildBst);
