// // 1, 1, 2, 3, 5, 8, 13, 21, ...

// const fibo = runCount => {
//     if (runCount <= 1) {
//         return runCount;
//     }
//     return fibo(runCount - 1) + fibo(runCount - 2);
// }

// /**
//  * inner 익명 함수는 자신이 선언 된 환경인 runTimeChecker 함수의 매개변수인 func를 참조한다.
//  * 내부적으로 호출 하고 있으며, inner 익명 함수는 반환 되어 참조되기 때문에 해당 func 매개변수는 클로저가 된다.
//  *
//  * runTimeChecker 함수는 데코레이터 함수로 기존 fibo 함수에 실행 시간을 확인할 수 있는 기능을
//  * 기존 함수를 변경하지 않고 추가했다.
//  */
// const runTimeChecker = func => {
//     return runCount => {
//         let res = 0;
//         console.time('run time');
//         res = func(runCount);
//         console.timeEnd('run time');
//         return res;
//     }
// }
// const fiboTimeChecker = runTimeChecker(fibo);
// console.log('fibinaci: ' + fiboTimeChecker(40));

/**
 * 만약 fibo 함수가 객체 안에 메서드라면 위 코드는 동작하지 않는다.
 * 이땐 콜 포워딩을 진행해 주어야 한다.
 */

const fiboObj = {
    fibo(runCount) {
        if (runCount <= 1) {
            return runCount;
        }
        return this.fibo(runCount - 1) + this.fibo(runCount - 2);
    }
};


/**
 * runTimeChecker는 함수이기 때문에 데코레이팅 된 함수만 반환한다.
 * 몇 번 호출 됐는지 카운팅 하려면 객체가 되어야 한다.
 */
// const runTimeChecker = func => {
//     return runCount => {
//         let res = 0;
//         console.time('run time');
//         res = func.call(fiboObj, runCount);
//         console.timeEnd('run time');
//         return res;
//     }
// }; // 이는 함수 표현식이고, 식의 특징은 특정 값으로 치환 가능, ;을 붙여 주는 게 좋다.

const runTimeCheckerObj = (() => {
    let runCount = 0;

    const increase = () => {
        runCount += 1;
    }

    return {
        getRunTimeChecker(context, func) {
            return runCount => {
                increase();
                let res = 0;
                func = func.bind(context);
                console.time('run time');
                res = func(runCount);
                console.timeEnd('run time');
                return res;
            }
        },
        getRunrunCount() {
            return runCount;
        }
    }
})(); // 이렇게 하면 하나의 객체만 생성할 수 있다. 익명 즉시 실행 함수이기 때문에

// 만약 여러개의 인스턴스를 생성하고 싶다면 이를 함수로 만들면 된다. 즉시 실행 되지 않게 하면 된다.
const runTimeCheckerConstructor = () => {
    let runCount = 0;

    const increase = () => {
        runCount += 1;
    }

    return {
        getRunTimeChecker(context, func, ...args) {
            return (() => {
                increase();
                let res = 0;
                func = func.bind(context);
                console.time('run time');
                res = func(...args);
                console.timeEnd('run time');
                return res;
            })();
        },
        getRunrunCount() {
            return runCount;
        }
    }
};

/**
 * 이렇게 객체를 리턴하는 함수로 만들어 객체를 리턴하면 된다
 * 이 경우 모두 다른 객체이며, 힙에는 3개의 객체가 생성된다.
 * 이때 fiboDecoObj가 객체이기 때문에 데코레이터 적용 함수 반환 호출 > 실제 실행에 대한 호출을 해야 한다.
 * 
 * 이걸 더 범용성 있게 만들기 위해 getRunTimeChecker 함수 실행 시 필요한 매개변수를 받는다.
 * 이경우 인자를 넘겨주면 즉시실행해 결과만 반환한다.
 * 
 * 해서 어떤 함수든 넣어주면 되고, 실행하면 된다.
 */
const fiboDecoObj1 = runTimeCheckerConstructor();
const fiboDecoObj2 = runTimeCheckerConstructor();
const fiboDecoObj3 = runTimeCheckerConstructor();
console.log('obj compare: ' + fiboDecoObj1 === fiboDecoObj2 || fiboDecoObj2 === fiboDecoObj3 || fiboDecoObj1 === fiboDecoObj3); // 하나라도 같다면 true, 전부 다르면 false
for (let i = 0; i < 10; ++i) {
    console.log(fiboDecoObj1.getRunTimeChecker(fiboObj, fiboObj.fibo, 40)); // 객체 > 객체.데코레이터 적용 함수 반환 > 실제 함수 실행의 단계다. (이렇게 안해도 된다.)
}
console.log(fiboDecoObj1.getRunrunCount());