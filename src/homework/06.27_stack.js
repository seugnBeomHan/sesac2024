import assert from 'assert/strict';

class Stack {
    #stack;
    #length;

    constructor(...args) {
        this.#stack = [];
        this.#length = 0;

        if (args.length !== 0) this.push(...args);
    }

    get length() {
        return this.#length;
    }

    push(...values) {
        if (values.length === 0) return this.#length;
        return (this.#length = this.#stack.push(...values));
    }

    pop() {
        if (this.isEmpty()) return;
        this.#length -= 1;
        return this.#stack.pop();
    }

    peek() {
        if (this.isEmpty()) return;
        return this.#stack[this.#length - 1];
    }

    isEmpty() { return this.#length === 0; }
    poll() { return this.pop(); }
    remove() { return this.pop(); }
    toArray() { return [...this.#stack]; }
    print() { console.log(...this.#stack); }
    clear() {
        this.#stack = [];
        this.#length = 0;
        return true;
    }
}

const stack = new Stack();
const stack1 = new Stack(1, 2, 3, 4, 5);
const stack2 = new Stack([1, 2], [3, 4, 5]);
assert.deepStrictEqual(stack.toArray(), []);
assert.deepStrictEqual(stack1.toArray(), [1, 2, 3, 4, 5]);
assert.deepStrictEqual(stack2.toArray(), [[1, 2,], [3, 4, 5]]);

stack.print();
stack.push();
stack.push(3);
stack1.print();
stack1.push();
stack1.push(3);
stack2.print();
stack2.push();
stack2.push(3);

assert.deepStrictEqual(stack.length, 1);
assert.deepStrictEqual(stack.isEmpty(), false);
assert.deepStrictEqual(stack1.length, 6);
assert.deepStrictEqual(stack1.isEmpty(), false);
assert.deepStrictEqual(stack2.length, 3);
assert.deepStrictEqual(stack2.isEmpty(), false);

stack.print();
stack1.print();
stack2.print();

assert.deepStrictEqual(stack.push(1, 2, 5, 6, 7), 6);
assert.deepStrictEqual(stack.length, 6);
assert.deepStrictEqual(stack.isEmpty(), false);
assert.deepStrictEqual(stack1.push(10, 20), 8);
assert.deepStrictEqual(stack1.length, 8);
assert.deepStrictEqual(stack1.isEmpty(), false);
assert.deepStrictEqual(stack2.push([10, 20]), 4);
assert.deepStrictEqual(stack2.length, 4);
assert.deepStrictEqual(stack2.isEmpty(), false);

stack.print();
stack1.print();
stack2.print();

assert.deepStrictEqual(stack.pop(), 7);
assert.deepStrictEqual(stack.length, 5);
assert.deepStrictEqual(stack1.pop(), 20);
assert.deepStrictEqual(stack1.length, 7);
assert.deepStrictEqual(stack2.pop(), [10, 20]);
assert.deepStrictEqual(stack2.length, 3);

stack.print();
stack1.print();
stack2.print();

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