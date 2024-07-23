const arr = [];
for (let i = 1; i < 10; i += 1) {
    arr.push(i);
}
console.log(arr);

const arrMap = [...Array(10).keys()].map(((e) => e + 1));
console.log(arr);

const arrA = Array.from({ length: 100000 }, (_, i) => i + Math.round((Math.random() * 1000) + 100));
const arrB = Array.from({ length: 100000 }, (_, i) => i + Math.round((Math.random() * 1000) + 100));

/**
 * 배열의 중복 제거 (new Set(인자로 배열 제공)) - 3ms
 * 
 * 이 경우 has 했을 때 비교해야 하는 크기도 줄어든다.
 * 중복이 제거되었기 때문에 10만개 전부 비교하지 않고,
 * 또, 중간에 같은 게 있다면 멈추기 때문이다.
 * 
 * arrA에 대해서는 전부 돌아야 하긴 한다. 
 */
console.time('set');
const setB = new Set(arrB);
console.log(arrA.filter((aE) => setB.has(aE)));
console.timeEnd('set');

// 500배 느리다. 완전하게 n^2으로 동작하는 것은 상상이상으로 느리다.
// 근데 이렇게 차이가 날 수 있나, 결국 중간에 멈추는 코드도 있는데.
const arrRet = [];
console.time('loop');
for (let i = 0; i < arrA.length; i += 1) {
    const cur = arrA[i];
    for (let j = 0; j < arrB.length; j += 1) {
        if (cur === arrB[j]) {
            arrRet.push(cur);
            break;
        }
    }
}
console.timeEnd('loop');
console.log(arrRet);