// 1, 1, 2, 3, 5, 8, 13, 21, ...
function fibonacciRecursive(fibonacci: number): number {
    if (fibonacci <= 1) return fibonacci;
    return fibonacciRecursive(fibonacci - 1) + fibonacciRecursive(fibonacci - 2);
}

console.log(fibonacciRecursive(6));
console.log(fibonacciRecursive(5));
console.log(fibonacciRecursive(4));

function fibonacciLoop(fibonacci: number) {
    if (fibonacci <= 2) return 1;

    let result = 1;
    let previousResult = 1;

    for (let i = 2; i < fibonacci; i += 1) {
        result += previousResult;
        previousResult = result - previousResult;
    }

    return result;
}

console.log(fibonacciLoop(6));
console.log(fibonacciLoop(5));
console.log(fibonacciLoop(4));


function fibonacciMemo() {
    /**
     * cache와 같이 동적으로 속성이 추가 되어야 하는 경우
     * 객체 리터럴 - 인덱스 시그니처 보다 map을 사용하는 게 더 안전하다.
     * 
     * 성능 상의 이점도 있고, |undefined 가능성에 대해서도 확인하기 때문이다.
     * 물론 ??(널 병합 연산자)를 사용하면 undefined에 대해서 안정성을 확보할 수 있다.
     * 
     * 객체 리터럴과 Map, 성능 상에 어떤 차이가 있을까?!
     */
    // const cache: { [fibo: number]: number } = {};

    const cache = new Map<number, number>();

    function recursive(num: number): number {
        if (num <= 1) return num;
        return cache.get(num) ??
            cache.set(num, recursive(num - 1) + recursive(num - 2)), cache.get(num)!;
        /**
         * non-null assertion을 사용한 이유는 절대 undefined가 아닐거라고 확신하기 때문이다.
         * 이유는 이전에 num에 대해서 set하고 있다. 즉 넣은 값을 바로 꺼내 사용하기 때문에
         * undefined가 아님을 확신할 수 있고, 이를 통해 로직이 깔끔해진다.
         * 
         * , 연산자는 가장 우측에 있는 값이 반환된다. 즉, set의 결과는 무시되고
         * get()의 반환 값이 반환 된다.
         */
    }
    return recursive;
}

const fiboMemo = fibonacciMemo();
console.log(fiboMemo(6));
console.log(fiboMemo(5));
console.log(fiboMemo(4));

console.time('recur');
console.log('recur: ' + fibonacciRecursive(40));
console.timeEnd('recur');

console.time('loop');
console.log('loop: ' + fibonacciLoop(40));
console.timeEnd('loop');

console.time('memo');
console.log('memo: ' + fiboMemo(40));
console.timeEnd('memo');