const isStringNumber = (value) => Array.isArray(value)
    && value.length === 2
    && typeof value[0] === 'string'
    && typeof value[1] === 'number';
const f1 = (value) => {
    if (isStringNumber(value)) {
        console.log(value[0].toUpperCase(), value[1].toFixed());
    }
};
f1(['han', 10]);
f1('han');
f1(true);
f1(27);
class Retriever {
    name;
    constructor(name) {
        this.name = name;
    }
}
const isDog = (input) => 'name' in input;
const donggu = new Retriever('동구');
console.log(isDog(donggu));
export {};
