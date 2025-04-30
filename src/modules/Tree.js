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
    // Base case
    if (root === null) return root;
    // Recursive case
    if (value < root.data) root.left = this.delete(value, root.left);
    else if (value > root.data) root.right = this.delete(value, root.right);
    else {
      // No children
      if (!(root.left || root.right)) return null;
      // Only left child
      if (!root.right) return root.left;
      // Only right child
      if (!root.left) return root.right;
      // Two children
      const successor = this.#findSuccessor(root.right);
      root.data = successor.data;
      root.right = this.delete(successor.data, root.right);
      return root;
    }
    return root;
  }

  find(value, root = this.#root) {
    // Base case: if the tree is empty/value does not exist
    if (root === null) return null;
    // Base case: if the value is found
    if (root.data === value) return root;
    return this.find(value, value < root.data ? root.left : root.right);
  }

  levelOrder(callback, q = [this.#root]) {
    // base case
    if (!callback) throw new Error("Callback function is required");
    if (q.length === 0) return;

    // recursive case
    const root = q[0];
    callback(root); // callback on the first element
    q.shift();
    if (root.left) q.push(root.left);
    if (root.right) q.push(root.right);
    this.levelOrder(callback, q);
  }

  // Pre-order traversal: root -> left -> right
  preOrder(callback, root = this.#root) {
    // base case
    if (!callback) throw new Error("Callback function is required");
    if (root === null) return;

    // recursive case
    callback(root);
    this.preOrder(callback, root.left);
    this.preOrder(callback, root.right);
  }

  // In-order traversal: left -> root -> right
  inOrder(callback, root = this.#root) {
    // base case
    if (!callback) throw new Error("Callback function is required");
    if (root === null) return;

    // recursive case
    this.inOrder(callback, root.left);
    callback(root);
    this.inOrder(callback, root.right);
  }

  // Post-order traversal: left -> right -> root
  postOrder(callback, root = this.#root) {
    // base case
    if (!callback) throw new Error("Callback function is required");
    if (root === null) return;

    // recursive case
    this.postOrder(callback, root.left);
    this.postOrder(callback, root.right);
    callback(root);
  }

  height(value, root = this.find(value)) {
    const node = root;
    // base case
    if (!node) return null;
    if (!node.left && !node.right) return 0;

    // recursive case
    if (!node.left) return 1 + this.height(value, node.right);
    if (!node.right) return 1 + this.height(value, node.left);
    return Math.max(
      1 + this.height(value, node.left),
      1 + this.height(value, node.right),
    );
  }

  depth(value, root = this.#root) {
    const node = this.find(value);
    // base case
    // node doesn't exist
    if (!node) return null;
    if (node.data === root.data) return 0;
    // recursive case
    return (
      1 + this.depth(value, node.data < root.data ? root.left : root.right)
    );
  }
}
