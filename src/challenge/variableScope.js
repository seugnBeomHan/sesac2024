// 0, 1, 2, 3, 4
// for (let i = 0; i < 5; i += 1) {
//     setTimeout(() => { console.log(i); });
// }

/**
 * let i;
 * i = 0;
 * 
 * let i = 0;
 * ;
 * 
 * 위 둘은 동일한 결과다. 결국 선언 위치에 따라 스코프가 결정된다.
 * 5, 5, 5, 5, 5 
*/
// let i;
// for (i = 0; i < 5; i += 1) {
//     setTimeout(() => { console.log(i); });
// }

// var 일 때, let 일때, 변수 선언 시점에 따라 스코프 확인 및 결과 확인

/**
 * 이렇게 되면
 * 최초 진입 시 i 변수 선언 후 조건 비교문 진행 후 함수 실행 - i = 0
 * i에 대한 증감식 실행 > 조건 비교문 진행 후 다시 함수 실행 - i = 1
 * i에 대한 증감식 실행 > 조건 비교문 진행 후 다시 함수 실행 - i = 2
 * i에 대한 증감식 실행 > 조건 비교문 진행 후 다시 함수 실행 - i = 3
 * i에 대한 증감식 실행 > 조건 비교문 진행 후 다시 함수 실행 - i = 4
 * 
 * 이때 i는 매번 선언되지 않는데, 값을 가지고 온다.
 * 최초 생성 된 블럭 이후 생성되는 블럭들은 최초 블럭을 참조하는건가?
 * 
 * 최초 생성 된 블럭은 for 문이 끝나기 전까지 유지된다.
 * 
 * 아니면 for문 블럭은 하나만 생성되고, i 값만 변경된다
 * > 하지만 이 경우 setTimeout에 넘어가는 콜백함수에서 참조하는
 *   i에 대한 클로저 현상이 설명이 안된다.
 * 
 * 클로저는 자신이 선언 된 스코프를 참조하며, 각각 다른 i에 대한
 * 값을 가지고 있다는 것은 서로 다른 블럭을 참조하고 있다는 것이다.
 * 
 * 그렇기 때문에 블럭은 각각 생성된다. 
 */


// function f() {
//     const arr = [];
//     for (let i = 0; i < 5; i += 1) {
//         arr[i] = i;
//     }
// }
// f();


{
    let ii = 0;
    if (ii < 5) {
        let i = ii;
        setTimeout(() => { console.log(i); });
        ii += 1;
    }

    if (ii < 5) {
        let i = ii;
        setTimeout(() => { console.log(i); });
        ii += 1;
    }

    if (ii < 5) {
        let i = ii;
        setTimeout(() => { console.log(i); });
        ii += 1;
    }

    if (ii < 5) {
        let i = ii;
        setTimeout(() => { console.log(i); });
        ii += 1;
    }

    if (ii < 5) {
        let i = ii;
        setTimeout(() => { console.log(i); });
        ii += 1;
    }

    if (ii < 5) {
        let i = ii;
        setTimeout(() => { console.log(i); });
        ii += 1;
    }
}