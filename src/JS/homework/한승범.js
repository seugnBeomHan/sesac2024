import assert from 'assert/strict';
import * as readline from "readline";

function _0627_proxy() {
    class Emp {
        firstName;
        lastName;

        constructor() {
            return new Proxy(this, {
                get(target, prop, receiver) {
                    if (target.#isFullName(prop)) return `${target.firstName} ${target.lastName}`;
                    return Reflect.get(target, prop, receiver);
                },

                set(target, prop, val, receiver) {
                    if (typeof val !== 'string') return false;
                    if (target.#isFullName(prop)) {
                        const [first, last] = val.split(' ');

                        last === undefined ?
                            target.lastName = target.#changeUpperCase(first) :
                            (target.firstName = first, target.lastName = target.#changeUpperCase(last));

                        return true;
                    }
                    return Reflect.set(target, prop, val, receiver);
                }
            });
        }

        #changeUpperCase(str) {
            return str.toUpperCase();
        }

        #isFullName(prop) {
            return prop === 'fullName';
        }
    }

    const hongConstructor = new Emp();
    hongConstructor.fullName = 'Kildong Hong';
    assert.deepStrictEqual(hongConstructor.fullName, 'Kildong HONG');
    assert.deepStrictEqual(hongConstructor.firstName, 'Kildong');
    assert.deepStrictEqual(hongConstructor.lastName, 'HONG');

    hongConstructor.fullName = 'LEE';
    assert.deepStrictEqual(hongConstructor.fullName, 'Kildong LEE');
    assert.deepStrictEqual(hongConstructor.firstName, 'Kildong');
    assert.deepStrictEqual(hongConstructor.lastName, 'LEE');
};

function _0627_ArrayFunc() {
    Reflect.defineProperty(Array.prototype, 'firstObject',
        {
            get() { return this[0] },
        });

    Reflect.defineProperty(Array.prototype, 'lastObject',
        {
            get() { return this[this.length - 1] },
        });

    const isObjectKeyType = (key) => typeof key === 'string' || typeof key === 'symbol';

    Array.prototype.mapBy = function (key) {
        if (!isObjectKeyType(key)) return;
        return this.map((e) => e[key]);
    };

    Array.prototype.findBy = function (key, value) {
        if (!isObjectKeyType(key)) return;
        return this.find((e) => e[key] === value);
    };

    Array.prototype.filterBy = function (key, value) {
        if (!isObjectKeyType(key)) return;
        return this.filter((e) => e[key] === value);
    };

    Array.prototype.rejectBy = function (key, value) {
        if (!isObjectKeyType(key)) return;
        return this.filter((e) => e[key] !== value);
    };

    Array.prototype.sortBy = function (keyAndOrder) {
        if (typeof keyAndOrder !== 'string') return;

        const result = [...this];
        const [key, order = 'asc'] = keyAndOrder.split(':');

        return order === 'asc' ?
            result.sort((e1, e2) => e1[key] > e2[key] ? 1 : -1) :
            result.sort((e1, e2) => e1[key] > e2[key] ? -1 : 1);
    };

    // 0629 uniqBy 함수 구현 과제
    Array.prototype.uniqBy = function (key) {
        return [...this.reduce((acc, cur) => acc.add(cur[key]), new Set())];
    }

    const arr = [1, 2, 3, 4, 5];

    assert.deepStrictEqual(arr.firstObject, 1);
    assert.deepStrictEqual(arr.lastObject, 5);

    const hong = { id: 1, name: 'Hong', age: 27 };
    const kim = { id: 2, name: 'Kim', age: 27 };
    const lee = { id: 3, name: 'Lee', age: 30 };
    const users = [hong, lee, kim];

    assert.deepStrictEqual(users.firstObject, hong);
    assert.deepStrictEqual(users.lastObject, kim);
    assert.deepStrictEqual(users.mapBy('id'), [1, 3, 2]);
    assert.deepStrictEqual(users.mapBy('name'), ['Hong', 'Lee', 'Kim']);
    assert.deepStrictEqual(users, [hong, lee, kim]);
    assert.deepStrictEqual(users.findBy('name', 'Kim'), kim);
    assert.deepStrictEqual(users.findBy('name', 'Han'), undefined);
    assert.deepStrictEqual(users.findBy('age', 30), lee);
    assert.deepStrictEqual(users, [hong, lee, kim]);
    assert.deepStrictEqual(users.filterBy('id', 2), [kim]);
    assert.deepStrictEqual(users.filterBy('name', 'Hong'), [hong]);
    assert.deepStrictEqual(users.filterBy('age', 27), [hong, kim]);
    assert.deepStrictEqual(users, [hong, lee, kim]);
    assert.deepStrictEqual(users.rejectBy('id', 2), [hong, lee]);
    assert.deepStrictEqual(users.rejectBy('name', 'Hong'), [lee, kim]);
    assert.deepStrictEqual(users, [hong, lee, kim]);
    assert.deepStrictEqual(users.sortBy('name'), [hong, kim, lee]);
    assert.deepStrictEqual(users.sortBy('name:desc'), [lee, kim, hong]);
    assert.deepStrictEqual(users, [hong, lee, kim]);

    // uniqBy
    const hongUniq = { id: 1, name: 'Hong', dept: 'HR' };
    const hongUniq2 = { id: 1, name: 'Hong', dept: 'HR' };
    const kimUniq = { id: 2, name: 'Kim', dept: 'Server' };
    const leeUniq = { id: 3, name: 'Lee', dept: 'Front' };
    const leeUniq2 = { id: 3, name: 'Lee', dept: 'Front' };
    const parkUniq = { id: 4, name: 'Park', dept: 'HR' };
    const koUniq = { id: 7, name: 'Ko', dept: 'Server' };
    const koUniq2 = { id: 7, name: 'Ko', dept: 'Server' };
    const loonUniq = { id: 6, name: 'Loon', dept: 'Sales' };
    const loonUniq2 = { id: 6, name: 'Loon', dept: 'Sales' };
    const choiUniq = { id: 5, name: 'Choi', dept: 'Front' };
    const usersUniq = [hongUniq, hongUniq2, kimUniq, leeUniq, leeUniq2, parkUniq, koUniq, koUniq2, loonUniq, loonUniq2, choiUniq];
    assert.deepStrictEqual(usersUniq.uniqBy('dept'), ['HR', 'Server', 'Front', 'Sales']);
    assert.deepStrictEqual(usersUniq.uniqBy('name'), ['Hong', 'Kim', 'Lee', 'Park', 'Ko', 'Loon', 'Choi']);
}

function _0627_Collection() {
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
            if (this.isEmpty()) return this.#addEmpty(value);
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

        #addEmpty(value) {
            this._array.value = value;
            this.#tail = this._array;

            this.#increaseLength();
            return true;
        }

        removeFirst() {
            if (this.isEmpty()) return;

            const result = this._array;
            this._array = this._array.next || (this.#tail = this.#createNewObj(undefined));
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
    addArrayTest.clear();

    const lastArray = new ArrayList();
    lastArray.print();
    lastArray.add(10);
    lastArray.print();
}

function _0627_Queue() {
    class Queue {
        /**
         * reset 진행 기준 되는 버려진 공간 개수 설정
         * 전체 Queue 인스턴스에 공통적으로 사용
         */
        static #ABANDONED_SPACE_MAX = 4;
        static setAbandonedSpaceCount(count) {
            if (count % 4 !== 0) return false;
            Queue.#ABANDONED_SPACE_MAX = count;
            return true;
        }

        #queue;
        #length;
        #front;
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
            return this.#front === Queue.#ABANDONED_SPACE_MAX;
        }

        // 현재 유효한 범위의 array 반환
        #getCurrentQueue() {
            return this.#queue.slice(this.#front, this.#length);
        }

        iterator() {
            return this[Symbol.iterator]();
        }

        [Symbol.iterator]() {
            let index = this.#front;
            const currentQueue = this.toArray();
            return {
                next: () => {
                    return {
                        value: currentQueue[index++],
                        done: index > this.getLength()
                    }
                }
            }
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
}

function _0627_Stack() {
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
}

function _0629_ArrayList() {
    class ArrayList {
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

        #list;
        #tail;
        #length;
        constructor(...args) {
            this.clear();
            if (args.length !== 0) this.add(...args);
        }

        add(value, index = this.size) {
            if (value === undefined) return;

            if (Array.isArray(value)) return this.#addArray(value);

            if (this.isEmpty()) {
                this.#list.value = value;
                this.#tail = this.#list;

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
            newObj.next = this.#list;
            this.#list = newObj;

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

            let target = this.#list;
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

        remove(value) {
            if (this.isEmpty()) return;

            if (value === undefined) return this.removeLast();
            if (value === this.peek) return this.removeFirst();
            return this.removeValue(value);
        }

        removeFirst() {
            if (this.isEmpty()) return;

            const result = this.#list;
            this.#list = this.#list.next || (this.#tail = {});
            delete result.next;

            this.#decreaseLength();
            return result;
        }

        removeLast() {
            if (this.isEmpty()) return;
            if (this.size === 1) return this.removeFirst();

            let target = this.#list;
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

            let target = this.#list;
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

            let target = this.#list;
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

            let target = this.#list;
            for (let i = 0; i < index; i += 1, target = target.next);

            return target.value;
        }

        set(index, value) {
            if (this.isEmpty()) return;

            index = this.#indexReorder(index);

            let target = this.#list;
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
            return this.#list.value;
        }

        get size() {
            return this.#length;
        }

        isEmpty() {
            return this.#tail.value === undefined;
        }

        indexOf(value) {
            if (this.isEmpty()) return;

            let target = this.#list;
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
            return ArrayList.listToArray(this.#list);
        }

        print() {
            console.log(`\nArrayList(${this.size})`);

            let start = this.#list;
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
            this.#list = {};
            this.#tail = this.#list;
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

    assert.deepStrictEqual(ArrayList.listToArray({ value: 1, next: { value: 2, next: { value: 3 } } }), [1, 2, 3]);
    assert.deepStrictEqual(ArrayList.arrayToList([1, 2, 3]), { value: 1, next: { value: 2, next: { value: 3 } } });

    const list = new ArrayList([1, 2, 3, 4, 5]);

    list.add(10);
    list.add(100, 0);
    list.add(30, 1);
    list.add(40, 1);
    list.add(50, 1);

    assert.deepStrictEqual(list.size, 10);
    assert.deepStrictEqual(list.removeFirst(), { value: 100 });
    assert.deepStrictEqual(list.size, 9);

    assert.deepStrictEqual(list.removeLast(), { value: 10 });
    assert.deepStrictEqual(list.size, 8);

    list.removeValue(2);

    const removeList = new ArrayList([1, 2, 3]);

    assert.deepStrictEqual(removeList.removeFirst(), { value: 1 });
    removeList.add(10, 100);
    assert.deepStrictEqual(removeList.removeLast(), { value: 10 });
    assert.deepStrictEqual(removeList.removeLast(), { value: 3 });
    assert.deepStrictEqual(removeList.removeLast(), { value: 2 });

    removeList.add([10, 20, 30]);
    assert.deepStrictEqual(removeList.removeLast(), { value: 30 });
    assert.deepStrictEqual(removeList.removeLast(), { value: 20 });
    removeList.add(100, 0);
    removeList.add(200, 1);
    assert.deepStrictEqual(removeList.removeLast(), { value: 10 });
    assert.deepStrictEqual(removeList.removeValue(100), { value: 100 });
    assert.deepStrictEqual(removeList.removeValue(200), { value: 200 });
    removeList.add([1, 2, 3, 4, 5]);
    assert.deepStrictEqual(removeList.removeValue(4), { value: 4 });
    assert.deepStrictEqual(removeList.removeValue(5), { value: 5 });
    assert.deepStrictEqual(removeList.removeValue(1), { value: 1 });
    removeList.add([1, 2, 3, 4, 5]);
    assert.deepStrictEqual(removeList.removeIndex(2), { value: 1 });
    assert.deepStrictEqual(removeList.removeIndex(2), { value: 2 });
    assert.deepStrictEqual(removeList.removeIndex(2), { value: 3 });
    assert.deepStrictEqual(removeList.removeIndex(2), { value: 4 });
    removeList.add([1, 2, 3, 4, 5]);
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
    assert.deepStrictEqual(removeList.indexOf(100), -1);
    assert.deepStrictEqual(removeList.indexOf(200), 0);
    assert.deepStrictEqual(removeList.indexOf(300), 1);
    assert.deepStrictEqual(removeList.indexOf(2000), removeList.size - 1);
    assert.deepStrictEqual(removeList.contains(2), true);
    assert.deepStrictEqual(removeList.contains(200), true);
    assert.deepStrictEqual(removeList.contains(2000), true);
    assert.deepStrictEqual(removeList.contains(3000), false);

    const iter = removeList[Symbol.iterator]();
    assert.deepStrictEqual(iter.next(), { value: 200, done: false });
    assert.deepStrictEqual(iter.next(), { value: 300, done: false });
    assert.deepStrictEqual(iter.next(), { value: 400, done: false });
    assert.deepStrictEqual(iter.next(), { value: 500, done: false });
    assert.deepStrictEqual(iter.next(), { value: 2, done: false });
    assert.deepStrictEqual(iter.next(), { value: 3, done: false });
    assert.deepStrictEqual(iter.next(), { value: 4, done: false });
    assert.deepStrictEqual(iter.next(), { value: 2000, done: false });
    assert.deepStrictEqual(iter.next(), { value: undefined, done: true });

    const addArrayTest = new ArrayList();
    addArrayTest.add([1, 2, 3, 4, 5]);
    addArrayTest.removeIndex(3);
    addArrayTest.add([10, 20, 30, 40, 50]);
    addArrayTest.add(100, 2);
    addArrayTest.add(100, 6);
}

function _0629_GenericFunc() {
    const prompt = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    function* add() {
        const num1 = yield '첫 번째 수를 입력해주세요.';
        const num2 = yield '두 번째 수를 입력해주세요.';
        return num1 + num2;
    }

    const addIter = add();

    console.log(addIter.next().value);

    prompt.on('line', (input) => {
        if (Number.isInteger(+input)) {
            const { value, done } = addIter.next(+input);

            if (done) {
                console.log(`Total: ${value}`);
                prompt.close();
            }
            console.log(value);
        }
    }).on('close', () => process.exit());
}

function _0629_Subway() {
    class Subway {
        static #LINE_2 = [
            '신도림',
            '대림',
            '구로디지털단지',
            '신대방',
            '신림',
            '봉천',
            '서울대입구',
            '낙성대',
            '사당',
            '방배',
            '서초',
            '교대',
            '강남',
            '역삼',
            '선릉',
            '삼성',
            '종합운동장',
            '잠실새내',
            '잠실',
            '잠실나루',
            '강변',
            '구의',
            '건대입구',
            '성수',
            '용답',
            '신답',
            '용두',
            '신설동',
            '뚝섬',
            '한양대',
            '왕십리',
            '상왕십리',
            '신당',
            '동대문역사문화공원',
            '을지로4가',
            '을지로3가',
            '을지로입구',
            '시청',
            '충정로',
            '아현',
            '이대',
            '신촌',
            '홍대입구',
            '합정',
            '당산',
            '영등포구청',
            '문래',
        ];

        static stationCount() {
            return Subway.#LINE_2.length;
        }

        static #stationIndexOf(station) {
            return Subway.#LINE_2.indexOf(station);
        }

        static #stationsToArray(dIndex, aIndex) {
            return Subway.#LINE_2.slice(dIndex, aIndex);
        }

        #departures;
        #arrivals;

        constructor(departures, arrivals) {
            if (this.#inputIsNotVaild(departures, arrivals)) {
                throw new ReferenceError('Please enter the correct input value');
            }

            this.#departures = departures;
            this.#arrivals = arrivals;
        }

        #inputIsNotVaild(departures, arrivals) {
            if (departures === undefined || arrivals === undefined) {
                return true;
            }

            const departuresIndex = Subway.#stationIndexOf(departures);
            const arrivalsIndex = Subway.#stationIndexOf(arrivals);

            if ((departuresIndex === -1 || arrivalsIndex === -1) ||
                (departuresIndex === arrivalsIndex)) {
                return true;
            }
            return false;
        }

        #fromDeparturesToArrivals() {
            const departuresIndex = Subway.#stationIndexOf(this.#departures);
            const arrivalsIndex = Subway.#stationIndexOf(this.#arrivals);

            return arrivalsIndex > departuresIndex ?
                Subway.#stationsToArray(departuresIndex, arrivalsIndex + 1) :
                [...Subway.#stationsToArray(departuresIndex, Subway.stationCount()),
                ...Subway.#stationsToArray(0, arrivalsIndex + 1)];
        }

        iterator() {
            return this[Symbol.iterator]();
        }

        [Symbol.iterator]() {
            let index = 0;
            const stations = this.#fromDeparturesToArrivals();
            return {
                next: () => {
                    return {
                        value: stations[index++],
                        done: index > stations.length
                    }
                }
            }
        }
    }

    // const wrongInput1 = new Subway(); // ok
    // const wrongInput2 = new Subway('서울대입구'); // ok
    // const wrongInput3 = new Subway('서울대입구', '목동'); // ok
    // const wrongInput4 = new Subway('목동', '서울대입구'); // ok
    // const wrongInput5 = new Subway('서울대입구', '서울대입구'); // ok

    console.log('========단방향 테스트========');
    const route = new Subway('신도림', '서울대입구');
    assert.deepStrictEqual([...route], ['신도림', '대림', '구로디지털단지', '신대방', '신림', '봉천', '서울대입구']);

    const iter = route.iterator();
    while (true) {
        const { value, done } = iter.next();
        if (done) break;
        console.log(value);
    }

    console.log('========순환 테스트========');

    const route2 = new Subway('왕십리', '강남');
    assert.deepStrictEqual([...route2], [
        '왕십리', '상왕십리',
        '신당', '동대문역사문화공원',
        '을지로4가', '을지로3가',
        '을지로입구', '시청',
        '충정로', '아현',
        '이대', '신촌',
        '홍대입구', '합정',
        '당산', '영등포구청',
        '문래', '신도림',
        '대림', '구로디지털단지',
        '신대방', '신림',
        '봉천', '서울대입구',
        '낙성대', '사당',
        '방배', '서초',
        '교대', '강남'
    ]);

    const iter2 = route2.iterator();
    while (true) {
        const { value, done } = iter2.next();
        if (done) break;
        console.log(value);
    }

    console.log('========전체 순환 테스트========');

    const route3 = new Subway('종합운동장', '삼성');
    assert.deepStrictEqual([...route3], [
        '종합운동장', '잠실새내', '잠실',
        '잠실나루', '강변', '구의',
        '건대입구', '성수', '용답',
        '신답', '용두', '신설동',
        '뚝섬', '한양대', '왕십리',
        '상왕십리', '신당', '동대문역사문화공원',
        '을지로4가', '을지로3가', '을지로입구',
        '시청', '충정로', '아현',
        '이대', '신촌', '홍대입구',
        '합정', '당산', '영등포구청',
        '문래', '신도림', '대림',
        '구로디지털단지', '신대방', '신림',
        '봉천', '서울대입구', '낙성대',
        '사당', '방배', '서초',
        '교대', '강남', '역삼',
        '선릉', '삼성'
    ]);
    assert.deepStrictEqual([...route3].length, Subway.stationCount());

    const iter3 = route3.iterator();
    while (true) {
        const { value, done } = iter3.next();
        if (done) break;
        console.log(value);
    }

    console.log('========1정거장 테스트========');

    const route4 = new Subway('홍대입구', '합정');
    assert.deepStrictEqual([...route4], ['홍대입구', '합정']);

    const iter4 = route4.iterator();
    while (true) {
        const { value, done } = iter4.next();
        if (done) break;
        console.log(value);
    }
}

function _0629_map() {
    const hrTeam = { id: 1, dname: '인사팀' };
    const devTeam = { id: 2, dname: '개발팀' };

    const depts = [hrTeam, devTeam];
    const deptMap = depts.reduce((map, cur, i) => map.set(i + 1, cur), new Map());
    console.log('deptMap >> ', deptMap);

    //

    const hong = { id: 1, name: 'Hong', dept: 1 };
    const kim = { id: 2, name: 'Kim', dept: 2 };

    const emps = [hong, kim, { id: 3, name: 'Park', dept: 2 }, { id: 4, name: 'Choi', dept: 2 }];
    const empMap = emps.reduce((map, cur, i) => map.set(i + 1, cur), new Map());
    console.log('empMap >> ', empMap);

    //

    const empDeptMap = new Map();
    for (const emp of empMap.values()) {
        for (const dept of deptMap.values()) {
            if (emp.dept === dept.id) {
                empDeptMap.set(emp, dept);
                break;
            }
        };
    }
    console.log('empDeptMap >> ', empDeptMap);

    assert.deepStrictEqual(empDeptMap.get(kim).dname, '개발팀');
    assert.deepStrictEqual(empDeptMap.get(hong).dname, '인사팀');

    // 개발팀 직원 목록 출력
    let result = [];
    const iter = empDeptMap.keys();

    while (true) {
        const { value: key, done } = iter.next();

        if (done) break;

        if (empDeptMap.get(key).dname === '개발팀') {
            result.push(key.name);
        }
    }

    console.log('개발팀 직원 목록: ', result.toString());
    assert.deepStrictEqual(result.toString(), 'Kim,Park,Choi');
}

function _0629_setFunction() {
    const A = [1, 2, 3, 4, 5, 3];
    const B = [1, 22, 3, 44, 5];
    const C = [11, 222, 3, 4, 555];

    // 교집합
    const intersection = (setA, setB) => {
        const cache = new Map();
        const result = new Set();

        setB.forEach((e) => { cache.set(e, e); });
        setA.forEach((e) => { if (cache.get(e) !== undefined) result.add(e); });

        return [...result];
    };

    // 차집합
    const diff = (setA, setB) => {
        const cache = new Map();
        const result = new Set();

        setB.forEach((e) => { cache.set(e, e); });
        setA.forEach((e) => { if (cache.get(e) === undefined) result.add(e); });

        return [...result];
    };

    // 합집합 
    const union = (setA, setB) => [...setB.reduce((set, cur) => set.add(cur), new Set(setA))];

    assert.deepStrictEqual(intersection(A, B), [1, 3, 5]);
    assert.deepStrictEqual(intersection(A, C), [3, 4]);
    assert.deepStrictEqual(diff(A, B), [2, 4]);
    assert.deepStrictEqual(diff(B, A), [22, 44]);
    assert.deepStrictEqual(diff(A, C), [1, 2, 5]);
    assert.deepStrictEqual(diff(B, C), [1, 22, 44, 5]);
    assert.deepStrictEqual(union(A, B), [1, 2, 3, 4, 5, 22, 44]);
    assert.deepStrictEqual(union(A, C), [1, 2, 3, 4, 5, 11, 222, 555]);
}

function _0629_Date() {
    // 1970년 1월 1일과 1970년 1월 2일의 차이를 초로 나타내시오.
    const day1 = new Date(1970, 0, 1);
    const day2 = new Date(1970, 0, 2);
    console.log(`1970년 1월 1일과 1970년 1월 2일의 차이: ${(day2 - day1) / 1000}초`);

    /**
     * 이 달의 날짜 5개를 무작위로 만들어 역순으로 정렬하시오.
     * 1, 3, 5, 7, 8, 10, 12 - 31
     * 2 - 28 or 29
     * 4, 6, 9, 11 - 30
    */

    const days = {
        0: 31,
        1: new Date().getFullYear() % 4 === 0 ? 29 : 28,
        2: 31,
        3: 30,
        4: 31,
        5: 30,
        6: 31,
        7: 31,
        8: 30,
        9: 31,
        10: 30,
        11: 31,
    };
    const randomDays = [];
    const DATE_COUNT = 5;

    const monthFullDay = days[new Date().getMonth()];
    for (let i = 0; i < DATE_COUNT; i += 1) {
        randomDays.push(Math.round(((Math.random() * monthFullDay) + 1)));
    }

    console.log(randomDays.sort((a, b) => b - a));

    // 내년(2025년)의 오늘(6월 29일)의 요일을 출력하시오.
    console.log(`${'일월화수목금토'[new Date(2025).getDay()]}요일`);

    // 오늘(2월 1일)로 부터 100일 후의 날짜는?
    const today = new Date();
    const FULL_MONTH = 12;
    let dday = 100;

    dday -= (days[today.getMonth()] - today.getDate());

    let i = 1;
    while (dday >= 0) {
        dday -= days[today.getMonth() + (i += 1)];
    }
    console.log(`오늘(${today.getFullYear()}.${today.getMonth() + 1}.${today.getDay()})의 100일 후: ${(today.getMonth() % FULL_MONTH) + i}.${days[(today.getMonth() % FULL_MONTH) + i] + dday}일`);
}

function _0629_Calender() {
    const printCalender = (date) => {
        if (typeof date !== 'string') return;

        const WEEK_COUNT = 7;
        const MONTH_OF_FULL_DAYS = {
            0: 31,
            1: new Date().getFullYear() % 4 === 0 ? 29 : 28,
            2: 31,
            3: 30,
            4: 31,
            5: 30,
            6: 31,
            7: 31,
            8: 30,
            9: 31,
            10: 30,
            11: 31,
        };

        const [month, day] = date.split(new RegExp('/|\\.|-'));

        const makeCalender = () => {
            const CUR_MONTH = MONTH_OF_FULL_DAYS[month - 1];
            const calender = [['일', '월', '화', '수', '목', '금', '토']];
            let oneWeek = [];
            let startDayOfMonth = getStartDayOfMonth();

            for (let i = 1; i <= CUR_MONTH; i += 1) {
                oneWeek[startDayOfMonth] = i;

                if ((startDayOfMonth += 1) === WEEK_COUNT) {
                    calender.push(oneWeek);
                    startDayOfMonth = 0;
                    oneWeek = [];
                }
            }
            calender.push(oneWeek);
            return calender;
        };

        const draw = () => {
            console.log(`\n${month}월`);
            console.table(makeCalender());
        };

        const getStartDayOfMonth = () => {
            const startDayOfMonth = makeDateObj().getDay() - ((day - 1) % WEEK_COUNT);
            return startDayOfMonth < 0 ?
                startDayOfMonth + WEEK_COUNT :
                startDayOfMonth;
        };

        const makeDateObj = () => {
            return new Date(new Date().getFullYear(), month - 1, day);
        }

        draw();
    };

    /**
     * 입력 양식 (년도는 올해)
     * string: mm/dd | mm.dd | mm-dd
     */
    const today = new Date();
    printCalender(`${today.getMonth() - 5}-${14}`);
    printCalender(`${today.getMonth() - 4}-${22}`);
    printCalender(`${today.getMonth() - 3}-${30}`);
    printCalender(`${today.getMonth() - 2}/${5}`);
    printCalender(`${today.getMonth() - 1}/${1}`);
    printCalender(`${today.getMonth()}/${15}`);
    printCalender(`${today.getMonth() + 1}.${today.getDay()}`);
    printCalender(`${today.getMonth() + 2}.${25}`);
    printCalender(`${today.getMonth() + 3}.${18}`);
    printCalender(`${today.getMonth() + 4}-${6}`);
    printCalender(`${today.getMonth() + 5}-${3}`);
    printCalender(`${today.getMonth() + 6}-${15}`);
}

function _0701_RegExp_1() {
    function fmt(texts, ...args) {
        return `${texts[0]}${String(args[0].toLocaleString('en-US')).padStart(8, ' ')}${texts[1]}`;
    }

    const total = { price: 45000, vat: 4500 };
    console.log(fmt`주문합계: ${total.price}원`);
    console.log(fmt`세액합계: ${total.vat}원`);
}

function _0701_Jaum() {
    const isEndJaum = (word) => {
        const CONSONANTS_ASCII = [76, 77, 78, 82, 108, 109, 110, 114, 48, 49, 51, 54, 55, 56];

        const getEndWord = () => word.charCodeAt(word.length - 1);
        const charCode = (char) => char.charCodeAt(0);
        const isGather = () => endWord >= charCode('ㅏ') && endWord <= charCode('ㅣ');
        const isConsonant = () => (endWord >= charCode('ㄱ') && endWord <= charCode('ㅎ')) || endWord % 28 !== 16;

        const endWord = getEndWord();

        return endWord < charCode('ㄱ') ?
            CONSONANTS_ASCII.includes(endWord) :
            !isGather() && isConsonant();
    }
    assert.deepStrictEqual(isEndJaum('한승범'), true);
    assert.deepStrictEqual(isEndJaum('서울'), true);
    assert.deepStrictEqual(isEndJaum("밤"), true);
    assert.deepStrictEqual(isEndJaum("컴퓨터"), false);
    assert.deepStrictEqual(isEndJaum('아지오'), false);
    assert.deepStrictEqual(isEndJaum('북한강'), true);
    assert.deepStrictEqual(isEndJaum('뷁'), true);
    assert.deepStrictEqual(isEndJaum('강원도'), false);
    assert.deepStrictEqual(isEndJaum('바라당'), true);
    assert.deepStrictEqual(isEndJaum('케잌'), true);
    assert.deepStrictEqual(isEndJaum('ㅜㅜ'), false);
    assert.deepStrictEqual(isEndJaum('점수 A'), false);
    assert.deepStrictEqual(isEndJaum('알파벳L'), true);
    assert.deepStrictEqual(isEndJaum('24'), false);
    assert.deepStrictEqual(isEndJaum('23'), true);

    const eunneun = (word) => isEndJaum(word) ? word + '은' : word + '는';
    const iga = (word) => isEndJaum(word) ? word + '이' : word + '가';
    const eulleul = (word) => isEndJaum(word) ? word + '을' : word + '를';
    const ieoyayeoya = (word) => isEndJaum(word) ? word + '이어야' : word + '여야';
    const ilanglang = (word) => isEndJaum(word) ? word + '이랑' : word + '랑';
    const idada = (word) => isEndJaum(word) ? word + '이다' : word + '다';

    assert.deepStrictEqual(eunneun("밤"), '밤은');
    assert.deepStrictEqual(eunneun("컴퓨터"), '컴퓨터는');
    assert.deepStrictEqual(eunneun('아지오'), '아지오는');
    assert.deepStrictEqual(eunneun('북한강'), '북한강은');
    assert.deepStrictEqual(iga("밤"), '밤이');
    assert.deepStrictEqual(iga("컴퓨터"), '컴퓨터가');
    assert.deepStrictEqual(iga('아지오'), '아지오가');
    assert.deepStrictEqual(iga('북한강'), '북한강이');
    assert.deepStrictEqual(eulleul("밤"), '밤을');
    assert.deepStrictEqual(eulleul("컴퓨터"), '컴퓨터를');
    assert.deepStrictEqual(eulleul('아지오'), '아지오를');
    assert.deepStrictEqual(eulleul('북한강'), '북한강을');
    assert.deepStrictEqual(ieoyayeoya("밤"), '밤이어야');
    assert.deepStrictEqual(ieoyayeoya("컴퓨터"), '컴퓨터여야');
    assert.deepStrictEqual(ieoyayeoya('아지오'), '아지오여야');
    assert.deepStrictEqual(ieoyayeoya('북한강'), '북한강이어야');
    assert.deepStrictEqual(ilanglang("밤"), '밤이랑');
    assert.deepStrictEqual(ilanglang("컴퓨터"), '컴퓨터랑');
    assert.deepStrictEqual(ilanglang('아지오'), '아지오랑');
    assert.deepStrictEqual(ilanglang('북한강'), '북한강이랑');
    assert.deepStrictEqual(idada("밤"), '밤이다');
    assert.deepStrictEqual(idada("컴퓨터"), '컴퓨터다');
    assert.deepStrictEqual(idada('아지오'), '아지오다');
    assert.deepStrictEqual(idada('북한강'), '북한강이다');
}

function _0701_SerchBy() {
    const searchByKoreanInitialSound = (datas, initConsonants) => {
        const makeJamoRange = () => {
            const result = [];

            for (const consonant of initConsonants) {
                const asciiCode = consonant.charCodeAt(0);
                if (asciiCode <= 127) {
                    result.push([asciiCode, asciiCode]);
                    continue;
                }
                const wordIndex = INITIAL_CONSONANT.indexOf(consonant);
                const jamoStart = GA + (INITIAL_INTERVAL * wordIndex);
                const jamoEnd = jamoStart + INITIAL_INTERVAL - 1;
                result.push([jamoStart, jamoEnd]);
            }
            return result;
        };

        // 초성 모음
        const INITIAL_CONSONANT = [
            'ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ',
            'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ',
            'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ',
            'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ',
        ];
        const GA = 44032; // 가
        const INITIAL_INTERVAL = 588; // 가 ~ 나 간격
        const jamoRange = makeJamoRange();

        return datas.reduce((result, word) => {
            for (let i = 0; i < word.length; i += 1) {
                let unicode = word[i].charCodeAt(0);
                let isValid = true;

                for (const [start, end] of jamoRange) {
                    if (unicode < start || unicode > end || unicode === undefined) {
                        isValid = false;
                        break;
                    }
                    unicode = word[i += 1]?.charCodeAt(0);
                }

                if (isValid) {
                    result.push(word);
                    return result;
                }
            }
            return result;
        }, []);
    };

    const datas = ['강원도 고성군', '고성군 토성면', '토성면 북면', '북면', '김1수'
        , '네이버', '다음', '아스키코드표', '아스키 코드표', '유니코드', '한글 초성', 'ASCII 코드표'];
    assert.deepStrictEqual(searchByKoreanInitialSound(datas, 'ㄴㅇ'), ['네이버']);
    assert.deepStrictEqual(searchByKoreanInitialSound(datas, 'ㄷㅇ'), ['다음']);
    assert.deepStrictEqual(searchByKoreanInitialSound(datas, 'ㄱ ㅊ'), ['한글 초성']);
    assert.deepStrictEqual(searchByKoreanInitialSound(datas, 'ㅇㄴ'), ['유니코드']);
    assert.deepStrictEqual(searchByKoreanInitialSound(datas, 'ㅇㅅㅋ'), ['아스키코드표', '아스키 코드표']);
    assert.deepStrictEqual(searchByKoreanInitialSound(datas, 'ㅇㅅㅋ '), ['아스키 코드표']);
    assert.deepStrictEqual(searchByKoreanInitialSound(datas, 'ASC'), ['ASCII 코드표']);
    assert.deepStrictEqual(searchByKoreanInitialSound(datas, 'ㄷ ㄱ'), ['강원도 고성군']);
    assert.deepStrictEqual(searchByKoreanInitialSound(datas, 'ㄱ ㅌ'), ['고성군 토성면']);
    assert.deepStrictEqual(searchByKoreanInitialSound(datas, 'ㄱㅅㄱ'), ['강원도 고성군', '고성군 토성면']);
    assert.deepStrictEqual(searchByKoreanInitialSound(datas, 'ㅌㅅㅁ'), ['고성군 토성면', '토성면 북면']);
    assert.deepStrictEqual(searchByKoreanInitialSound(datas, 'ㅂㅁ'), ['토성면 북면', '북면']);
    assert.deepStrictEqual(searchByKoreanInitialSound(datas, 'ㅍㅁ'), []);
    assert.deepStrictEqual(searchByKoreanInitialSound(datas, 'ㄱㄴ'), []);
    assert.deepStrictEqual(searchByKoreanInitialSound(datas, 'ㅅㅁ'), ['고성군 토성면', '토성면 북면']);
    assert.deepStrictEqual(searchByKoreanInitialSound(datas, 'ㄱ1ㅅ'), ['김1수']);

}

function _0701_Tel() {
    // 1
    const upperToLower = (str) => str.replace(/[A-Z]/g, `*$&*-`).toLowerCase();
    console.log(upperToLower('Senior Coding Learning JS'));

    // 2
    const telfmt = (tel) => {
        const getTelNumber = (start, end) => `${tel.slice(start, end)}-${tel.slice(end)}`;

        const TEL_LENGTH = tel.length;
        const LOCAL_NUMBER = tel[1];

        tel = getTelNumber(0, TEL_LENGTH - 4);
        if (TEL_LENGTH % 4 === 0) return tel[4] !== '-' ? getTelNumber(0, 4) : tel;
        return LOCAL_NUMBER === '2' ? getTelNumber(0, 2) : getTelNumber(0, 3);
    };

    assert.deepStrictEqual(telfmt('021234567'), '02-123-4567');
    assert.deepStrictEqual(telfmt('0101234567'), '010-123-4567');
    assert.deepStrictEqual(telfmt('0331234567'), '033-123-4567');
    assert.deepStrictEqual(telfmt('0212345678'), '02-1234-5678');
    assert.deepStrictEqual(telfmt('01012345678'), '010-1234-5678');
    assert.deepStrictEqual(telfmt('07012341234'), '070-1234-1234');
    assert.deepStrictEqual(telfmt('050712345678'), '0507-1234-5678');
    assert.deepStrictEqual(telfmt('15771577'), '1577-1577');
}

// Debounce, Throttle 과제는 HTML 파일인 관계로 추가로 제출하겠습니다.
_0627_proxy();
console.log();
_0627_ArrayFunc();
console.log();
_0627_Collection();
console.log();
_0627_Queue();
console.log();
_0627_Stack();
console.log();
_0629_ArrayList();
console.log();
_0629_Subway();
console.log();
_0629_map();
console.log();
_0629_setFunction();
console.log();
_0629_Date();
console.log();
_0629_Calender();
console.log();
_0701_RegExp_1();
console.log();
_0701_Jaum();
console.log();
_0701_SerchBy();
console.log();
_0701_Tel();
// _0629_GenericFunc(); // 입력 받아야 하는 관계로 주석 처리했습니다.