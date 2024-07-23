abstract class Animal {
    private readonly 배고픔_정도;
    constructor(배고픔_정도: number) {
        this.배고픔_정도 = 배고픔_정도;
    }
    bark() { };
}

interface IFly {
    fly(): void;
}
class bird extends Animal implements IFly {
    override bark() {
        console.log('참새');
    }

    fly() {
        console.log('참새 날다');
    }
}

class 까치 extends Animal implements IFly {
    override bark() {
        console.log('까치');
    }

    fly() {
        console.log('까치 날다');
    }
}

class 독수리 extends Animal implements IFly {
    override bark() {
        console.log('독수리');
    }

    fly() {
        console.log('독수리 날다');
    }
}

class Lion extends Animal {
    private readonly 발톱;
    constructor(배고픔_정도:number, 발톱: string){
        super(배고픔_정도);
        this.발톱 = 발톱;
    }
    override bark() {
        console.log('사자');
    }
}


class Tiger extends Animal {
    override bark() {
        console.log('호랑이');
    }
}


class Snake extends Animal {
    override bark() {
        console.log('뱀');
    }
}


class Cat extends Animal {
    override bark() {
        console.log('고양이');
    }
}

const ILion: Animal = new Lion(8, '발톱');
const ITiger: Animal = new Tiger(3);
const ISnake: Animal = new Snake(5);
const ICat: Animal = new Cat(2);

const animalArray = [ILion, ITiger, ISnake, ICat];

const Ibird: IFly = new bird(5);
const 까치_인스턴스: IFly = new 까치(7);
const 독수리_인스턴스: IFly = new 독수리(4);

for (let i = 0; i < animalArray.length; i += 1) {
    animalArray[i]?.bark();
}

const flyAnimal = [Ibird, 까치_인스턴스, 독수리_인스턴스];
for (let i = 0; i < flyAnimal.length; i += 1) {
    flyAnimal[i]?.fly();
}