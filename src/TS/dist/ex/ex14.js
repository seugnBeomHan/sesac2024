import assert from 'assert/strict';
import { Collection } from './ex12.js';
class ArrayList extends Collection {
    static arrayToList(array) {
        let curValue = array[array.length - 1];
        if (!curValue)
            return {};
        let node = { value: curValue };
        for (let i = array.length - 2; i > -1; i -= 1) {
            curValue = array[i];
            if (!curValue)
                continue;
            node = { value: curValue, next: node };
        }
        return node;
    }
    static listToArray(list) {
        const ret = [];
        let node = list;
        do {
            ret.push(node.value);
        } while ((node = node.next) !== undefined);
        return ret;
    }
    constructor(...values) {
        super(...values);
    }
    add(value, index = this.size()) {
        this.array.splice(index, 0, value);
        return this;
    }
    removeFirst() {
        return this.array.shift();
    }
    removeLast() {
        return this.array.splice(this.size() - 1, 1)[0];
    }
    removeIndex(targetIndex) {
        return this.array.splice(targetIndex, 1)[0];
    }
    removeValue(targetValue) {
        const targetIndex = this.array.indexOf(targetValue);
        return this.removeIndex(targetIndex);
    }
    get(index) {
        return this.array[index];
    }
    set(index, value) {
        this.array[index] = value;
        return this;
    }
    indexOf(value) {
        return this.array.indexOf(value);
    }
    contains(value) {
        return this.array.includes(value);
    }
    peek() {
        return this.array[0];
    }
    print() {
        console.log(ArrayList.arrayToList(this.array));
    }
    [Symbol.iterator]() {
        const array = this.array;
        let index = 0;
        return {
            next() {
                return {
                    value: array[index++],
                    done: index > array.length
                };
            }
        };
    }
}
const list = new ArrayList(...[1, 2, 3, 4, 5]);
console.log(ArrayList.arrayToList(list.toArray()));
const arrayToList = ArrayList.arrayToList(list.toArray());
if ('value' in arrayToList) {
    console.log(ArrayList.listToArray(arrayToList));
}
list.print();
list.add(10);
list.add(100, 0);
list.add(30, 1);
list.add(40, 1);
list.add(50, 1);
list.print();
assert.deepStrictEqual(list.size(), 10);
assert.deepStrictEqual(list.removeFirst(), 100);
assert.deepStrictEqual(list.size(), 9);
list.print();
assert.deepStrictEqual(list.removeLast(), 10);
assert.deepStrictEqual(list.size(), 8);
list.print();
console.log('\n----list----');
list.removeValue(2);
list.print();
const removeList = new ArrayList(...[1, 2, 3]);
removeList.print();
assert.deepStrictEqual(removeList.removeFirst(), 1);
removeList.print();
removeList.add(10, 100);
removeList.print();
assert.deepStrictEqual(removeList.removeLast(), 10);
removeList.print();
assert.deepStrictEqual(removeList.removeLast(), 3);
removeList.print();
assert.deepStrictEqual(removeList.removeLast(), 2);
removeList.print();
removeList.add(10);
removeList.add(20);
removeList.add(30);
removeList.print();
assert.deepStrictEqual(removeList.removeLast(), 30);
assert.deepStrictEqual(removeList.removeLast(), 20);
removeList.print();
removeList.add(100, 0);
removeList.add(200, 1);
removeList.print();
assert.deepStrictEqual(removeList.removeLast(), 10);
removeList.print();
assert.deepStrictEqual(removeList.removeValue(100), 100);
removeList.print();
assert.deepStrictEqual(removeList.removeValue(200), 200);
removeList.print();
removeList.add(1);
removeList.add(2);
removeList.add(3);
removeList.add(4);
removeList.add(5);
removeList.print();
assert.deepStrictEqual(removeList.removeValue(4), 4);
removeList.print();
assert.deepStrictEqual(removeList.removeValue(5), 5);
removeList.print();
assert.deepStrictEqual(removeList.removeValue(1), 1);
removeList.print();
removeList.add(1);
removeList.add(2);
removeList.add(3);
removeList.add(4);
removeList.add(5);
removeList.print();
assert.deepStrictEqual(removeList.removeIndex(2), 1);
assert.deepStrictEqual(removeList.removeIndex(2), 2);
assert.deepStrictEqual(removeList.removeIndex(2), 3);
assert.deepStrictEqual(removeList.removeIndex(2), 4);
removeList.print();
removeList.add(1);
removeList.add(2);
removeList.add(3);
removeList.add(4);
removeList.add(5);
removeList.print();
assert.deepStrictEqual(removeList.toArray(), [2, 3, 5, 1, 2, 3, 4, 5]);
assert.deepStrictEqual(removeList.get(0), 2);
assert.deepStrictEqual(removeList.get(1), 3);
assert.deepStrictEqual(removeList.get(2), 5);
assert.deepStrictEqual(removeList.get(removeList.size()), undefined);
assert.deepStrictEqual(removeList.get(removeList.size() - 1), 5);
removeList.set(0, 100);
assert.deepStrictEqual(removeList.toArray(), [100, 3, 5, 1, 2, 3, 4, 5]);
removeList.set(0, 200);
removeList.set(1, 300);
removeList.set(2, 400);
removeList.set(3, 500);
assert.deepStrictEqual(removeList.toArray(), [200, 300, 400, 500, 2, 3, 4, 5]);
removeList.set(removeList.size(), 1000);
assert.deepStrictEqual(removeList.toArray(), [200, 300, 400, 500, 2, 3, 4, 5, 1000]);
removeList.set(removeList.size() - 1, 2000);
assert.deepStrictEqual(removeList.toArray(), [200, 300, 400, 500, 2, 3, 4, 5, 2000]);
removeList.print();
assert.deepStrictEqual(removeList.indexOf(100), -1);
assert.deepStrictEqual(removeList.indexOf(200), 0);
assert.deepStrictEqual(removeList.indexOf(300), 1);
assert.deepStrictEqual(removeList.indexOf(2000), removeList.size() - 1);
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
assert.deepStrictEqual(iter.next(), { value: 5, done: false });
assert.deepStrictEqual(iter.next(), { value: 2000, done: false });
assert.deepStrictEqual(iter.next(), { value: undefined, done: true });
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
