import assert from 'assert/strict';

const A = [1, 2, 3, 4, 5, 3];
const B = [1, 22, 3, 44, 5];
const C = [11, 222, 3, 4, 555];

// 교집합
const intersection = (setA, setB) => {
    return [...new Set(...setA, ...setB)];
};

// 차집합
const diff = (setA, setB) => {

};

// 합집합 
const union = (setA, setB) => {

};

assert.deepStrictEqual(intersection(A, B), [1, 3, 5]);