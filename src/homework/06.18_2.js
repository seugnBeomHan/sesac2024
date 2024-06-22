// 배열을 객체로 만드시오.
const arr = [['A', 10, 20], ['B', 30, 40], ['C', 50, 60, 70]];

const makeObjectFromArray = arr => {
    const res = {};

    for (let [idx, ...obj] of arr) {
        res[idx] = obj
    }
    return res;
};

const makeArrayFromObject = obj => {
    const res = [];
    for (let [key, rest] of Object.entries(obj)) {
        res.push([key, ...rest]);
    }
    return res;
};

const obj = makeObjectFromArray(arr);
console.log(obj);
console.log(makeArrayFromObject(obj));
