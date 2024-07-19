class Animal {
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

const ILion: Animal = new Lion();
const ITiger: Animal = new Tiger();
const ISnake: Animal = new Snake();
const ICat: Animal = new Cat();

const animalArray = [ILion, ITiger, ISnake, ICat];

const Ibird: IFly = new bird();
const 까치_인스턴스: IFly = new 까치();
const 독수리_인스턴스: IFly = new 독수리();

for (let i = 0; i < animalArray.length; i += 1) {
    animalArray[i]?.bark();
}

const flyAnimal = [Ibird, 까치_인스턴스, 독수리_인스턴스];
for (let i = 0; i < flyAnimal.length; i += 1) {
    flyAnimal[i]?.fly();
}