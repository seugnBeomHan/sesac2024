import assert from 'assert/strict';

class ArrayList {
    static listToArray(list) {
        let { ...copy } = list;
        const result = [];

        while (true) {
            const { value, next } = copy;

            result.push(value);
            copy = next;

            if (copy === undefined) break;
        }

        return result;
    }

    static arrayToList(array) {
        return array.reduce((list, cur) => {
            if (list.value === undefined) {
                list.value = cur;
                return list;
            }

            let result = list;

            while (true) {
                if (result.next === undefined) {
                    result.next = { 'value': cur };
                    return list;
                }
                result = result.next;
            }
        }, {});
    }

    #list;
    #tail;
    #length;

    constructor(...args) {
        this.#list = {};
        this.#tail = this.#list;
        this.#length = 0;

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
            this.#tail = array.reduce((tail, value, i) => {
                if (i === 0) {
                    this.#increaseLength();
                    tail.value = value;
                    return tail;
                }

                this.#increaseLength();
                return tail.next = this.#createNewObj(value);
            }, this.#tail);

            return true;
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
        this.#increaseLength();
        const newObj = this.#createNewObj(value);

        let target = this.#list;
        let targetPrev = undefined;

        for (let i = 0; i < index; i += 1) {
            targetPrev = target;
            target = target.next;
        }

        targetPrev.next = newObj;
        newObj.next = target;

        return true;
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
        while (target.next?.next !== undefined) target = target.next;

        const result = target.next || target;
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
                if (target.next === undefined) this.#tail = targetPrev;
                targetPrev.next = target.next;
                delete target.next;
                this.#decreaseLength();

                return target;
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

        if (target.next === undefined) this.#tail = targetPrev;
        targetPrev.next = target.next;
        delete target.next;
        this.#decreaseLength();

        return target;
    }

    get() { }

    set() { }

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

    indexOf() { }

    contains() { }

    toArray() { }

    print() {
        console.log(`\nArrayList - length: ${this.size}`);

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

console.log('\n----list----');

list.removeValue(2);
list.print();

const removeList = new ArrayList([1, 2, 3]);
removeList.print();

console.log('remove1: ', removeList.removeFirst());
removeList.print();
removeList.add(10, 100);
removeList.print();
console.log('remove2: ', removeList.removeLast());
removeList.print();
console.log('remove3: ', removeList.removeLast());
removeList.print();
console.log('remove4: ', removeList.removeLast());
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

// const alist = new ArrayList([1, 2]);
// alist.print(); // { value: 1, next: { value: 2 } }

// alist.add(3);
// alist.print(); // { value: 1, next: { value: 2, next: { value: 3 } } }
// alist.add(5, 1);
// alist.print(); // { value: 1, next: { value: 5, next: { value: 2, next: { value: 3 } }}
// alist.remove(2);  // { value: 1, next: { value: 3 } }
// alist.add(22, 1); // { value: 1, next: { value: 22, next: { value: 3 } } }
// alist.add(33, 1);
// alist.print(); // ArrayList(4) { value: 1, next: { value: 33, next: { value: 22, next: { value: 3 } } } }
// alist.set(1, 300);  // { value: 1, next: { value: 300, next: { value: 22, next: { value: 3 } } } }
// alist.get(2); // 22
// alist.size;  // 4
// alist.indexOf(300);  // 1
// alist.contains(300); // true
// alist.contains(301);  // false
// alist.isEmpty; // false
// alist.peek;  // 3
// alist.toArray();  // [1, 300, 22, 3]
// alist.iterator().next();  // { value: 1, done: false }
// alist.clear();  // all clear