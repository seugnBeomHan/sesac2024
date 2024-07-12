console.log('Hello TS');
console.log('replaceAll'.replaceAll('A', 'X'));

function add(num1: number, num2: number): number;
function add(num1: number, num2: number, num3: number): number;
function add(num1: number, num2: number, num3?: number) {
    if (num3) return num1 + num2 + num3;
    return num1 + num2;
}

console.log(add(1, 2));
console.log(add(1, 2, 3));

const isNumberInputAny = (input: any) => typeof input === 'number';
let numAndString = Math.random() > 0.5 ? 10 : 'han';

if (isNumberInputAny(numAndString)) {
    console.log(numAndString.constructor.name);
}

const tuple = [10, 20, '30'] as const;
const namedTuple: [name: string, age: number] = ['han', 27];

const han = { name: 'han', age: 27 };
let seung: keyof typeof han = Math.random() < 0.5 ? 'name' : 'age';
console.log(han[seung]);

class aaa {
    readonly id;
    constructor(id: number) {
        this.id = id;
        this.id = 10;
    }
}