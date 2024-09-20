// 루트 씌웠을 때 나온 정수들로 나눴을 때 나머지가 0이 나오지 않으면 소수

const COUNT = 100;
const primes = [2];
let isPrime = true;

for (let i = 3; i < COUNT; i += 1) {
    const sqrt = Math.sqrt(i);
    for (let j = 2; j <= sqrt; j += 1) {
        console.log(j);
        if (i % j === 0) {
            isPrime = false;
            break;
        }
    }
    if (isPrime) {
        primes.push(i);
    } else {
        isPrime = true;
    }
}
console.log(primes);
console.log(primes.length);