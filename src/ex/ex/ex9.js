function f() {
    console.log(this);
}

let user = {
    g: f.bind(null) // 한 번 바인딩 된 함수는 이후 바뀌지 않는다. 바인딩 된 this로 계속 유지된다.
};

user.g();

/**
 * bind()로 함수를 호출하면, bound(묶인 함수) 함수가 반환 된다.
 * 해당 함수는 기존 함수와는 다른 함수 오브젝트이다.
 * 
 * 생성되는 시점의 this만 기억하고 있으며, 재할당이 불가능하다.
 * 즉, 다시 bind를 하거나, 객체 링크 연산자를 통해 메서드로 호출은 하지만
 * 한 번 bind 된 this가 바뀌지는 않는다.
 */
function ff() {
    console.log(this.name);
}

ff = f.bind({ name: "John" }).bind({ name: "Ann" });
ff();

function sayHi() {
    console.log(this.name);
}
sayHi.test = 5; // 함수 오브젝트에 test 프로퍼티 추가, test: 5 형태로 저장

let bound = sayHi.bind({
    name: "John"
});

/**
 * bound 함수는 bind 함수를 통해 생성 된 완전히 새로운 함수 객체이다.
 * 그렇기에 기존 함수가 가지고 있던 프로퍼티는 가지지 않는다.
 * 해서 test 프로퍼티로 접근하면 존재하지 않는 프로퍼티기에 undefined가 출력된다.
*/
console.log(bound.test);

function askPassword(ok, fail) {
    let password = 'rockstar'
    if (password === "rockstar") {
        ok();
    } else {
        fail();
    }
}

let user2 = {
    name: 'John',

    loginOk() {
        console.log(`${this.name}님이 로그인하였습니다.`);
    },

    loginFail() {
        console.log(`${this.name}님이 로그인에 실패하였습니다.`);
    },
};

/**
 * 아래 코드는 에러가 발생한다. 
 * askPassword(user2.loginOk, user2.loginFail);
 * 
 * 이유는 this는 함수를 호출하는 시점에 결정되는데
 * 해당 함수가 호출 되는 시점엔 메서드가 아닌 함수로 호출된다.
 * 
 * 그렇기 때문에 this는 undefined를 가르키게 되고,
 * undefined.name을 하다 보니 에러가 발생하게 되는 것이다.
 * 
 * this 바인딩의 경우 동적바인딩이기 때문에 실행 시점에 결정된다.
 * 해서 항상 함수를 호출하는 시점에, 함수가 invoke 되는 시점에
 * 주체가 누군지를 확인해야 한다.
 * 
 * 메서드 역시 함수 오브젝트이다보니 다른 변수에 할당할 수 있지만
 * 이렇게 할당 된 함수가 호출되는 시점에 this는 해당 객체가 아니다.
 * 해서 메서드에서 this를 사용하는 경우, 예외가 발생할 수 있다.
 * undefined 세팅이 되기에.
 * 
 * 해서 문제를 해결한 코드는 아래와 같다.
 */
askPassword(user2.loginOk.bind(user2), user2.loginFail.bind(user2));

function askPassword2(ok, fail) {
    let password = 'rockstar';
    if (password === "rockstar") ok();
    else fail();
}

let user3 = {
    name: 'John',

    login(result) {
        console.log(this.name + (result ? ' 로그인 성공' : ' 로그인 실패'));
    }
};

// 핵심은 함수 오프젝트를 넘기는 것이며, 실행 시점에 user3 객체로부터 login 함수를 호출하면 된다.
askPassword2(user3.login.bind(user3, true), user3.login.bind(user3, false));
askPassword2(() => user3.login(true), () => user.login(false));
askPassword2(function () { user3.login(true) }, function () { user3.login(false) });

/**
 * 화살표 함수는 bind로 this 바인딩을 해도 바인딩 되지 않는다.
 * 내부적으로 this를 가지지 않기 때문에 바인딩 될 this가 없다.
 * 해서 원래 동작대로 상위 스코프의 this를 참조하게 된다.
 */
// const arrowFunc = () => {
//     console.log(this.name);
// }
// arrowFunc.bind(user3)();

