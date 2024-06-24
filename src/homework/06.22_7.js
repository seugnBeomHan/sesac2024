import assert from 'node:assert/strict';

const range = (start, end = 0, interval) => {
    if (start === end) return [start];

    if (interval === undefined) {
        const arr = start === 0 || end === 0 ?
            new Array(Math.abs(start) + Math.abs(end) + 1) :
            new Array(Math.abs(start) + Math.abs(end) - 1);

        return [...arr].map((_, i) => {
            if (end < 0 && i !== 0) return -i;
            return i;
        });
    }
};

// 1
assert.deepStrictEqual(range(0, 0), [0]);
assert.deepStrictEqual(range(5, 5, -1), [5]);
assert.deepStrictEqual(range(5, 5), [5]);
assert.deepStrictEqual(range(0, 0, 5), [0]);
assert.deepStrictEqual(range(0), [0]);

// 2
assert.deepStrictEqual(range(0, -1), [0, -1]);
assert.deepStrictEqual(range(0, 5), [0, 1, 2, 3, 4, 5]);
assert.deepStrictEqual(range(0, -3), [0, -1, -2, -3]);

// 3
assert.deepStrictEqual(range(1, 10), [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]) // [1, 2, 3, 4,  5, 6, 7, 8, 9, 10]
assert.deepStrictEqual(range(10, 1), [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]) // [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]
assert.deepStrictEqual(range(-3, 0), [-3, -2, -1, 0]);     // [-3, -2, -1, 0]
assert.deepStrictEqual(range(5, 1), [5, 4, 3, 2, 1]);      // [5, 4, 3, 2, 1]


assert.deepStrictEqual(range(10, 1, -2), [10, 8, 6, 4, 2]) // [10, 8, 6, 4, 2]
assert.deepStrictEqual(range(0, -1, -5), [0]);
assert.deepStrictEqual(range(5, 5, 0), [5])     // [5]               
assert.deepStrictEqual(range(5, 1, 1), [])      // []                 
assert.deepStrictEqual(range(1, 5, -1), [])     // []                
assert.deepStrictEqual(range(1, 5, 6), [1])     // [1]               
assert.deepStrictEqual(range(2, 1, -5), [2])    // [2]         
assert.deepStrictEqual(range(1, 5, 0), [1]);    // [1]
assert.deepStrictEqual(range(1, 10, 1), [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]) // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
assert.deepStrictEqual(range(1, 10, 2), [1, 3, 5, 7, 9]) // [1, 3, 5, 7, 9]
assert.deepStrictEqual(range(5), [1, 2, 3, 4, 5]) // [1, 2, 3, 4, 5] 
assert.deepStrictEqual(range(-5), [-5, -4, -3, -2, -1]); // [-5, -4, -3, -2, -1]

const array100 = [...new Array(100)].map((_, i) => i + 1);
assert.deepStrictEqual(range(100), array100) // [1, 2, 3, 4, 5, …, 99, 100] 

