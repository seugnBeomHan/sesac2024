import assert from 'assert/strict';

class Queue {
    #queue;
    #length;
    #front;

    constructor(...args) {
        this.#queue = [];
        this.#length = 0;
        this.#front = 0;

        if (args.length !== 0) this.enqueue(...args);
    }

    get length() {
        return this.#length - this.#front;
    }

    enqueue(...values) {
        if (values.length === 0) return;
        this.#length = this.#queue.push(...values);
        return this.length;
    }

    dequeue() {
        if (this.isEmpty()) return;
        if (this.#isReset()) this.#reset();
        return this.#queue[this.#front++];
    }

    isEmpty() {
        return this.#length === 0 || this.#length === this.#front;
    }

    // 버려진 공간을 정리
    #reset() {
        this.#queue = this.#queue.slice(this.#front, this.#length);
        this.#length = this.length;
        this.#front = 0;
    }

    #isReset() {
        const ABANDONED_COUNT = 4; // 테스트 용도로 4개
        return this.#front === ABANDONED_COUNT;
    }
}
const queue = new Queue();
assert.deepStrictEqual(queue.isEmpty(), true);

queue.enqueue(3);
assert.deepStrictEqual(queue.enqueue(1, 2, 3, 4, 5), 6);

assert.deepStrictEqual(queue.length, 6);
assert.deepStrictEqual(queue.dequeue(), 3);
assert.deepStrictEqual(queue.length, 5);
assert.deepStrictEqual(queue.dequeue(), 1);
assert.deepStrictEqual(queue.dequeue(), 2);
assert.deepStrictEqual(queue.length, 3);
assert.deepStrictEqual(queue.dequeue(), 3);
assert.deepStrictEqual(queue.dequeue(), 4);
assert.deepStrictEqual(queue.dequeue(), 5);
assert.deepStrictEqual(queue.length, 0);
assert.deepStrictEqual(queue.isEmpty(), true);
assert.deepStrictEqual(queue.enqueue(10, 20, 30, 40, 50), 5);
assert.deepStrictEqual(queue.isEmpty(), false);
assert.deepStrictEqual(queue.dequeue(), 10);
assert.deepStrictEqual(queue.length, 4);

const queueReset = new Queue(1, 2, 3, 4, 5, 6, 7);
assert.deepStrictEqual(queueReset.isEmpty(), false);
assert.deepStrictEqual(queueReset.length, 7);
assert.deepStrictEqual(queueReset.dequeue(), 1);
assert.deepStrictEqual(queueReset.isEmpty(), false);
assert.deepStrictEqual(queueReset.length, 6);
assert.deepStrictEqual(queueReset.dequeue(), 2);
assert.deepStrictEqual(queueReset.isEmpty(), false);
assert.deepStrictEqual(queueReset.length, 5);
assert.deepStrictEqual(queueReset.dequeue(), 3);
assert.deepStrictEqual(queueReset.isEmpty(), false);
assert.deepStrictEqual(queueReset.length, 4);
assert.deepStrictEqual(queueReset.dequeue(), 4);
assert.deepStrictEqual(queueReset.length, 3);
assert.deepStrictEqual(queueReset.dequeue(), 5);
assert.deepStrictEqual(queueReset.length, 2);
assert.deepStrictEqual(queueReset.dequeue(), 6);
assert.deepStrictEqual(queueReset.length, 1);
assert.deepStrictEqual(queueReset.dequeue(), 7);
assert.deepStrictEqual(queueReset.length, 0);
assert.deepStrictEqual(queueReset.dequeue(), undefined);
assert.deepStrictEqual(queueReset.length, 0);