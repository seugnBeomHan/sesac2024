import assert from 'assert/strict';

class Queue {
    #queue;
    #length;
    #front;

    /**
     * reset 진행 기준 되는 버려진 공간 개수 설정
     * 전체 Queue 인스턴스에 공통적으로 사용
     */
    static #ABANDONED_SPACE_COUNT = 4;

    constructor(...args) {
        this.#queue = [];
        this.#length = 0;
        this.#front = 0;

        if (args.length !== 0) this.enqueue(...args);
    }

    enqueue(...values) {
        if (values.length === 0) return;
        this.#length = this.#queue.push(...values);
        return this.getLength();
    }

    dequeue() {
        if (this.isEmpty()) return;
        if (this.#isReset()) this.#reset();
        return this.#queue[this.#front++];
    }

    getLength() {
        return this.#length - this.#front;
    }

    isEmpty() {
        return this.#length === 0 || this.#length === this.#front;
    }

    peek() {
        if (this.isEmpty()) return;
        return this.#queue[this.#front];
    }

    poll() {
        return this.dequeue();
    }

    remove() {
        return this.dequeue();
    }

    toArray() {
        return this.#getCurrentQueue();
    }

    print() {
        console.log(...this.#getCurrentQueue());
    }

    clear() {
        this.#queue = [];
        this.#length = 0;
        this.#front = 0;
    }

    // 버려진 공간 정리
    #reset() {
        this.#queue = this.#queue.slice(this.#front, this.#length);
        this.#length = this.getLength();
        this.#front = 0;
    }

    #isReset() {
        return this.#front === Queue.#ABANDONED_SPACE_COUNT;
    }

    // 현재 유효한 범위의 array 반환
    #getCurrentQueue() {
        return this.#queue.slice(this.#front, this.#length);
    }
}

const queue = new Queue();
assert.deepStrictEqual(queue.isEmpty(), true);

queue.enqueue(3);

assert.deepStrictEqual(queue.enqueue(1, 2, 3, 4, 5), 6);
assert.deepStrictEqual(queue.getLength(), 6);
assert.deepStrictEqual(queue.dequeue(), 3);
assert.deepStrictEqual(queue.getLength(), 5);
assert.deepStrictEqual(queue.dequeue(), 1);
assert.deepStrictEqual(queue.dequeue(), 2);
assert.deepStrictEqual(queue.getLength(), 3);
assert.deepStrictEqual(queue.dequeue(), 3);
assert.deepStrictEqual(queue.dequeue(), 4);
assert.deepStrictEqual(queue.dequeue(), 5);
assert.deepStrictEqual(queue.getLength(), 0);
assert.deepStrictEqual(queue.isEmpty(), true);
assert.deepStrictEqual(queue.enqueue(10, 20, 30, 40, 50), 5);
assert.deepStrictEqual(queue.isEmpty(), false);
assert.deepStrictEqual(queue.dequeue(), 10);
assert.deepStrictEqual(queue.getLength(), 4);
assert.deepStrictEqual(queue.peek(), 20);
assert.deepStrictEqual(queue.poll(), 20);
assert.deepStrictEqual(queue.remove(), 30);
assert.deepStrictEqual(queue.remove(), 40);

queue.enqueue(60, 70, 80, 90, 100);

assert.deepStrictEqual(queue.toArray(), [50, 60, 70, 80, 90, 100]);
assert.deepStrictEqual(queue.toArray().reduce((acc, cur) => acc += cur), 450);

queue.clear();

assert.deepStrictEqual(queue.peek(), undefined);
assert.deepStrictEqual(queue.poll(), undefined);
assert.deepStrictEqual(queue.dequeue(), undefined);

const queueReset = new Queue(1, 2, 3, 4, 5, 6, 7);
assert.deepStrictEqual(queueReset.isEmpty(), false);
assert.deepStrictEqual(queueReset.getLength(), 7);
assert.deepStrictEqual(queueReset.dequeue(), 1);
assert.deepStrictEqual(queueReset.isEmpty(), false);
assert.deepStrictEqual(queueReset.getLength(), 6);
assert.deepStrictEqual(queueReset.dequeue(), 2);
assert.deepStrictEqual(queueReset.isEmpty(), false);
assert.deepStrictEqual(queueReset.getLength(), 5);
assert.deepStrictEqual(queueReset.dequeue(), 3);
assert.deepStrictEqual(queueReset.isEmpty(), false);
assert.deepStrictEqual(queueReset.getLength(), 4);
assert.deepStrictEqual(queueReset.dequeue(), 4);
assert.deepStrictEqual(queueReset.getLength(), 3);
assert.deepStrictEqual(queueReset.dequeue(), 5);
assert.deepStrictEqual(queueReset.getLength(), 2);
assert.deepStrictEqual(queueReset.dequeue(), 6);
assert.deepStrictEqual(queueReset.getLength(), 1);
assert.deepStrictEqual(queueReset.dequeue(), 7);
assert.deepStrictEqual(queueReset.getLength(), 0);
assert.deepStrictEqual(queueReset.dequeue(), undefined);
assert.deepStrictEqual(queueReset.getLength(), 0);