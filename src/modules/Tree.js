import Node from "./Node";
import sort from "./MergeSort";

export default class Tree {
  #root;
  #arr;

  constructor(arr) {
    const processedArr = this.#arrProcess(arr);
    this.#arr = processedArr;
    this.#root = this.#buildTree(processedArr);
  }

  get root() {
    return this.#root;
  }

  set root(root) {
    this.#root = root;
  }

  #buildTree(arr) {
    if (arr.length === 0) return null;
    if (arr.length === 1) return new Node(arr[0]);
    const mid = Math.floor(arr.length / 2);
    const root = new Node(
      arr[mid],
      this.#buildTree(arr.slice(0, mid)),
      this.#buildTree(arr.slice(mid + 1)),
    );
    return root;
  }

  prettyPrint(node, prefix = "", isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      this.prettyPrint(
        node.right,
        `${prefix}${isLeft ? "│   " : "    "}`,
        false,
      );
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  }

  #arrProcess(arr) {
    const newArr = sort(arr);
    let p1 = 0;
    let p2 = 1;
    while (p2 < newArr.length) {
      if (newArr[p1] === newArr[p2]) {
        newArr.splice(p1, 1);
      } else {
        p1++;
        p2++;
      }
    }
    return newArr;
  }

  insert(value, root = this.#root) {
    if (root === null) {
      this.#arr.push(value);
      this.#arr = this.#arrProcess(this.#arr);
      return new Node(value);
    }
    if (root.data === value) {
      return root;
    }
    if (value < root.data) root.left = this.insert(value, root.left);
    else root.right = this.insert(value, root.right);
    return root;
  }

  #findSuccessor(node) {
    let current = node;
    while (current.left) {
      current = current.left;
    }
    return current;
  }

  delete(value, root = this.#root) {
    if (root === null) {
      return root;
    }
    if (value < root.data) {
      root.left = this.delete(value, root.left);
    } else if (value > root.data) {
      root.right = this.delete(value, root.right);
    } else {
      // No children
      if (!(root.left || root.right)) {
        return null;
      }
      // Only left child
      if (!root.right) {
        root.data = root.left.data;
        root.left = null;
        return root;
      }
      // Only right child
      if (!root.left) {
        root.data = root.right.data;
        root.right = null;
        return root;
      }
      // Two children
      let successor = this.#findSuccessor(root.right);
      root.data = successor.data;
      root.right = this.delete(successor.data, root.right);
      return root;
    }
    return root;
  }
}
