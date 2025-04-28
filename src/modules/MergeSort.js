function merge(left, right) {
  const merged = [];
  const leftLength = left.length;
  const rightLength = right.length;
  let i = 0;
  let j = 0;
  while (i < leftLength && j < rightLength) {
    if (left[i] < right[j]) merged.push(left[i++]);
    else merged.push(right[j++]);
  }
  for (; i < leftLength; i++) {
    merged.push(left[i]);
  }
  for (; j < rightLength; j++) {
    merged.push(right[j]);
  }
  return merged;
}

export default function sort(arr) {
  // base case
  if (arr.length === 1) return arr;
  // recursive case
  const mid = Math.floor(arr.length / 2);
  const left = arr.slice(0, mid);
  const right = arr.slice(mid);
  const sortedLeft = sort(left);
  const sortedRight = sort(right);
  return merge(sortedLeft, sortedRight);
}
