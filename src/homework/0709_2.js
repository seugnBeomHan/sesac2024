const vals = [1, 2, 3];
const randTime = val =>
    new Promise(resolve => setTimeout(resolve, Math.random() * 1000, val));

promiseAll([randTime(1), randTime(2), randTime(3)]).then(arr => {
    console.table(arr);
    assert.deepStrictEqual(arr, vals);
}).catch(console.error);

promiseAll([randTime(11), Promise.reject('RRR'), randTime(33)])
    .then(array => {
        console.log('여긴 과연 호출될까?!');
    })
    .catch(error => {
        console.log('reject!!!!!!>>', error);
    });
