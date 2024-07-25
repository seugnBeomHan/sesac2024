const arr = [1, 2, 3, 4];
const { '0': val1, '1': val2, '2': val3 } = arr;

function User(name, age, hometown) {
    console.log(this);
    this.name = name;
    this.age = age;
    this.hometown = hometown;

    const num1 = 10;
}

const user1 = new User("Han", 27, "Seoul");
const user2 = new User("Kim", 30, "Busan");
// const user3 = User("Kim", 30, "Busan");
user1.num1 = 20;

console.log(user1.num1);
console.log(user2.num1);
console.dir(user1);
console.dir(user2);
// console.dir(user3);

const name = "HanSeungBeom";
console.log(`${0}`);
console.log(`${"name"}`);
console.log(`${name}`);