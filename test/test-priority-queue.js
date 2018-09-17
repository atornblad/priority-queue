const { assert, expect } = require('chai')
const PriorityQueue = require('../build/priority-queue.js');

describe('Given a new Priority Queue', () => {
    let pq;

    beforeEach((done) => {
        pq = new PriorityQueue(31);
        done();
    });

    describe('When I have done nothing', () => {
        beforeEach((done) => {
            done();
        });

        it('Should have size === 0', (done) => {
            assert.strictEqual(pq.get_size(),  0);
            done();
        });

        it('Should be empty', (done) => {
            assert.strictEqual(pq.is_empty(), true);
            done();
        });

        it('peek() should return undefined', (done) => {
            assert.strictEqual(pq.peek(), undefined);
            done();
        });

        it('poll() should return undefined', (done) => {
            assert.strictEqual(pq.poll(), undefined);
            done();
        });
    });

    describe('When I insert one element', () => {
        beforeEach((done) => {
            pq.insert('foo');
            done();
        });

        it('Should have size === 1', (done) => {
            assert.strictEqual(pq.get_size(),  1);
            done();
        });

        it('Should not be empty', (done) => {
            assert.strictEqual(pq.is_empty(), false);
            done();
        });

        it('peek() should return the inserted element', (done) => {
            assert.strictEqual(pq.peek(), 'foo');
            done();
        });

        it('poll() should return the inserted element', (done) => {
            assert.strictEqual(pq.poll(), 'foo');
            done();
        });
    });
});

describe('Given a Priority Queue with exactly one element', () => {
    let pq;

    beforeEach((done) => {
        pq = new PriorityQueue(15);
        pq.insert('foo');
        done();
    });

    describe('When I insert one element that is larger than the first element', () => {
        beforeEach((done) => {
            pq.insert('larger_than_foo');
            done();
        });

        it('Should have size === 2', (done) => {
            assert.strictEqual(pq.get_size(),  2);
            done();
        });

        it('Should not be empty', (done) => {
            assert.strictEqual(pq.is_empty(), false);
            done();
        });

        it('peek() should return the first element', (done) => {
            assert.strictEqual(pq.peek(), 'foo');
            done();
        });

        it('poll() should return the first element', (done) => {
            assert.strictEqual(pq.poll(), 'foo');
            done();
        });
    });

    describe('When I insert one element that is less than the first element', () => {
        beforeEach((done) => {
            pq.insert('before_foo');
            done();
        });

        it('Should have size === 2', (done) => {
            assert.strictEqual(pq.get_size(),  2);
            done();
        });

        it('Should not be empty', (done) => {
            assert.strictEqual(pq.is_empty(), false);
            done();
        });

        it('peek() should return the newer element', (done) => {
            assert.strictEqual(pq.peek(), 'before_foo');
            done();
        });

        it('poll() should return the newer element', (done) => {
            assert.strictEqual(pq.poll(), 'before_foo');
            done();
        });
    });

    describe('When I poll', () => {
        let result;

        beforeEach((done) => {
            result = pq.poll();
            done();
        });

        it('Should return the first element', (done) => {
            assert.strictEqual(result, 'foo');
            done();
        });

        it('Should have size === 0', (done) => {
            assert.strictEqual(pq.get_size(),  0);
            done();
        });

        it('Should be empty', (done) => {
            assert.strictEqual(pq.is_empty(), true);
            done();
        });

        it('the following peek() should return undefined', (done) => {
            assert.strictEqual(pq.peek(), undefined);
            done();
        });

        it('the following poll() should return undefined', (done) => {
            assert.strictEqual(pq.poll(), undefined);
            done();
        });
    });
});

describe('Given a Priority Queue with exactly two element', () => {
    let pq;

    beforeEach((done) => {
        pq = new PriorityQueue(15);
        pq.insert(100);
        pq.insert(200);
        done();
    });

    describe('When I insert one element that is larger than both elements', () => {
        beforeEach((done) => {
            pq.insert(300);
            done();
        });

        it('Should have size === 3', (done) => {
            assert.strictEqual(pq.get_size(),  3);
            done();
        });

        it('Should not be empty', (done) => {
            assert.strictEqual(pq.is_empty(), false);
            done();
        });

        it('peek() should return the first element', (done) => {
            assert.strictEqual(pq.peek(), 100);
            done();
        });

        it('First poll() should return the first element', (done) => {
            assert.strictEqual(pq.poll(), 100);
            done();
        });

        it('Second poll() should return the second element', (done) => {
            pq.poll();
            assert.strictEqual(pq.poll(), 200);
            done();
        });

        it('Third poll() should return the third element', (done) => {
            pq.poll();
            pq.poll();
            assert.strictEqual(pq.poll(), 300);
            done();
        });
    });

    describe('When I insert one element that is less than both elements', () => {
        beforeEach((done) => {
            pq.insert(50);
            done();
        });

        it('Should have size === 3', (done) => {
            assert.strictEqual(pq.get_size(),  3);
            done();
        });

        it('Should not be empty', (done) => {
            assert.strictEqual(pq.is_empty(), false);
            done();
        });

        it('peek() should return the third element', (done) => {
            assert.strictEqual(pq.peek(), 50);
            done();
        });

        it('First poll() should return the third element', (done) => {
            assert.strictEqual(pq.poll(), 50);
            done();
        });

        it('Second poll() should return the first element', (done) => {
            pq.poll();
            assert.strictEqual(pq.poll(), 100);
            done();
        });

        it('Third poll() should return the second element', (done) => {
            pq.poll();
            pq.poll();
            assert.strictEqual(pq.poll(), 200);
            done();
        });
    });

    describe('When I insert one element that is between both elements', () => {
        beforeEach((done) => {
            pq.insert(150);
            done();
        });

        it('Should have size === 3', (done) => {
            assert.strictEqual(pq.get_size(),  3);
            done();
        });

        it('Should not be empty', (done) => {
            assert.strictEqual(pq.is_empty(), false);
            done();
        });

        it('peek() should return the first element', (done) => {
            assert.strictEqual(pq.peek(), 100);
            done();
        });

        it('First poll() should return the first element', (done) => {
            assert.strictEqual(pq.poll(), 100);
            done();
        });

        it('Second poll() should return the third element', (done) => {
            pq.poll();
            assert.strictEqual(pq.poll(), 150);
            done();
        });

        it('Third poll() should return the second element', (done) => {
            pq.poll();
            pq.poll();
            assert.strictEqual(pq.poll(), 200);
            done();
        });
    });
});

describe('Given a Priority Queue that is not allowed to grow', () => {
    let pq;

    beforeEach((done) => {
        pq = new PriorityQueue(3);
        pq.allow_grow = false;
        pq.insert(1);
        pq.insert(2);
        done();
    });

    describe('When I add one final element', () => {
        beforeEach((done) => {
            pq.insert(3);
            done();
        });

        it('Should function correctly', (done) => {
            assert.strictEqual(pq.get_size(), 3);
            assert.strictEqual(pq.is_empty(), false);
            assert.strictEqual(pq.poll(), 1);
            assert.strictEqual(pq.peek(), 2);
            assert.strictEqual(pq.poll(), 2);
            assert.strictEqual(pq.poll(), 3);
            assert.strictEqual(pq.poll(), undefined);
            assert.strictEqual(pq.get_size(), 0);
            assert.strictEqual(pq.is_empty(), true);
            done();
        });
    });

    describe('When I add one element too many', () => {
        beforeEach((done) => {
            pq.insert(3);
            done();
        });

        it('Should throw an error', (done) => {
            expect(pq.insert.bind(pq, 4)).to.throw('Priority Queue full - capacity: 3');
            done();
        });
    });
});

describe('Given a Priority Queue that is allowed to grow', () => {
    let pq;

    beforeEach((done) => {
        pq = new PriorityQueue(3);
        pq.insert(1);
        pq.insert(2);
        pq.insert(3);
        done();
    });

    describe('When I add one extra element', () => {
        it('Should function correctly', (done) => {
            pq.insert(4);
            assert.strictEqual(pq.get_size(), 4);
            assert.strictEqual(pq.is_empty(), false);
            assert.strictEqual(pq.poll(), 1);
            assert.strictEqual(pq.peek(), 2);
            assert.strictEqual(pq.poll(), 2);
            assert.strictEqual(pq.poll(), 3);
            assert.strictEqual(pq.poll(), 4);
            assert.strictEqual(pq.poll(), undefined);
            assert.strictEqual(pq.get_size(), 0);
            assert.strictEqual(pq.is_empty(), true);
            done();
        });
    });
});

describe('Given a Priority Queue with several elements', () => {
    let pq;

    beforeEach((done) => {
        pq = new PriorityQueue(15);
        pq.insert(10);
        pq.insert(70);
        pq.insert(30);
        pq.insert(20);
        pq.insert(80);
        pq.insert(40);
        pq.insert(50);
        pq.insert(90);
        pq.insert(60);
        done();
    });

    describe('When I pull all elements until empty', () => {
        let result;
        
        beforeEach((done) => {
            result = [];

            while (!pq.is_empty()) {
                result.push(pq.poll());
            }

            done();
        });

        it('Should return elements in correct order', (done) => {
            assert.deepEqual(result, [10, 20, 30, 40, 50, 60, 70, 80, 90]);
            done();
        });
    });
});

describe('Given a Priority Queue with several elements and a custom comparison function', () => {
    let pq;

    beforeEach((done) => {
        pq = new PriorityQueue(15, (a, b) => (b - a));
        pq.insert(10);
        pq.insert(70);
        pq.insert(30);
        pq.insert(20);
        pq.insert(80);
        pq.insert(40);
        pq.insert(50);
        pq.insert(90);
        pq.insert(60);
        done();
    });

    describe('When I pull all elements until empty', () => {
        let result;
        
        beforeEach((done) => {
            result = [];

            while (!pq.is_empty()) {
                result.push(pq.poll());
            }

            done();
        });

        it('Should return elements in correct order, according to the comparison function', (done) => {
            assert.deepEqual(result, [90, 80, 70, 60, 50, 40, 30, 20, 10]);
            done();
        });
    });
});
