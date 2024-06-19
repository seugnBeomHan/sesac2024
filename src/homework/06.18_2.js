// 배열을 객체로 만드시오.
const arr = [['A', 10, 20], ['B', 30, 40], ['C', 50, 60, 70]];

const makeObjectFromArray = arr => {
    const res = {};

    for (let val of arr) {
        const [name, ...rest] = val;
        res[name] = rest;
    }
    return res;
};

const makeArrayFromObject = obj => {
    const res = [];
    for (let key in obj) {
        res.push([key, ...obj[key]]);
    }
    return res;
};

const obj = makeObjectFromArray(arr);
console.log(obj);
console.log(makeArrayFromObject(obj));
