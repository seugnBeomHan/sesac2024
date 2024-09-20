import assert from 'assert/strict';

const promiseAll = async (promiseArr) => {
    for (const promise of promiseArr) {
        if (promise.constructor.name === 'Promise') {
            promise.then((val) => val).catch((err) => err);
        }
    }

    const ret = [];
    let index = 0;

    for (const promise of promiseArr) {
        ret[index++] = await promise;
    }

    return ret;
};

const vals = [1, 2, 3];
const randTime = (val) =>
    new Promise((resolve) => setTimeout(resolve, val * 1000, val));

promiseAll([randTime(1), randTime(2), randTime(3)])
    .then((arr) => { console.log(arr), assert.deepStrictEqual(arr, vals); })
    .catch(console.error);

promiseAll([10, 20, 30, randTime(1), Promise.resolve(100)])
    .then((arr) => { console.log(arr) })
    .catch(console.error);

promiseAll([randTime(3), Promise.reject('ERROR'), randTime(5)])
    .then((arr) => { console.log('여긴 과연 호출될까?!', arr); })
    .catch((err) => { console.log('reject!!!!!!:', err); });

console.log('메인 스택 종료');