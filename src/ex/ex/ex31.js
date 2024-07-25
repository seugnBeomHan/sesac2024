const inventory = [
    { name: "asparagus", type: "vegetables", quantity: 5 },
    { name: "bananas", type: "fruit", quantity: 0 },
    { name: "goat", type: "meat", quantity: 23 },
    { name: "cherries", type: "fruit", quantity: 5 },
    { name: "fish", type: "meat", quantity: 22 },
];

Array.prototype.groupBy = function (cb) {
    return this.reduce((result, cur) => {
        if (result[cb(cur)] === undefined) {
            result[cb(cur)] = [cur];
            return result;
        }
        result[cb(cur)].push(cur);
        return result;
    }, {});
};

function myCallback({ quantity }) {
    return quantity > 5 ? "ok" : "restock";
}


console.log(inventory.groupBy(({ type }) => type));
console.log(inventory.groupBy(myCallback));

let i = Math.random() > 0.5 && 'han';
console.log(i);

class testClass {
    school;
    constructor() {
        this.age = 10;
        let school = 'han';
    }
    friend = 'seung';
    func1() { }
    func2 = () => { }
    hello() {
        console.log(`hi! ${this.school} ${this.friend}`);
    }
}

console.log(new testClass().func1 === new testClass().func1);
console.log(new testClass().func2 === new testClass().func2);

const testObj1 = new testClass();
const testObj2 = new testClass();
console.log(testObj1);
console.log(testObj2);
testObj1.school = 'beom';
testObj1.friend = 'aaa';
console.log(testObj1);
console.log(testObj2);

testObj1.hello();
testObj2.hello();

console.log('---------------');

const origin = { medium: 'han', title: 'mead' };
const oriCopy = { ...origin, title: 'ghid' };
console.log(oriCopy);

