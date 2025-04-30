import Tree from "./modules/Tree";

const arr = [
  23, 87, 5, 64, 12, 90, 38, 77, 41, 12, 6, 58, 99, 77, 71, 29, 15, 84, 2, 56,
  19, 73,
];
const tree = new Tree(arr);
tree.prettyPrint(tree.root);

console.log("========Delete 56=============");
tree.delete(56);
tree.prettyPrint(tree.root);
console.log("========Delete 64=============");
tree.delete(64);
tree.prettyPrint(tree.root);
console.log("========Delete 87=============");
tree.delete(87);
tree.prettyPrint(tree.root);
console.log("========Delete 7=============");
tree.delete(7);
tree.prettyPrint(tree.root);

console.log("========BFS - Level Order=============");
try {
  tree.levelOrder((node) => {
    console.log(node.data);
  });
} catch (error) {
  console.error("Error:", error.message);
}

console.log("========DFS - Pre Order=============");
try {
  tree.preOrder((node) => {
    console.log(node.data);
  });
} catch (error) {
  console.error("Error:", error.message);
}

console.log("========DFS - In Order=============");
try {
  tree.inOrder((node) => {
    console.log(node.data);
  });
} catch (error) {
  console.error("Error:", error.message);
}

console.log("========DFS - Post Order=============");
try {
  tree.postOrder((node) => {
    console.log(node.data);
  });
} catch (error) {
  console.error("Error:", error.message);
}
