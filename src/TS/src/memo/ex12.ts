/**
 * Collection 구현 (공통)
 * array
 * size()
 * isEmpty()
 * pick()
 * toArray()
 * toString()
 * print()
 * clear()
 * iterator()
 * [Symbol.iterator]()
 */

import assert from 'assert/strict';

export abstract class Collection<T> {
    protected readonly array;

    constructor(...values: T[]) {
        this.array = values;
    }

    size() {
        return this.array.length;
    }

    isEmpty() {
        return this.size() === 0;
    }

    toArray() {
        return [...this.array];
    }

    toString() {
        return `[${this.array.join(', ')}]`;
    }

    clear() {
        this.array.length = 0;
    }

    iterator() {
        return this[Symbol.iterator]();
    }

    abstract peek(): T | undefined;
    abstract print(): void;
    abstract [Symbol.iterator](): { next(): { value: T | undefined, done: boolean } };
}

class Stack<T> extends Collection<T> {
    constructor(...values: T[]) {
        super(...values);
    }

    push(...values: T[]): this {
        if (values.length !== 0) this.array.push(...values);
        return this;
    }

    pop() {
        return this.array.pop();
    }

    peek() {
        return this.array[this.size() - 1];
    }

    print() {
        console.log(this.toString());
    }

    [Symbol.iterator]() {
        const array = this.array;
        let index = this.size() - 1;
        return {
            next() {
                return {
                    value: array[index--],
                    done: index <= -2,
                }
            }
        }
    }
}


const stack = new Stack<number>();
const stack1 = new Stack(1, 2, 3, 4, 5);
const stack2 = new Stack([1, 2], [3, 4, 5]);

assert.deepStrictEqual(stack.toArray(), []);
assert.deepStrictEqual(stack1.toArray(), [1, 2, 3, 4, 5]);
assert.deepStrictEqual(stack2.toArray(), [[1, 2,], [3, 4, 5]]);

stack.push().push(1).push(2).push(3).push(4).push().push(5);

assert.deepStrictEqual(stack.size(), 5);
assert.deepStrictEqual(stack.isEmpty(), false);
assert.deepStrictEqual(stack1.size(), 5);
assert.deepStrictEqual(stack1.isEmpty(), false);
assert.deepStrictEqual(stack2.size(), 2);
assert.deepStrictEqual(stack2.isEmpty(), false);
assert.deepStrictEqual(stack.push(1, 2, 5, 6, 7), stack);
assert.deepStrictEqual(stack.size(), 10);
assert.deepStrictEqual(stack.isEmpty(), false);
assert.deepStrictEqual(stack1.push(10, 20), stack1);
assert.deepStrictEqual(stack1.size(), 7);
assert.deepStrictEqual(stack1.isEmpty(), false);
assert.deepStrictEqual(stack2.push([10, 20]), stack2);
assert.deepStrictEqual(stack2.size(), 3);
assert.deepStrictEqual(stack2.isEmpty(), false);
assert.deepStrictEqual(stack.pop(), 7);
assert.deepStrictEqual(stack.size(), 9);
assert.deepStrictEqual(stack1.pop(), 20);
assert.deepStrictEqual(stack1.size(), 6);
assert.deepStrictEqual(stack2.pop(), [10, 20]);
assert.deepStrictEqual(stack2.size(), 2);
assert.deepStrictEqual(stack.toArray().reduce((acc, cur) => acc += cur), 29);
assert.deepStrictEqual(stack.peek(), 6);
assert.deepStrictEqual(stack1.toArray().reduce((acc, cur) => acc += cur), 25);
assert.deepStrictEqual(stack1.peek(), 10);
assert.deepStrictEqual(stack2.peek(), [3, 4, 5]);

stack.clear();
stack1.clear();
stack2.clear();

assert.deepStrictEqual(stack.isEmpty(), true);
assert.deepStrictEqual(stack1.isEmpty(), true);
assert.deepStrictEqual(stack2.isEmpty(), true);

assert.deepStrictEqual(stack.isEmpty(), true);
assert.deepStrictEqual(stack.pop(), undefined);
assert.deepStrictEqual(stack1.isEmpty(), true);
assert.deepStrictEqual(stack1.pop(), undefined);
assert.deepStrictEqual(stack2.isEmpty(), true);
assert.deepStrictEqual(stack2.pop(), undefined);

assert.deepStrictEqual(stack.isEmpty(), true);
assert.deepStrictEqual(stack1.isEmpty(), true);
assert.deepStrictEqual(stack2.isEmpty(), true);

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
assert.deepStrictEqual(iterStack.toArray(), [1, 2, 3, 4, 5, 6, 7]);


const iterStack2 = new Stack();
const iter2 = iterStack2.iterator();

assert.deepStrictEqual(iter2.next().value, undefined);
assert.deepStrictEqual(iter2.next().done, true);