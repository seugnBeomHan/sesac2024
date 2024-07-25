import assert from 'assert/strict';

const promiseAll = async (promiseArr) => {
    async function* generater() {
        for (let i = 0; i < promiseArr.length; i += 1) {
            yield await promiseArr[i];
        }
    }

    for (const promise of promiseArr) {
        if (promise.constructor.name === 'Promise') {
            promise.catch((err) => err);
        }
    };

    const iter = generater();
    const ret = [];

    while (true) {
        const { value, done } = await iter.next();
        if (done) return ret;
        ret.push(value);
    }
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