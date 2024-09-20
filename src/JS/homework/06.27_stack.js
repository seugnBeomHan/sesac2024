import assert from 'assert/strict';

class Stack {
    #stack;
    #length;

    constructor(...args) {
        this.#stack = [];
        this.#length = 0;

        if (args.length !== 0) this.push(...args);
    }

    push(...values) {
        if (values.length === 0) return;
        return (this.#length = this.#stack.push(...values));
    }

    pop() {
        if (this.isEmpty()) return;
        this.#length -= 1;
        return this.#stack.pop();
    }

    getLength() {
        return this.#length;
    }

    isEmpty() {
        return this.#length === 0;
    }

    peek() {
        if (this.isEmpty()) return;
        return this.#stack[this.#length - 1];
    }

    poll() {
        return this.pop();
    }

    remove() {
        return this.pop();
    }

    toArray() {
        return [...this.#stack];
    }

    print() {
        console.log(...this.#stack);
    }

    clear() {
        this.#stack = [];
        this.#length = 0;
    }

    iterator() {
        return this[Symbol.iterator]();
    }

    [Symbol.iterator]() {
        let index = this.getLength() - 1;
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

assert.deepStrictEqual(stack.getLength(), 1);
assert.deepStrictEqual(stack.isEmpty(), false);
assert.deepStrictEqual(stack1.getLength(), 6);
assert.deepStrictEqual(stack1.isEmpty(), false);
assert.deepStrictEqual(stack2.getLength(), 3);
assert.deepStrictEqual(stack2.isEmpty(), false);
assert.deepStrictEqual(stack.push(1, 2, 5, 6, 7), 6);
assert.deepStrictEqual(stack.getLength(), 6);
assert.deepStrictEqual(stack.isEmpty(), false);
assert.deepStrictEqual(stack1.push(10, 20), 8);
assert.deepStrictEqual(stack1.getLength(), 8);
assert.deepStrictEqual(stack1.isEmpty(), false);
assert.deepStrictEqual(stack2.push([10, 20]), 4);
assert.deepStrictEqual(stack2.getLength(), 4);
assert.deepStrictEqual(stack2.isEmpty(), false);
assert.deepStrictEqual(stack.pop(), 7);
assert.deepStrictEqual(stack.getLength(), 5);
assert.deepStrictEqual(stack1.pop(), 20);
assert.deepStrictEqual(stack1.getLength(), 7);
assert.deepStrictEqual(stack2.pop(), [10, 20]);
assert.deepStrictEqual(stack2.getLength(), 3);
assert.deepStrictEqual(stack.toArray().reduce((acc, cur) => acc += cur), 17);
assert.deepStrictEqual(stack.peek(), 6);
assert.deepStrictEqual(stack1.toArray().reduce((acc, cur) => acc += cur), 28);
assert.deepStrictEqual(stack1.peek(), 10);
assert.deepStrictEqual(stack2.peek(), 3);

stack.clear();
stack1.clear();
stack2.clear();

assert.deepStrictEqual(stack.isEmpty(), true);
assert.deepStrictEqual(stack.poll(), undefined);
assert.deepStrictEqual(stack1.isEmpty(), true);
assert.deepStrictEqual(stack1.poll(), undefined);
assert.deepStrictEqual(stack2.isEmpty(), true);
assert.deepStrictEqual(stack2.poll(), undefined);

assert.deepStrictEqual(stack.isEmpty(), true);
assert.deepStrictEqual(stack.pop(), undefined);
assert.deepStrictEqual(stack1.isEmpty(), true);
assert.deepStrictEqual(stack1.pop(), undefined);
assert.deepStrictEqual(stack2.isEmpty(), true);
assert.deepStrictEqual(stack2.pop(), undefined);

assert.deepStrictEqual(stack.isEmpty(), true);
assert.deepStrictEqual(stack.remove(), undefined);
assert.deepStrictEqual(stack1.isEmpty(), true);
assert.deepStrictEqual(stack1.remove(), undefined);
assert.deepStrictEqual(stack2.isEmpty(), true);
assert.deepStrictEqual(stack2.remove(), undefined);

assert.deepStrictEqual(stack.isEmpty(), true);
assert.deepStrictEqual(stack.peek(), undefined);
assert.deepStrictEqual(stack1.isEmpty(), true);
assert.deepStrictEqual(stack1.peek(), undefined);
assert.deepStrictEqual(stack2.isEmpty(), true);
assert.deepStrictEqual(stack2.peek(), undefined);

const iterStack = new Stack(1, 2, 3, 4, 5, 6, 7);
const iter = iterStack.iterator();

assert.deepStrictEqual(iter.next().value, 7);
assert.deepStrictEqual(iter.next().value, 6);
assert.deepStrictEqual(iter.next().value, 5);
assert.deepStrictEqual(iter.next().done, false);
assert.deepStrictEqual(iter.next().done, false);
assert.deepStrictEqual(iter.next().value, 2);
assert.deepStrictEqual(iter.next().done, false);
assert.deepStrictEqual(iter.next().done, true);

const iterStack2 = new Stack();
const iter2 = iterStack2.iterator();

assert.deepStrictEqual(iter2.next().value, undefined);
assert.deepStrictEqual(iter2.next().done, true);