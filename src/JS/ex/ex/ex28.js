const obj = { id: 1, name: 'hong' };

console.log(obj.__proto__);
console.log(obj.prototype);
console.log(Object.getPrototypeOf(obj));
console.log(obj.constructor);
console.log(obj.constructor.prototype);

class Emp {
    firstName;
    lastName;
}

const user = new Emp();
console.log(user.constructor === Emp);
console.log(Emp === Emp.prototype.constructor);
console.log(Emp.constructor);
console.log(Object.getPrototypeOf(user) === user.__proto__);
console.log(Emp.__proto__.constructor.prototype);
console.log(Emp.constructor.prototype === Emp.__proto__.constructor.prototype);


class Animal {
    name = 'Han';
    id = 1;       // member property
    #age = 10;    // private member variable
    constructor() {
        this.id = 10;
    }

    getAge() {  // Override the Object's toString()
        return this.#age;
    }

    toString() {  // Override the Object's toString(), [메소드] 다형성!
        return `This animal's name is ${this.name}.`;
    }
}

const dog = new Animal('Dog');
console.log('id=', dog.id);   // ?
console.log('age=', dog.age); // ?
console.log('age=', dog.getAge()); // ?

console.log(dog.toString()); // ?

