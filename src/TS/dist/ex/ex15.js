class Animal {
    배고픔_정도;
    constructor(배고픔_정도) {
        this.배고픔_정도 = 배고픔_정도;
    }
    bark() { }
    ;
}
class bird extends Animal {
    bark() {
        console.log('참새');
    }
    fly() {
        console.log('참새 날다');
    }
}
class 까치 extends Animal {
    bark() {
        console.log('까치');
    }
    fly() {
        console.log('까치 날다');
    }
}
class 독수리 extends Animal {
    bark() {
        console.log('독수리');
    }
    fly() {
        console.log('독수리 날다');
    }
}
class Lion extends Animal {
    발톱;
    constructor(배고픔_정도, 발톱) {
        super(배고픔_정도);
        this.발톱 = 발톱;
    }
    bark() {
        console.log('사자');
    }
}
class Tiger extends Animal {
    bark() {
        console.log('호랑이');
    }
}
class Snake extends Animal {
    bark() {
        console.log('뱀');
    }
}
class Cat extends Animal {
    bark() {
        console.log('고양이');
    }
}
const ILion = new Lion(8, '발톱');
const ITiger = new Tiger(3);
const ISnake = new Snake(5);
const ICat = new Cat(2);
const animalArray = [ILion, ITiger, ISnake, ICat];
const Ibird = new bird(5);
const 까치_인스턴스 = new 까치(7);
const 독수리_인스턴스 = new 독수리(4);
for (let i = 0; i < animalArray.length; i += 1) {
    animalArray[i]?.bark();
}
const flyAnimal = [Ibird, 까치_인스턴스, 독수리_인스턴스];
for (let i = 0; i < flyAnimal.length; i += 1) {
    flyAnimal[i]?.fly();
}
export {};
