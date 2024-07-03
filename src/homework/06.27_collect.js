import assert from 'assert/strict';

class Collection {
    #array;

    constructor() {
        if (this.#getConstructor() === 'Collection') {
            throw new ReferenceError('Collection type objects cannot be created');
        }

        this.#array = this.#getConstructor() === 'ArrayList' ? {} : [];
    }

    get _array() {
        return this.#array;
    }

    set _array(array) {
        if (this.#getConstructor() === 'ArrayList' && Reflect.has(array, 'value')) {
            this.#array = array;
            return true;
        }
        throw new ReferenceError('The property is inaccessible');
    }

    get _length() {
        return this.#array.length;
    }

    set _length(value) {
        throw new ReferenceError('The property is inaccessible');
    }

    get isEmpty() {
        return this._length === 0;
    }

    get peek() {
        throw new ReferenceError('That method requires overriding');
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
            case 'ArrayList':
                return this.removeLast();
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
        this.#array = this.#getConstructor() === 'ArrayList' ? {} : [];
    }

    iterator() {
        return this[Symbol.iterator]();
    }

    #getConstructor() {
        return this.constructor.name;
    }
}


class ArrayList extends Collection {
    static listToArray(list) {
        const result = [];

        while (true) {
            const { value, next } = list;

            result.push(value);
            list = next;

            if (list === undefined) break;
        }
        return result;
    }

    static arrayToList(array) {
        let list = {};
        list.value = array[0];

        return array.slice(1).reduce((list, cur) => {
            let tmpList = list;
            for (; tmpList.next !== undefined; tmpList = tmpList.next);
            tmpList.next = { 'value': cur };
            return list;
        }, list);
    }

    #tail;
    #length;

    constructor(...args) {
        super();
        this.clear();
        if (args.length !== 0) this.add(...args);
    }

    add(value, index = this.size) {
        if (value === undefined) return;

        if (Array.isArray(value)) return this.#addArray(value);

        if (this.isEmpty()) {
            this._array.value = value;
            this.#tail = this._array;

            this.#increaseLength();
            return true;
        }

        return index >= this.size ?
            this.#addLast(value) :
            index <= 0 ?
                this.#addFirst(value) :
                this.#addIndex(value, index);
    }

    #addArray(array) {
        if (this.isEmpty()) {
            this.#tail.value = array[0];
            this.#increaseLength();
            array = array.slice(1);
        }

        this.#tail = array.reduce((tail, value) => {
            this.#increaseLength();
            return tail.next = this.#createNewObj(value);
        }, this.#tail);

        return true;
    }

    #addFirst(value) {
        const newObj = this.#createNewObj(value);
        newObj.next = this._array;
        this._array = newObj;

        this.#increaseLength();
        return true;
    }

    #addLast(value) {
        this.#tail.next = this.#createNewObj(value);
        this.#tail = this.#tail.next;

        this.#increaseLength();
        return true;
    }

    #addIndex(value, index) {
        index = index = this.#indexReorder(index);

        const newObj = this.#createNewObj(value);

        let target = this._array;
        let targetPrev = undefined;

        for (let i = 0; i < index; i += 1) {
            targetPrev = target;
            target = target.next;
        }

        targetPrev.next = newObj;
        newObj.next = target;

        this.#increaseLength();
        return true;
    }

    removeFirst() {
        if (this.isEmpty()) return;

        const result = this._array;
        this._array = this._array.next || (this.#tail = { 'value': undefined });
        delete result.next;

        this.#decreaseLength();
        return result;
    }

    removeLast() {
        if (this.isEmpty()) return;
        if (this.size === 1) return this.removeFirst();

        let target = this._array;
        while (target.next.next !== undefined) target = target.next;

        const result = target.next;
        this.#tail = target;
        delete target.next;

        this.#decreaseLength();
        return result;
    }

    removeValue(value) {
        if (this.isEmpty()) return;
        if (this.size === 1 || this.peek === value) return this.removeFirst();

        let target = this._array;
        let targetPrev = undefined;

        while (target !== undefined) {
            if (target.value === value) {
                return this.#deleteMiddleElement(targetPrev, target);
            }
            targetPrev = target;
            target = target.next;
        }
        return;
    }

    removeIndex(index) {
        if (this.isEmpty()) return;
        if (this.size === 1 || index <= 0) return this.removeFirst();
        if (index >= this.size - 1) return this.removeLast();

        let target = this._array;
        let targetPrev = undefined;

        for (let i = 0; i < index; i += 1) {
            targetPrev = target;
            target = target.next;
        };
        return this.#deleteMiddleElement(targetPrev, target);
    }

    #deleteMiddleElement(targetPrev, target) {
        if (target.next === undefined) this.#tail = targetPrev;
        targetPrev.next = target.next;
        delete target.next;

        this.#decreaseLength();
        return target;
    }

    get(index) {
        if (this.isEmpty()) return;
        if (this.size === 1 || index <= 0) return this.peek;

        index = this.#indexReorder(index);

        let target = this._array;
        for (let i = 0; i < index; i += 1, target = target.next);

        return target.value;
    }

    set(index, value) {
        if (this.isEmpty()) return;

        index = this.#indexReorder(index);

        let target = this._array;
        for (let i = 0; i < index; i += 1, target = target.next);

        target.value = value;
    }

    #indexReorder(index) {
        return index >= this.size ?
            this.size - 1 : index < 0 ?
                0 : index;
    }

    get peek() {
        if (this.isEmpty()) return;
        return this._array.value;
    }

    get size() {
        return this.#length;
    }

    get _length() {
        return this.#length;
    }

    isEmpty() {
        return this.#tail.value === undefined;
    }

    indexOf(value) {
        if (this.isEmpty()) return;

        let target = this._array;
        for (let i = 0; i < this.size; i += 1, target = target.next) {
            if (target.value === value) {
                return i;
            }
        }
        return -1;
    }

    contains(value) {
        if (this.isEmpty()) return;
        return this.indexOf(value) > -1;
    }

    toArray() {
        return ArrayList.listToArray(this._array);
    }

    print() {
        console.log(`\nArrayList(${this.size})`);

        let start = this._array;
        while (start !== undefined) {
            console.log(`value: ${start.value}, next: ${start?.next?.value}`);
            start = start.next;
        }
    }

    iterator() {
        return this[Symbol.iterator]();
    }

    [Symbol.iterator]() {
        const curArrayList = this.toArray();
        let index = 0;
        return {
            next: () => {
                return {
                    value: curArrayList[index++],
                    done: index > this.size
                }
            }
        }
    }

    clear() {
        super.clear();
        this.#tail = this._array;
        this.#length = 0;
    }

    #increaseLength() {
        this.#length += 1;
    }

    #decreaseLength() {
        this.#length -= 1;
    }

    #createNewObj(value) {
        return { 'value': value };
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

assert.deepStrictEqual(ArrayList.listToArray({ value: 1, next: { value: 2, next: { value: 3 } } }), [1, 2, 3]);
assert.deepStrictEqual(ArrayList.arrayToList([1, 2, 3]), { value: 1, next: { value: 2, next: { value: 3 } } });

const list = new ArrayList([1, 2, 3, 4, 5]);

list.print();
list.add(10);
list.add(100, 0);
list.add(30, 1);
list.add(40, 1);
list.add(50, 1);
list.print();

assert.deepStrictEqual(list.size, 10);
assert.deepStrictEqual(list.removeFirst(), { value: 100 });
assert.deepStrictEqual(list.size, 9);

list.print();

assert.deepStrictEqual(list.removeLast(), { value: 10 });
assert.deepStrictEqual(list.size, 8);

list.print();

list.removeValue(2);
list.print();

console.log('\n----list----');

const removeList = new ArrayList([1, 2, 3]);
removeList.print();

assert.deepStrictEqual(removeList.removeFirst(), { value: 1 });
removeList.print();
removeList.add(10, 100);
removeList.print();
assert.deepStrictEqual(removeList.removeLast(), { value: 10 });
removeList.print();
assert.deepStrictEqual(removeList.removeLast(), { value: 3 });
removeList.print();
assert.deepStrictEqual(removeList.removeLast(), { value: 2 });
removeList.print();

removeList.add([10, 20, 30]);
removeList.print();
assert.deepStrictEqual(removeList.removeLast(), { value: 30 });
assert.deepStrictEqual(removeList.removeLast(), { value: 20 });
removeList.print();
removeList.add(100, 0);
removeList.add(200, 1);
removeList.print();
assert.deepStrictEqual(removeList.removeLast(), { value: 10 });
removeList.print();
assert.deepStrictEqual(removeList.removeValue(100), { value: 100 });
removeList.print();
assert.deepStrictEqual(removeList.removeValue(200), { value: 200 });
removeList.print();
removeList.add([1, 2, 3, 4, 5]);
removeList.print();
assert.deepStrictEqual(removeList.removeValue(4), { value: 4 });
removeList.print();
assert.deepStrictEqual(removeList.removeValue(5), { value: 5 });
removeList.print();
assert.deepStrictEqual(removeList.removeValue(1), { value: 1 });
removeList.print();
removeList.add([1, 2, 3, 4, 5]);
removeList.print();
assert.deepStrictEqual(removeList.removeIndex(2), { value: 1 });
assert.deepStrictEqual(removeList.removeIndex(2), { value: 2 });
assert.deepStrictEqual(removeList.removeIndex(2), { value: 3 });
assert.deepStrictEqual(removeList.removeIndex(2), { value: 4 });
removeList.print();
removeList.add([1, 2, 3, 4, 5]);
removeList.print();
assert.deepStrictEqual(removeList.toArray(), [2, 3, 5, 1, 2, 3, 4, 5]);
assert.deepStrictEqual(removeList.get(-1), 2);
assert.deepStrictEqual(removeList.get(0), 2);
assert.deepStrictEqual(removeList.get(1), 3);
assert.deepStrictEqual(removeList.get(2), 5);
assert.deepStrictEqual(removeList.get(removeList.size), 5);
assert.deepStrictEqual(removeList.get(removeList.size - 1), 5);
removeList.set(-1, 100);
assert.deepStrictEqual(removeList.toArray(), [100, 3, 5, 1, 2, 3, 4, 5]);
removeList.set(0, 200);
removeList.set(1, 300);
removeList.set(2, 400);
removeList.set(3, 500);
assert.deepStrictEqual(removeList.toArray(), [200, 300, 400, 500, 2, 3, 4, 5]);
removeList.set(removeList.size, 1000);
assert.deepStrictEqual(removeList.toArray(), [200, 300, 400, 500, 2, 3, 4, 1000]);
removeList.set(removeList.size - 1, 2000);
assert.deepStrictEqual(removeList.toArray(), [200, 300, 400, 500, 2, 3, 4, 2000]);
removeList.print();
assert.deepStrictEqual(removeList.indexOf(100), -1);
assert.deepStrictEqual(removeList.indexOf(200), 0);
assert.deepStrictEqual(removeList.indexOf(300), 1);
assert.deepStrictEqual(removeList.indexOf(2000), removeList.size - 1);
assert.deepStrictEqual(removeList.contains(2), true);
assert.deepStrictEqual(removeList.contains(200), true);
assert.deepStrictEqual(removeList.contains(2000), true);
assert.deepStrictEqual(removeList.contains(3000), false);

const arrayIter = removeList[Symbol.iterator]();
assert.deepStrictEqual(arrayIter.next(), { value: 200, done: false });
assert.deepStrictEqual(arrayIter.next(), { value: 300, done: false });
assert.deepStrictEqual(arrayIter.next(), { value: 400, done: false });
assert.deepStrictEqual(arrayIter.next(), { value: 500, done: false });
assert.deepStrictEqual(arrayIter.next(), { value: 2, done: false });
assert.deepStrictEqual(arrayIter.next(), { value: 3, done: false });
assert.deepStrictEqual(arrayIter.next(), { value: 4, done: false });
assert.deepStrictEqual(arrayIter.next(), { value: 2000, done: false });
assert.deepStrictEqual(arrayIter.next(), { value: undefined, done: true });

const addArrayTest = new ArrayList();
addArrayTest.add([1, 2, 3, 4, 5]);
addArrayTest.print();
addArrayTest.removeIndex(3);
addArrayTest.print();
addArrayTest.add([10, 20, 30, 40, 50]);
addArrayTest.print();
addArrayTest.add(100, 2);
addArrayTest.add(100, 6);
addArrayTest.print();