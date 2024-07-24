const isStringNumber = (value: unknown): value is [string, number] =>
    Array.isArray(value)
    && value.length === 2
    && typeof value[0] === 'string'
    && typeof value[1] === 'number';

const f1 = (value: number | string | boolean | [string, number]) => {
    if (isStringNumber(value)) {
        console.log(value[0].toUpperCase(), value[1].toFixed());
    }
};

f1(['han', 10]);
f1('han');
f1(true);
f1(27);

interface Animal { }
interface Dog extends Animal {
    name: string;
}
interface Cat extends Animal {
    punch(): void;
}
class Retriever implements Dog {
    name: string;
    constructor(name: string) {
        this.name = name;
    }
}

const isDog = (input: Animal): input is Dog => 'name' in input;

const donggu = new Retriever('동구');
console.log(isDog(donggu));
