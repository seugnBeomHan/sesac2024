const user = Math.random() > 0.5 ?
    { name: 'han', age: 27 } :
    { name: 'beom', grade: 2 };

user; // < 이렇게 유추하는 이유는 뭘까?!

if ('age' in user) {
    console.log(user.age);
}

interface Learner {
    name: string;
    study(hour: number): void;
}

class Slacker implements Learner {
    name;
    constructor(name: string) {
        this.name = name;
    }
    study(hour: number): void {
        console.log(hour);
    }
}

let teamName: string;
// console.log(teamName?.length); // error! why??

teamName = 'blue';
console.log(teamName.length); // ok!

let headCoachName: string | undefined;
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

/**
 * 아래와 같이 유추되는 이유
1. Math.random()의 결과는 런타임에 유추 가능
2. 그렇기에 character의 경우 nickName 뿐 아니라 lv, position 속성에도 접근 가능해야 함
3. 단, 고유 속성의 경우 optional 이기 때문에 접근 시 내로잉 강제, 안전하게 접근 가능
 */
/**
const character: {
    nickName: string;
    lv: number;
    position?: never;
} | {
    nickName: string;
    position: string;
    lv?: never;
}
 */

type Dog = { name: string, bark: boolean };
type Cat = { name: string, age: number };
type Pet = Dog | Cat;




const myPet: Pet = Math.random() > 0.5 ?
    { name: 'navi', age: 3 } :
    { name: 'donggu', bark: false };

/**
 * const myPet: Pet
 */

function ffff(A: number, B: string): number;
function ffff(A: number, B: string, C: number): number;
function ffff(A: number, B: string, C?: number) {
    if (C !== undefined) return A + C;
    return A + Number(B);
}

// type sig = {
//     [index: number]: number | string | boolean;
//     name: number;
//     str: undefined;
//     [user: string]: symbol;
// };

class aaaa {
    public name;
    constructor() {
        this.name = 'han';
    }
    hello() {
        console.log('hello');
    }
}

class Lesson {
    subject: string;

    constructor(subject: string) {
        this.subject = subject;
    }
}

class OnlineLesson extends Lesson {
    url: string;

    constructor(subject: string, url: string) {
        super(subject);
        this.url = url;
        this.subject = '';
    }
}


const aaaaInstance = new aaaa();
console.log(aaaaInstance);
console.log(aaaa);

let lesson: Lesson;

lesson = new Lesson('coding');
lesson = new OnlineLesson('coding', 'orelly.com');
