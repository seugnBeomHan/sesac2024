let animal = {
    jumps: null
};
let rabbit4 = {
    __proto__: animal,
    jumps: true
};

let lion = {
    __proto__: animal,
    jumps: true
};

console.log(rabbit4.jumps); // ? true

delete rabbit4.jumps;

console.log(rabbit4.jumps); // ? null

delete animal.jumps;

console.log(rabbit4.jumps); // ? undifined

console.log(lion.jumps); // ? true

delete lion.jumps;

console.log(lion.jumps);

//

let head = {
    glasses: 1
};

let table = {
    __proto__: head,
    pen: 3
};

let bed = {
    __proto__: table,
    sheet: 1,
    pillow: 2
};

let pockets = {
    __proto__: bed,
    money: 2000
};
console.log(pockets.pen);
console.log(bed.glasses);

// let tmp = 0;
// console.time('pockets.glasses');
// for (let i = 0; i < 10000000000; i += 1) {
//     tmp = pockets.glasses;
// }
// console.timeEnd('pockets.glasses');

// console.time('head.glasses');
// for (let i = 0; i < 10000000000; i += 1) {
//     tmp = head.glasses;
// }
// console.timeEnd('head.glasses');

let animal2 = {
    eat() {
        this.full = true;
    }
};

let rabbit2 = {
    __proto__: animal2
};

rabbit2.eat();

// 

let hamster = {
    stomach: [],

    eat(food) {
        this.stomach.push(food);
    }
};

let speedy = {
    __proto__: hamster
};

let lazy = {
    __proto__: hamster,
    stomach: [],
    eat(food) {
        this.stomach.push(food);
    }
};

// 햄스터 speedy가 음식을 먹습니다.
speedy.eat("apple");
console.log(speedy.stomach); // apple

// 햄스터 lazy는 음식을 먹지 않았는데 배에 apple이 있다고 나오네요. 왜 그럴까요? lazy는 배가 비어있도록 고쳐주세요.
lazy.eat('banana');
console.log(lazy.stomach); // apple

function objCon() {
    this.a = 10;
    this.b = 20;
    let c = 30;
    const d = 40;
    this.getAge = () => 100;
    const getName = () => 100;
}
var globalObj = 10;
const objCon1 = new objCon();
const objRetaral = { a: 10, b: 20 };
console.dir(objCon1.a);
console.dir(objCon1.b);
console.dir(objCon1.c);
console.dir(objCon1.d);
console.dir(objCon1.getAge());
console.dir(objRetaral);
console.log(lazy.__proto__);
console.log(speedy.__proto__);

function RebbitConstructor() { }
const rebbit3 = new RebbitConstructor();
console.log(rebbit3.__proto__ === RebbitConstructor.prototype);
console.log(rebbit3.__proto__.constructor === RebbitConstructor.prototype.constructor);
console.log(rebbit3.constructor === RebbitConstructor.prototype.constructor);
console.log(rebbit3.constructor === RebbitConstructor);

// 

function Rabbit() { }

Rabbit.prototype = {
    eats: true
};

let rabbit = new Rabbit();

// Rabbit.prototype = {};
// Rabbit.prototype.eats = false;
// delete rabbit.eats;
delete Rabbit.prototype.eats;

console.log(rabbit.eats); // true

console.log('User Ex');

function User(name) {
    this.name = name;
}
User.prototype = {}; // (*)

let user = new User('John');
let user2 = new user.constructor('Pete');

console.log(User === user.constructor);
console.log(user2.name); // undefined