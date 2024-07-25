var gVar = 1;
let bVar = 2;

function function1(x, y) {
    var gVar = 11;
    let bVar = 22;

    console.log('function1>', gVar, bVar, zVar, function2, function2.length); // 3
    function2('first'); // t,u,v 실행 (이 시점에 nested function2는 hoisting됐지만 <f.o>로 정의되지 않은 상태!) ← inner2

    {
        const xVar = 99; // function1 평가 시 xVar는 notInitializedYet(uninitialized) 상태로 block상단에 hoisting.
        let llVar = 0; // function2('nest-first'); 보다 아래쪽에 있었지만 let의 경우 TDZ에 포함되기 때문에 에러 발생, 해서 위쪽으로 이동 
        function2('nest-first'); // no error? which call function2(inner) or function2(nested) ?
        var zVar = 88;   // function1 평가 시 function1 상단에 undefined로 hoisting.

        function function2(t) {
            console.log(t, 'nested', xVar, zVar, llVar);
        }  // hoisting은 undefined로?!

        // hoisting되는 이유는 뒤에서 선언했는지 여부를 개발자에게 알려줘야 중복 선언 안함!
    }  // 평가시점에 function1 scope로 hoisting.

    function function2(t, u) {
        console.log(t, 'inner', xVar, zVar);
    }  // function1 평가 시 function1 상단에 <f.o>로 hoisting

    function function2(t, u, v) {
        console.log(t, 'inner2', xVar, zVar);
    } // hoisting 시, 위 라인의 function2를 덮어씀!

    var zVar = 800;
    function2('second');  // call 'nested'(파랑) & function2는 block을 closure!
}

function function2(g) {
    console.log(g, 'global function2>', gVar, bVar, xVar, kVar); // ?
}

let xVar = 9;

if (gVar > 0) {
    var kVar = 33;
    const yVar = 9; // 원래는 아래 if block scope에 있었지만 const 식별자의 경우 block 스코프이기 때문에 외부에서 참조 불가능하다.
    // 해서 참조할 수 있도록 참조 되는 코드보다 상단에 배치하여 에러를 해결했다.
}

function1(1, 2);

// console.log(kVar, yVar);  // ? yVar is not defined in global scope

// function2('third');  // global function2 실행
