export default class Node {
  #data;
  #left;
  #right;

  constructor(data, left = null, right = null) {
    this.#data = data;
    this.#left = left;
    this.#right = right;
  }

  get data() {
    return this.#data;
  }
  get left() {
    return this.#left;
  }
  get right() {
    return this.#right;
  }
  set data(data) {
    this.#data = data;
  }
  set left(left) {
    this.#left = left;
  }
  set right(right) {
    this.#right = right;
  }
}
