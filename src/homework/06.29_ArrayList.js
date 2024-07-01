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
        }, {})
    }
}

assert.deepStrictEqual(ArrayList.listToArray({ value: 1, next: { value: 2, next: { value: 3 } } }), [1, 2, 3]);
assert.deepStrictEqual(ArrayList.arrayToList([1, 2, 3]), { value: 1, next: { value: 2, next: { value: 3 } } });

const alist = new ArrayList([1, 2]); // alist.toString() ⇒ { value: 1, next: { value: 2 } }
alist.add(3);     // { value: 1, next: { value: 2, next: { value: 3 } } }
alist.add(5, 1);  // { value: 1, next: { value: 5, next: { value: 2, next: { value: 3 } }}
alist.remove(2);  // { value: 1, next: { value: 3 } }
alist.add(22, 1); // { value: 1, next: { value: 22, next: { value: 3 } } }
alist.add(33, 1);
alist.print(); // ArrayList(4) { value: 1, next: { value: 33, next: { value: 22, next: { value: 3 } } } }
alist.set(1, 300);  // { value: 1, next: { value: 300, next: { value: 22, next: { value: 3 } } } }
alist.get(2); alist.size;  // 22, 4
alist.indexOf(300);  // 1
alist.contains(300); alist.contains(301);  // true, false
alist.isEmpty; alist.peek;  // false, 3
alist.toArray();  // [1, 300, 22, 3]
alist.iterator().next();  // { value: 1, done: false }
alist.clear();  // all clear