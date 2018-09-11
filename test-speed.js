const PriorityQueue = require('./build/priority-queue.js');

for (let capacity = 1; capacity <= 1023; capacity = capacity * 2 + 1) {
    for (let elements = 3; elements <= capacity * 5 + 1000; elements = Math.floor(elements * 1.35)) {
        if (elements <= capacity) {
            console.log(`Runs of ${elements} inserts and polls with fixed capacity of ${capacity}`);
            for (let times = 100; times <= 10000; times *= 10) {
                let pq = new PriorityQueue(capacity);
                let title = `${times} runs of ${elements} inserts and ${elements} polls`;
                console.time(title);
                for (let i = 0; i < times; ++i) {
                    for (let j = 0; j < elements; ++j) {
                        pq.insert(Math.random());
                    }
                    for (let j = 0; j < elements; ++j) {
                        pq.poll();
                    }
                }
                console.timeEnd(title);
            }
        }

        console.log(`Runs of ${elements} inserts and polls with initial capacity of ${capacity}`);
        for (let times = 100; times <= 10000; times *= 10) {
            let pq = new PriorityQueue(capacity);
            pq.allow_grow = true;
            let title = `${times} runs of ${elements} inserts and ${elements} polls`;
            console.time(title);
            for (let i = 0; i < times; ++i) {
                for (let j = 0; j < elements; ++j) {
                    pq.insert(Math.random());
                }
                for (let j = 0; j < elements; ++j) {
                    pq.poll();
                }
            }
            console.timeEnd(title);
        }
    }
}

console.log();
console.log('Runs of 31 inserts and 31 polls with fixed capacity of 31, custom (but simple) comparison function');

for (let times = 100; times <= 1000000; times *= 10) {
    let pq = new PriorityQueue(31, (a, b) => (b - a));
    let title = `${times} runs of 31 inserts and 31 polls`;
    console.time(title);
    for (let i = 0; i < times; ++i) {
        for (let j = 0; j < 31; ++j) {
            pq.insert(Math.random());
        }
        for (let j = 0; j < 31; ++j) {
            pq.poll();
        }
    }
    console.timeEnd(title);
}