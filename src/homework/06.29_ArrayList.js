import assert from 'assert/strict';

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
            this.#tail = array.reduce((tail, value) => {
                if (tail.value === undefined) {
                    tail.value = value;

                    this.#increaseLength();
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

    get(index) {
        if (this.isEmpty()) return;
        if (this.size === 1 || index <= 0) return this.peek;

        index = index >= this.size ? this.size - 1 : index;

        let target = this.#list;
        for (let i = 0; i < index; i += 1, target = target.next);

        return target.value;
    }

    set(index, value) {
        if (this.isEmpty()) return;

        index = index >= this.size ?
            this.size - 1 :
            index < 0 ? 0 : index;

        let target = this.#list;
        for (let i = 0; i < index; i += 1, target = target.next);

        target.value = value;
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

        let target = this.#list;
        for (let i = 0; i < this.size; i += 1, target = target.next) {
            if (target.value === value) {
                return true;
            }
        }
        return false;
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

    #deleteMiddleElement(targetPrev, target) {
        if (target.next === undefined) this.#tail = targetPrev;
        targetPrev.next = target.next;
        delete target.next;

        this.#decreaseLength();
        return target;
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