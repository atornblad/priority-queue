"use strict";

/**
 * @file Contains the definition for the @atornblad/priority-queue npm module
 * @author Anders Tornblad
 * @version 1.0.4
 */

const default_compare_func = (a, b) => a < b ? -1 : a > b ? 1 : 0;
const DEFAULT_CAPACITY = 127;

function swap(one, other) {
  let temp = this.storage[one];
  this.storage[one] = this.storage[other];
  this.storage[other] = temp;
}

/**
 * Min-heap based Priority Queue implementation
 * 
 * @property {boolean} allow_grow - When set to true, allows the priority queue's capacity to grow when needed. Default set to false.
 */
class PriorityQueue {
  /**
   * This is a standard comparison callback, that should return negative if left is smaller than right, positive if left is larger than right, or zero if left and right are equal.
   * 
   * @callback comparisonFunc
   * @param {*} left
   * @param {*} right
   */

  /**
   * Creates a new Priority Queue
   * 
   * @param {number} [capacity=127] - The initial capacity of the queue, would preferably be (2^n)-1, for example 7, 15, 31..., but is not required
   * @param {comparisonFunc} [compare_func] - An optional comparison callback
   */
  constructor(capacity, compare_func) {
    capacity = capacity || DEFAULT_CAPACITY;

    if (capacity < 1) {
      throw `Illegal argument for capacity: ${capacity}`;
    }

    this.storage = Array(capacity + 1);
    this.capacity = capacity;
    this.size = 0;
    this.compare_func = compare_func || default_compare_func;
    this.allow_grow = true;
  }

  /**
   * Returns true if the Priority Queue is empty
   * 
   * @returns {boolean} True if the queue is empty, otherwise false
   */
  is_empty() {
    return this.size === 0;
  }

  /**
   * Inserts one new element into the queue.
   * 
   * @param {*} element - The element to insert
   * @throws If the queue has a fixed capacity (the allow_grow property is false) and the queue is full, throws an error!
   */
  insert(element) {
    if (this.size === this.capacity) {
      if (this.allow_grow) {
        this.storage = this.storage.concat(this.storage);
        this.capacity = this.storage.length - 1;
      } else {
        throw `Priority Queue full - capacity: ${this.capacity}`;
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

  /**
   * Removes the element with the highest priority from the queue and returns it
   * 
   * @returns {*} The next element in the queue, or undefined if the queue is empty
   */
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
          swap.call(this, currentIndex, leftChildIndex);
        }
        // Safely break here, because this is definitely the last level!
        break;
      }

      // Find the smallest element of the two children
      let compareIndex = this.compare_func(this.storage[leftChildIndex], this.storage[rightChildIndex]) < 0 ? leftChildIndex : rightChildIndex;
      // Compare the current element with the smallest of its children
      if (this.compare_func(this.storage[currentIndex], this.storage[compareIndex]) <= 0) {
        // Correct order - break!
        break;
      }
      swap.call(this, currentIndex, compareIndex);
      currentIndex = compareIndex;
    }

    return result;
  }

  /**
   * Returns the element with the highest priority in the queue
   * 
   * @returns {*} The next element in the queue, or undefined if the queue is empty
   */
  peek() {
    if (this.size >= 1) {
      return this.storage[1];
    }
  }

  /**
   * Returns the current number of elements in the queue
   * 
   * @returns {number} The number of elements in the queue
   */
  get_size() {
    return this.size;
  }
}

module.exports = PriorityQueue;