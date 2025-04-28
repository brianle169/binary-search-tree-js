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
