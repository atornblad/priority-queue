# priority-queue
Min-heap-based implementation of Priority Queue for NodeJS and browsers

# Installation

For node.js:

```
npm install --save @atornblad/priority-queue
```

# Example Usage

```
const PriorityQueue = require('@atornblad/priority-queue');

const INITIAL_CAPACITY = 15;
let pq = new PriorityQueue(INITIAL_CAPACITY);

pq.insert(5);
pq.insert(3);
pq.insert(8);
pq.insert(4);
pq.insert(6);
pq.insert(1);
pq.insert(2);
pq.insert(7);

while (!pq_is_empty()) {
    console.log(pq.poll());
}
```

# Documentation

## Class: PriorityQueue

### Constructor

```
new PriorityQueue(capacity, compare_func)
```

Creates a new Priority Queue

**Parameters:**

* `capacity:number` : *The initial capacity of the queue, must be 2<sup>n</sup>-1, for example 7, 15, 31, ...*
* `compare_func` : *An optional comparison callback* 

**Properties:**

* `allow_grow:boolean` : *When set to true, allows the queue to grow when needed*

### Methods

```
get_size():number
```

Returns the current number of elements in the queue.

```
insert(element:*)
```

Inserts one new element into the queue.

```
is_empty():boolean
```

Returns true if the queue is empty, otherwise false.

```
peek():*
```

Returns the element with the highest priority in the queue.

```
poll():*
```

Removes the element with the highest priority from the queue and returns it.

