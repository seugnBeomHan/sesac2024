"use strict";
console.log('Hello TS');
console.log('replaceAll'.replaceAll('A', 'X'));
function add(num1, num2, num3) {
    if (num3)
        return num1 + num2 + num3;
    return num1 + num2;
}
console.log(add(1, 2));
console.log(add(1, 2, 3));
const isNumberInputAny = (input) => typeof input === 'number';
let numAndString = Math.random() > 0.5 ? 10 : 'han';
if (isNumberInputAny(numAndString)) {
    console.log(numAndString.constructor.name);
}
const tuple = [10, 20, '30'];
const namedTuple = ['han', 27];
const han = { name: 'han', age: 27 };
let seung = Math.random() < 0.5 ? 'name' : 'age';
console.log(han[seung]);
class aaa {
    id;
    constructor(id) {
        this.id = id;
        this.id = 10;
    }
}
let customer;
customer = {
    name: '홍길동',
    age: 26,
    addr: '용산구',
};
customer = {
    name: '홍길동',
    addr: '용산구',
    discountRate: 0.1,
};
/**
 * Customer 타입의 Member | Guest 중 어디에도 속하지 않기 때문
 */
// customer = {
//     name: '홍길동',
//     addr: '용산구',
// };
customer = {
    name: '홍길동',
    addr: '용산구',
    discountRate: 0.1,
    age: 26,
};
let guest = {
    name: 'han',
    age: 27,
};
let member = {
    name: 'beom',
    addr: 'Seoul',
    discountRate: 0.1
};
const who = Math.random() > 0.5 ? member : guest;
// let totalAmount: number;
// if (typeof who.spend !== 'number') {
//     totalAmount = who.spend.reduce((s, c) => s + c, 0);
//     who.discountRate;  // Error Property 'discountRate' does not exist on type 'Member | Guest'.
// } else {
//     totalAmount = who.spend;
// }
// // who.spend.reduce((s, c) => s + c, 0); // Error
// let gilding: false | string
let gildong = Math.random() > 0.5 && 'HongGilDong';
console.log(gildong);
if (gildong) {
    gildong.toUpperCase(); // string
}
else {
    gildong = 'han'; // false | string
}
const a = '';
// hong의 경우 freshness 상태의 객체 리터럴을 할당 하는데 초과속성으로 인해 에러
const hong = { id: 1, name: 'Hong', /** addr: 'Pusan' */ }; // ?
const lee = { id: 1, name: 'Lee', addr: 'Seoul' }; // OK
let tmpUser = lee; // OK - TUser
let partner = { ...lee, id: 2, name: 'Kim' }; // OK
let partner2 = { ...hong, id: 3, /** addr: 'Daejeon' */ }; // ?
let friend = { ...lee }; // OK
const xxx = { id: 9, addr: 'Sokcho' }; // {id: 9, addr: 'Sokcho'} 리터럴 타입, const이기 때문
/**
 * ...xxx만 있다면 에러가 발생한다. 구조적 타입 비교에서 필수 값의 부재이다.
 * 하지만 이는 freshness 에러는 아니다.
 * 왜, 이미 객체를 참조하는 식별자가 들어오면 freshness가 동작하지 않을까?
 * 즉, 메모리 주소를 참조해야 하는 상황에선 freshness가 꺼질까?
 */
let friend2 = { ...xxx, name: 'han' }; // 필수값 부재 error!
// const users: TUser[] = [{ id: 1, name: 'Hong', addr: 'seoul' }]; // freshness 에러
const users = [{ id: 1, name: 'Hong', addr: 'seoul' }, lee]; // 왜 될까?!
let 학교 = {
    score: [100, 97, 84],
    teacher: 'Phil',
    friend: 'john',
};
학교.score[4] = false;
학교.friend = ['Lee', 학교.teacher];
const logText = (text) => {
    console.log(text);
    return text;
};
const logResult = logText('han');
// const aa = logText(10); 
const ll = logText({ name: 'han', length: 10 });
const store = {
    // Error
    set(item) {
        // ...
    },
};
function addadd(num1) {
    const i = 'ha';
    let aa = i + num1;
    return aa;
}
console.log(addadd(5));
console.log(addadd(10));
function isArray(target) {
    return Array.isArray(target);
}
console.log(isArray([1, 2, 3, 4]));
console.log(isArray([1, 2, 3, '4']));
console.log(isArray([1, 2, true, '4']));
