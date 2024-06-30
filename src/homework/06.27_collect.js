import assert from 'assert/strict';

class Collection {
    #array;

    constructor() {
        if (this.#getConstructor() === 'Collection') {
            throw new ReferenceError('Collection type objects cannot be created');
        }

        this.#array = [];
    }

    get _array() {
        return this.#array;
    }

    set _array(array) {
        throw new ReferenceError('The property is inaccessible');
    }

    get _length() {
        return this.#array.length;
    }

    set _length(value) {
        throw new ReferenceError('The property is inaccessible');
    }

    get isEmpty() {
        return this.#array.length === 0;
    }

    get peek() {
        return this.peek;
    }

    get poll() {
        return this.remove();
    }

    remove() {
        switch (this.#getConstructor()) {
            case 'Stack':
                return this.pop();
            case 'Queue':
                return this.dequeue();
            default:
                throw new ReferenceError('This is a non-callable object type');
        }
    }

    toArray() {
        return [...this.#array];
    }

    print() {
        console.log(...this.#array);
    }

    clear() {
        this.#array = [];
    }

    iterator() {
        return this[Symbol.iterator]();
    }

    #getConstructor() {
        return this.constructor.name;
    }
}

class Stack extends Collection {
    constructor(...args) {
        super();
        if (args.length !== 0) this.push(...args);
    }

    push(...values) {
        if (values.length === 0) return;
        return this._array.push(...values);
    }

    pop() {
        if (this.isEmpty) return;
        return this._array.pop();
    }

    get peek() {
        if (this.isEmpty) return;
        return this._array[this._length - 1];
    }

    [Symbol.iterator]() {
        let index = this._length - 1;
        const currentStack = this.toArray();
        return {
            next: () => {
                return {
                    value: currentStack[index--],
                    done: index < -1
                }
            }
        }
    }
}

class Queue extends Collection {
    constructor(...args) {
        super();
        if (args.length !== 0) this.enqueue(...args);
    }

    enqueue(...values) {
        if (values.length === 0) return;
        return this._array.push(...values);
    }

    dequeue() {
        if (this.isEmpty) return;
        return this._array.shift();
    }

    get peek() {
        if (this.isEmpty) return;
        return this._array[0];
    }

    [Symbol.iterator]() {
        let index = 0;
        const currentQueue = this.toArray();
        return {
            next: () => {
                return {
                    value: currentQueue[index++],
                    done: index > this._length
                }
            }
        }
    }
}

const stack = new Stack();
const stack1 = new Stack(1, 2, 3, 4, 5);
const stack2 = new Stack([1, 2], [3, 4, 5]);
assert.deepStrictEqual(stack.toArray(), []);
assert.deepStrictEqual(stack1.toArray(), [1, 2, 3, 4, 5]);
assert.deepStrictEqual(stack2.toArray(), [[1, 2,], [3, 4, 5]]);

stack.push();
stack.push(3);
stack1.push();
stack1.push(3);
stack2.push();
stack2.push(3);

assert.deepStrictEqual(stack._length, 1);
assert.deepStrictEqual(stack.isEmpty, false);
assert.deepStrictEqual(stack1._length, 6);
assert.deepStrictEqual(stack1.isEmpty, false);
assert.deepStrictEqual(stack2._length, 3);
assert.deepStrictEqual(stack2.isEmpty, false);
assert.deepStrictEqual(stack.push(1, 2, 5, 6, 7), 6);
assert.deepStrictEqual(stack._length, 6);
assert.deepStrictEqual(stack.isEmpty, false);
assert.deepStrictEqual(stack1.push(10, 20), 8);
assert.deepStrictEqual(stack1._length, 8);
assert.deepStrictEqual(stack1.isEmpty, false);
assert.deepStrictEqual(stack2.push([10, 20]), 4);
assert.deepStrictEqual(stack2._length, 4);
assert.deepStrictEqual(stack2.isEmpty, false);
assert.deepStrictEqual(stack.pop(), 7);
assert.deepStrictEqual(stack._length, 5);
assert.deepStrictEqual(stack1.pop(), 20);
assert.deepStrictEqual(stack1._length, 7);
assert.deepStrictEqual(stack2.pop(), [10, 20]);
assert.deepStrictEqual(stack2._length, 3);
assert.deepStrictEqual(stack.toArray().reduce((acc, cur) => acc += cur), 17);
assert.deepStrictEqual(stack.peek, 6);
assert.deepStrictEqual(stack1.toArray().reduce((acc, cur) => acc += cur), 28);
assert.deepStrictEqual(stack1.peek, 10);
assert.deepStrictEqual(stack2.peek, 3);

stack.clear();
stack1.clear();
stack2.clear();

assert.deepStrictEqual(stack.isEmpty, true);
assert.deepStrictEqual(stack.poll, undefined);
assert.deepStrictEqual(stack1.isEmpty, true);
assert.deepStrictEqual(stack1.poll, undefined);
assert.deepStrictEqual(stack2.isEmpty, true);
assert.deepStrictEqual(stack2.poll, undefined);

assert.deepStrictEqual(stack.isEmpty, true);
assert.deepStrictEqual(stack.pop(), undefined);
assert.deepStrictEqual(stack1.isEmpty, true);
assert.deepStrictEqual(stack1.pop(), undefined);
assert.deepStrictEqual(stack2.isEmpty, true);
assert.deepStrictEqual(stack2.pop(), undefined);

assert.deepStrictEqual(stack.isEmpty, true);
assert.deepStrictEqual(stack.remove(), undefined);
assert.deepStrictEqual(stack1.isEmpty, true);
assert.deepStrictEqual(stack1.remove(), undefined);
assert.deepStrictEqual(stack2.isEmpty, true);
assert.deepStrictEqual(stack2.remove(), undefined);

assert.deepStrictEqual(stack.isEmpty, true);
assert.deepStrictEqual(stack.peek, undefined);
assert.deepStrictEqual(stack1.isEmpty, true);
assert.deepStrictEqual(stack1.peek, undefined);
assert.deepStrictEqual(stack2.isEmpty, true);
assert.deepStrictEqual(stack2.peek, undefined);

const iterStack = new Stack(1, 2, 3, 4, 5, 6, 7);
const iterObj1 = iterStack.iterator();

assert.deepStrictEqual(iterObj1.next().value, 7);
assert.deepStrictEqual(iterObj1.next().value, 6);
assert.deepStrictEqual(iterObj1.next().value, 5);
assert.deepStrictEqual(iterObj1.next().done, false);
assert.deepStrictEqual(iterObj1.next().done, false);
assert.deepStrictEqual(iterObj1.next().value, 2);
assert.deepStrictEqual(iterObj1.next().done, false);
assert.deepStrictEqual(iterObj1.next().done, true);

const iterStack2 = new Stack();
const iterObj2 = iterStack2.iterator();

assert.deepStrictEqual(iterObj2.next().value, undefined);
assert.deepStrictEqual(iterObj2.next().done, true);

const queue = new Queue();
assert.deepStrictEqual(queue.isEmpty, true);

queue.enqueue(3);
assert.deepStrictEqual(queue.enqueue(1, 2, 3, 4, 5), 6);

assert.deepStrictEqual(queue._length, 6);
assert.deepStrictEqual(queue.dequeue(), 3);
assert.deepStrictEqual(queue._length, 5);
assert.deepStrictEqual(queue.dequeue(), 1);
assert.deepStrictEqual(queue.dequeue(), 2);
assert.deepStrictEqual(queue._length, 3);
assert.deepStrictEqual(queue.dequeue(), 3);
assert.deepStrictEqual(queue.dequeue(), 4);
assert.deepStrictEqual(queue.dequeue(), 5);
assert.deepStrictEqual(queue._length, 0);
assert.deepStrictEqual(queue.isEmpty, true);
assert.deepStrictEqual(queue.enqueue(10, 20, 30, 40, 50), 5);
assert.deepStrictEqual(queue.isEmpty, false);
assert.deepStrictEqual(queue.dequeue(), 10);
assert.deepStrictEqual(queue._length, 4);
assert.deepStrictEqual(queue.peek, 20);
assert.deepStrictEqual(queue.poll, 20);
assert.deepStrictEqual(queue.remove(), 30);
assert.deepStrictEqual(queue.remove(), 40);

queue.enqueue(60, 70, 80, 90, 100);

assert.deepStrictEqual(queue.toArray(), [50, 60, 70, 80, 90, 100]);
assert.deepStrictEqual(queue.toArray().reduce((acc, cur) => acc += cur), 450);

queue.clear();

assert.deepStrictEqual(queue.peek, undefined);
assert.deepStrictEqual(queue.poll, undefined);
assert.deepStrictEqual(queue.dequeue(), undefined);

const queueReset = new Queue(1, 2, 3, 4, 5, 6, 7);
assert.deepStrictEqual(queueReset.isEmpty, false);
assert.deepStrictEqual(queueReset._length, 7);
assert.deepStrictEqual(queueReset.dequeue(), 1);
assert.deepStrictEqual(queueReset.isEmpty, false);
assert.deepStrictEqual(queueReset._length, 6);
assert.deepStrictEqual(queueReset.dequeue(), 2);
assert.deepStrictEqual(queueReset.isEmpty, false);
assert.deepStrictEqual(queueReset._length, 5);
assert.deepStrictEqual(queueReset.dequeue(), 3);
assert.deepStrictEqual(queueReset.isEmpty, false);
assert.deepStrictEqual(queueReset._length, 4);
assert.deepStrictEqual(queueReset.dequeue(), 4);
assert.deepStrictEqual(queueReset._length, 3);
assert.deepStrictEqual(queueReset.dequeue(), 5);
assert.deepStrictEqual(queueReset._length, 2);
assert.deepStrictEqual(queueReset.dequeue(), 6);
assert.deepStrictEqual(queueReset._length, 1);
assert.deepStrictEqual(queueReset.dequeue(), 7);
assert.deepStrictEqual(queueReset._length, 0);
assert.deepStrictEqual(queueReset.dequeue(), undefined);
assert.deepStrictEqual(queueReset._length, 0);

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