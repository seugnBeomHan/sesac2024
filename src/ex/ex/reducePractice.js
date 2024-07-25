import assert from 'node:assert/strict';

// 1. 평균 구하기
const prices = [1000, 2050, 2200, 5000, 6500, 8000, 3400, 1500];
assert.deepStrictEqual(prices.reduce((acc, cur, i) => {
    acc += cur;
    if (i === prices.length - 1) {
        return acc / prices.length;
    }
    return acc;
}, 0), 3706.25);

// 2. 모든 배열 원소 * 2 한 새로운 배열 반환(map 사용과 동일)
assert.deepStrictEqual(prices.reduce((acc, cur) => {
    return [...acc, cur * 2];
}, []), [
    2000, 4100,
    4400, 10000,
    13000, 16000,
    6800, 3000
]);

// 3. 2번 과정 중 3,000 이상만 * 2 진행
assert.deepStrictEqual(prices.reduce((acc, cur) => {
    if (cur > 3000) return [...acc, cur * 2];
    return [...acc, cur];
}, []), [
    1000, 2050,
    2200, 10000,
    13000, 16000,
    6800, 1500
]);

// 4. 아래 배열에서 각 중복 되는 요소 count
const fruitBasket = [
    'banana',
    'cherry',
    'orange',
    'apple',
    'cherry',
    'orange',
    'apple',
    'banana',
    'cherry',
    'orange',
    'fig'
];
assert.deepStrictEqual(fruitBasket.reduce((acc, cur) => {
    acc[cur] = (acc[cur] || 0) + 1;
    return acc;
}, {}), { banana: 2, cherry: 3, orange: 3, apple: 2, fig: 1 });

// 4. 배열 flat 하게 만들기
const nestedArray = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
assert.deepStrictEqual(nestedArray.reduce((acc, cur) => {
    return [...acc, ...cur];
}, []), [
    1, 2, 3, 4, 5,
    6, 7, 8, 9
]);

// 5. n중 중첩 (reduce + 외부 메서드(외부 메서드가 필요한 이유는?))
const deepNestedArray = [[1, 2, [1, 2, 3, [1, 2, 3, 4, 5]]],
[4, [1, 2, 3, 4, [1, 2, [1, [1, 2, 3, 4], 3, 4], 4]], 6],
[[1, 2, 3, 4, [1, 2, [1]]], 8, 9]];

const flat = (arr) => {
    const ret = [];

    for (const e of arr) {
        if (Array.isArray(e)) {
            ret.push(...flat(e));
            continue;
        }
        ret.push(e);
    }
    return ret;
};

assert.deepStrictEqual(deepNestedArray.reduce((acc, cur) => {
    return [...acc, ...flat(cur)];
}, []), [
    1, 2, 1, 2, 3, 1, 2, 3, 4,
    5, 4, 1, 2, 3, 4, 1, 2, 1,
    1, 2, 3, 4, 3, 4, 4, 6, 1,
    2, 3, 4, 1, 2, 1, 8, 9
]);

// 6. colors.c 배열의 색상 값만 배열에 담기
const colors = [
    { a: 'happy', b: 'robin', c: ['blue', 'green'] },
    { a: 'tired', b: 'panther', c: ['green', 'black', 'orange', 'blue'] },
    { a: 'sad', b: 'goldfish', c: ['green', 'red'] }
];
assert.deepStrictEqual(colors.reduce((acc, cur) => {
    return [...acc, ...cur.c];
}, []), [
    'blue', 'green',
    'green', 'black',
    'orange', 'blue',
    'green', 'red'
]);

// 7. 6번 문제의 색상 중복 제거하기
assert.deepStrictEqual(colors.reduce((acc, cur) => {
    cur.c.forEach((color) => {
        if (acc.indexOf(color) === -1) {
            acc.push(color);
        }
    });
    return acc;
}, []), ['blue', 'green', 'black', 'orange', 'red']);

// 8. 양수의 합 구하기
let input = [1, -4, 12, 0, -3, 29, -150];
assert.deepStrictEqual(input.reduce((acc, cur) => {
    return cur > 0 ? acc += cur : acc;
}, 0), 42);

// 9. 이름 이니셜 가져오기
input = "George Raymond Richard Martin";

function getInitial(str) {
    return str.split(' ').reduce((acc, cur) => {
        return acc += cur[0];
    }, '');
}

assert.deepStrictEqual(getInitial(input), 'GRRM');

// 10. 가족 구성원 중 가장 나이가 어린 사람과 많은 사람의 나이와 차 출력하기
input = [
    {
        name: "John",
        age: 13,
    },
    {
        name: "Mark",
        age: 56,
    },
    {
        name: "Rachel",
        age: 45,
    },
    {
        name: "Nate",
        age: 67,
    },
    {
        name: "Jennifer",
        age: 65,
    },
];

assert.deepStrictEqual(input.reduce((acc, cur, i) => {
    if (i === input.length - 1) {
        acc.push(acc[1] - acc[0]);
        return acc;
    }

    if (i === 0) {
        acc.push(cur.age, cur.age);
        return acc;
    }

    if (acc[0] > cur.age) {
        acc[0] = cur.age;
        return acc;
    }

    if (acc[1] < cur.age) {
        acc[1] = cur.age;
        return acc;
    }
    return acc;
}, []), [13, 67, 54]);

/**
 * 11. 문장 줄이기
 * 
 * 1. 4글자 이상 단어는 무조건 줄일 것
 * 2. 첫 글자와 마지막 글자를 취하고, 사이 글자 수를 세 숫자로 표현할 것
 * ex) kubernetes = k8s
 * 3. 쉼표나, 온점은 없으며, 하나의 string 문장으로 출력
 */
input = "Every developer likes to mix kubernetes and javascript";
assert.deepStrictEqual(input.split(' ').reduce((acc, cur, i, thisArg) => {
    if (cur.length < 4) return acc += cur + (i !== thisArg.length - 1 ? ' ' : '');
    return acc += cur[0] + (cur.length - 2) + cur[cur.length - 1] + (i !== thisArg.length - 1 ? ' ' : '');
}, ''), "E3y d7r l3s to mix k8s and j8t");

// 12. 평균 성적이 가장 우수한 학생 구하기
const students = [
    { name: "Alice", scores: [90, 85, 92] },
    { name: "Bob", scores: [75, 80, 85] },
    { name: "Charlie", scores: [90, 95, 85] },
    { name: "Jack", scores: [100, 100, 100] }
];
assert.deepStrictEqual(students.reduce((acc, cur, i) => {
    const avg = cur.scores.reduce((acc, cur) => {
        return acc += cur;
    }) / cur.scores.length;

    if (i === 0) {
        acc.push({ name: cur.name, average: avg });
        return acc;
    }

    if (acc[0].average < avg) {
        acc[0] = { name: cur.name, average: avg };
        return acc;
    }
    return acc;

}, []), [{ name: 'Jack', average: 100 }]);

/**
 * 13. 고가 제품 카테고리 반환하기
 * 
 * 1. 평균 price가 50넘는 제품 카테고리와 평균 가격 출력
 */
const products = [
    { name: "Product 1", price: 20, category: "Electronics" },
    { name: "Product 2", price: 30, category: "Clothes" },
    { name: "Product 3", price: 40, category: "Electronics" },
    { name: "Product 4", price: 50, category: "Clothes" },
    { name: "Product 5", price: 60, category: "Clothes" },
    { name: "Product 6", price: 70, category: "Electronics" },
    { name: "Product 7", price: 80, category: "Clothes" },
    { name: "Product 8", price: 90, category: "Electronics" },
];
assert.deepStrictEqual(products.reduce((acc, cur) => {
    
}, []), [
    { category: 'Clothes', average: 55 },
    { category: 'Electronics', average: 55 }
]);

// 14. 평균 급여가 65000이 넘는 부서만 출력
const employees = [
    { name: "John", salary: 50000, department: "IT" },
    { name: "Jane", salary: 60000, department: "HR" },
    { name: "Bob", salary: 55000, department: "IT" },
    { name: "Sophie", salary: 75000, department: "HR" },
    { name: "Mike", salary: 65000, department: "IT" },
    { name: "Emily", salary: 80000, department: "HR" },
    { name: "David", salary: 70000, department: "IT" },
];
assert.deepStrictEqual(employees.reduce(/** 여기 구현 */), [
    { department: 'HR', average: 71666 }
]);

// 15. 투표한 사람 카운트
function totalVotes(arr) {
    // your code here    
}

var voters = [
    { name: 'Bob', age: 30, voted: true },
    { name: 'Jake', age: 32, voted: true },
    { name: 'Kate', age: 25, voted: false },
    { name: 'Sam', age: 20, voted: false },
    { name: 'Phil', age: 21, voted: true },
    { name: 'Ed', age: 55, voted: true },
    { name: 'Tami', age: 54, voted: true },
    { name: 'Mary', age: 31, voted: false },
    { name: 'Becky', age: 43, voted: false },
    { name: 'Joey', age: 41, voted: true },
    { name: 'Jeff', age: 30, voted: true },
    { name: 'Zack', age: 19, voted: false }
];
assert.deepStrictEqual(totalVotes(voters), 7);

// 16. 위시리스트에 있는 모든 상품을 구매하는데 드는 금액
function shoppingSpree(arr) {
    // your code here    
}

var wishlist = [
    { title: "Tesla Model S", price: 90000 },
    { title: "4 carat diamond ring", price: 45000 },
    { title: "Fancy hacky Sack", price: 5 },
    { title: "Gold fidgit spinner", price: 2000 },
    { title: "A second Tesla Model S", price: 90000 }
];
assert.deepStrictEqual(shoppingSpree(wishlist), 227005);