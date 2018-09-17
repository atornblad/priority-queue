[![Build Status](https://travis-ci.org/lbrtw/priority-queue.svg?branch=master)](https://travis-ci.org/lbrtw/priority-queue)

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

let pq = new PriorityQueue();

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

* `capacity:number` : *The initial capacity of the queue, default is 127*
* `compare_func` : *An optional comparison callback* 

**Properties:**

* `allow_grow:boolean` : *Initially set to true. When set to false, forbids the queue from growing when needed*

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

# Version history

## v1.0.0

* Initial commit - a fully working JavaScript implementation of Priority Queue

## v1.0.1

* Some cleanup done
* Added JsDoc comments and output

## v1.0.2

* Small performance enhancement
* Added unit tests to cover allow_grow behavior
* Updated README.md with an example of allow_grow

## v1.0.3

* Removed requirement that initial capacity must be 2^n-1

## v1.0.4

* Changed default value of allow_grow to true
