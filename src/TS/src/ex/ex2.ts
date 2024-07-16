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