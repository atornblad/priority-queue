"use strict";

const default_compare_func = (a, b) => a < b ? -1 : a > b ? 1 : 0;

class PriorityQueue {
  constructor(max_capacity, compare_func) {
    // max_capacity must be a power of 2 minus 1
    if ((max_capacity & max_capacity + 1) !== 0) {
      throw `Illegal argument for max_capacity: ${max_capacity} is not (2^n)-1`;
    }
    this.storage = Array(max_capacity + 1);
    this.capacity = max_capacity;
    this.size = 0;
    this.compare_func = compare_func || default_compare_func;
    this.allow_grow = false;
  }

  is_empty() {
    return this.size === 0;
  }

  insert(element) {
    if (this.size === this.capacity) {
      if (this.allow_grow) {
        /*
        this.capacity = this.capacity * 2 + 1;
        let new_storage = Array(this.capacity + 1);
        this.storage.forEach((element, index) => { new_storage[index] = element });
        this.storage.length = 0;
        this.storage = new_storage;
        */
        this.storage = this.storage.concat(this.storage);
        this.capacity = this.storage.length - 1;
      } else {
        throw `Priority Queue full - max_capacity: ${this.capacity}`;
      }
    }
    // 1. Add the element to the bottom level of the heap
    let currentIndex = ++this.size;
    this.storage[currentIndex] = element;

    // 2. Loop:
    // 2.1 If the current element is at root, stop!
    // 2.2 Compare the current element with its parent
    // 2.3 If they are in correct order, stop!
    // 2.4 Swap the current element with its parent and track the current element upward
    let parentIndex = currentIndex >> 1;
    while (currentIndex > 1 && this.compare_func(element, this.storage[parentIndex]) < 0) {
      this.storage[currentIndex] = this.storage[parentIndex];
      currentIndex = parentIndex;
      this.storage[currentIndex] = element;
      parentIndex = currentIndex >> 1;
    }
  }

  swap(one, other) {
    let temp = this.storage[one];
    this.storage[one] = this.storage[other];
    this.storage[other] = temp;
  }

  poll() {
    if (this.size === 0) return undefined;
    let result = this.storage[1];

    // 1. Replace the root of the heap with the last element on the last level
    this.storage[1] = this.storage[this.size--];

    // 2. Loop:
    // 2.1 Compare the new root with its children; if they are in the correct order, stop.
    // 2.2 Swap the element with one of its children and return to the previous step.
    //     Min-heap: Swap with the smaller child
    let currentIndex = 1;
    while (currentIndex <= this.size) {
      let leftChildIndex = currentIndex * 2;
      if (leftChildIndex > this.size) break;

      let rightChildIndex = leftChildIndex + 1;
      if (rightChildIndex > this.size) {
        // There is only one child - only compare with that one!
        // If the elements are in wrong order, swap them!
        if (this.compare_func(this.storage[currentIndex], this.storage[leftChildIndex]) > 0) {
          this.swap(currentIndex, leftChildIndex);
        }
        // Safely break here, because this is definitely the last level!
        break;
      }

      // Find the smallest element of the two children
      let compareIndex = this.compare_func(this.storage[leftChildIndex], this.storage[rightChildIndex]) < 0 ? leftChildIndex : rightChildIndex;
      // Compare the current element with the smallest of its children
      if (this.compare_func(this.storage[currentIndex], this.storage[compareIndex]) < 0) {
        // Correct order - break!
        break;
      }
      this.swap(currentIndex, compareIndex);
      currentIndex = compareIndex;
    }

    return result;
  }

  peek() {
    if (this.size >= 1) {
      return this.storage[1];
    }
  }

  get_size() {
    return this.size;
  }
}

module.exports = PriorityQueue;