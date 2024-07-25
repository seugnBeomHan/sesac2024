import assert from 'assert/strict';

const promiseAll = (promiseArr) => {
    const ret = [];
    let count = 0;

    return new Promise((res, rej) => {
        promiseArr.forEach((promise, i) => {
            if (promise.constructor.name === 'Promise') {
                promise.then((val) => {
                    ret[i] = val;
                    count += 1;
                    if (promiseArr.length === count) res(ret);
                })
                    .catch((err) => { rej(err); });
            } else {
                ret[i] = promise;
                count += 1;
            }
        });
    });
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