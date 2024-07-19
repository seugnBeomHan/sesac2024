import assert from 'assert/strict';
import { Collection } from './ex12.js';
class Queue extends Collection {
    constructor(...values) {
        super(...values);
    }
    enqueue(...values) {
        this.array.push(...values);
        return this;
    }
    dequeue() {
        return this.array.shift();
    }
    peek() {
        return this.array[0];
    }
    print() {
        console.log(this.toString());
    }
    [Symbol.iterator]() {
        const array = this.array;
        let index = 0;
        return {
            next() {
                return {
                    value: array[index++],
                    done: index > array.length
                };
            }
        };
    }
}
const queue = new Queue();
assert.deepStrictEqual(queue.isEmpty(), true);
queue.enqueue(3);
assert.deepStrictEqual(queue.enqueue(1, 2, 3, 4, 5), queue);
assert.deepStrictEqual(queue.size(), 6);
assert.deepStrictEqual(queue.dequeue(), 3);
assert.deepStrictEqual(queue.size(), 5);
assert.deepStrictEqual(queue.dequeue(), 1);
assert.deepStrictEqual(queue.dequeue(), 2);
assert.deepStrictEqual(queue.size(), 3);
assert.deepStrictEqual(queue.dequeue(), 3);
assert.deepStrictEqual(queue.dequeue(), 4);
assert.deepStrictEqual(queue.dequeue(), 5);
assert.deepStrictEqual(queue.size(), 0);
assert.deepStrictEqual(queue.isEmpty(), true);
assert.deepStrictEqual(queue.enqueue(10, 20, 30, 40, 50), queue);
assert.deepStrictEqual(queue.size(), 5);
assert.deepStrictEqual(queue.isEmpty(), false);
assert.deepStrictEqual(queue.dequeue(), 10);
assert.deepStrictEqual(queue.size(), 4);
assert.deepStrictEqual(queue.peek(), 20);
queue.enqueue(60, 70, 80, 90, 100);
queue.print();
assert.deepStrictEqual(queue.toArray(), [20, 30, 40, 50, 60, 70, 80, 90, 100]);
assert.deepStrictEqual(queue.toArray().reduce((acc, cur) => acc += cur), 540);
queue.clear();
assert.deepStrictEqual(queue.peek(), undefined);
assert.deepStrictEqual(queue.dequeue(), undefined);
const queueReset = new Queue(1, 2, 3, 4, 5, 6, 7);
assert.deepStrictEqual(queueReset.isEmpty(), false);
assert.deepStrictEqual(queueReset.size(), 7);
assert.deepStrictEqual(queueReset.dequeue(), 1);
assert.deepStrictEqual(queueReset.isEmpty(), false);
assert.deepStrictEqual(queueReset.size(), 6);
assert.deepStrictEqual(queueReset.dequeue(), 2);
assert.deepStrictEqual(queueReset.isEmpty(), false);
assert.deepStrictEqual(queueReset.size(), 5);
assert.deepStrictEqual(queueReset.dequeue(), 3);
assert.deepStrictEqual(queueReset.isEmpty(), false);
assert.deepStrictEqual(queueReset.size(), 4);
assert.deepStrictEqual(queueReset.dequeue(), 4);
assert.deepStrictEqual(queueReset.size(), 3);
assert.deepStrictEqual(queueReset.dequeue(), 5);
assert.deepStrictEqual(queueReset.size(), 2);
assert.deepStrictEqual(queueReset.dequeue(), 6);
assert.deepStrictEqual(queueReset.size(), 1);
assert.deepStrictEqual(queueReset.dequeue(), 7);
assert.deepStrictEqual(queueReset.size(), 0);
assert.deepStrictEqual(queueReset.dequeue(), undefined);
assert.deepStrictEqual(queueReset.size(), 0);
const iterQueue = new Queue(1, 2, 3, 4, 5, 6, 7);
const iter = iterQueue.iterator();
assert.deepStrictEqual(iter.next().value, 1);
assert.deepStrictEqual(iter.next().value, 2);
assert.deepStrictEqual(iter.next().value, 3);
assert.deepStrictEqual(iter.next().done, false);
assert.deepStrictEqual(iter.next().done, false);
assert.deepStrictEqual(iter.next().value, 6);
assert.deepStrictEqual(iter.next().done, false);
assert.deepStrictEqual(iter.next().done, true);
const iterQueue2 = new Queue();
const iter2 = iterQueue2.iterator();
assert.deepStrictEqual(iter2.next().done, true);
assert.deepStrictEqual(iter2.next().value, undefined);
