const user = Math.random() > 0.5 ?
    { name: 'han', age: 27 } :
    { name: 'beom', grade: 2 };
user; // < 이렇게 유추하는 이유는 뭘까?!
if ('age' in user) {
    console.log(user.age);
}
class Slacker {
    name;
    constructor(name) {
        this.name = name;
    }
    study(hour) {
        console.log(hour);
    }
}
let teamName;
// console.log(teamName?.length); // error! why??
teamName = 'blue';
console.log(teamName.length); // ok!
let headCoachName;
console.log(headCoachName?.length); // ok! why??
headCoachName = 'Han';
console.log(headCoachName.length); // ok!
const beginner = { nickName: 'beginagain', lv: 8 };
const warrior = { nickName: 'haha', position: 'warrior' };
const userHong = Math.random() > 0.5 ? beginner : warrior;
/**
 * 위와 같이 이미 정해진 경우 optional 없이 각각의 타입으로 유니언 타입 형성
const userHong: {
    nickName: string;
    lv: number;
} | {
    nickName: string;
    position: string;
}
 */
const character = Math.random() > 0.5 ?
    { nickName: 'beom', lv: 13 } :
    { nickName: 'seung', position: 'warrior' };
// 둘 다 접근 가능해야 함
character.lv;
character.position;
const myPet = Math.random() > 0.5 ?
    { name: 'navi', age: 3 } :
    { name: 'donggu', bark: false };
function ffff(A, B, C) {
    if (C !== undefined)
        return A + C;
    return A + Number(B);
}
// type sig = {
//     [index: number]: number | string | boolean;
//     name: number;
//     str: undefined;
//     [user: string]: symbol;
// };
class aaaa {
    name;
    constructor() {
        this.name = 'han';
    }
    hello() {
        console.log('hello');
    }
}
class Lesson {
    subject;
    constructor(subject) {
        this.subject = subject;
    }
}
class OnlineLesson extends Lesson {
    url;
    constructor(subject, url) {
        super(subject);
        this.url = url;
        this.subject = '';
    }
}
const aaaaInstance = new aaaa();
console.log(aaaaInstance);
console.log(aaaa);
let lesson;
lesson = new Lesson('coding');
lesson = new OnlineLesson('coding', 'orelly.com');
export {};
