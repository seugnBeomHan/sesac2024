const sym1 = Symbol();
const sym2 = Symbol();
const sym3 = Symbol();

const symbolToNumberMap1 = {
    [sym1]: 1,
    [sym2]: 2,
    [sym3]: 3
};

const symbolToNumberMap2 = {
    [sym1]: 1,
    [sym2]: 2,
    [sym3]: 3
};

const symbolToNumberMap3 = {
    [sym1]: 1,
    [sym2]: 2,
    [sym3]: 3
};

const smArray = [symbolToNumberMap1, symbolToNumberMap2, symbolToNumberMap3];

function getValue<T extends unknown[], K extends keyof T[number]>(obj: T, key: K): T[K] {
    return obj[key];
}

let x2 = getValue(smArray, sym3);  // Returns 3
console.log(x2);

// 이게 무슨 차이일까?!

const fff = (input: string | number | boolean | undefined) => {
    if (typeof input === 'string') {
        input = 'aa';
    }
}
const one = <T>(input: T, input2: T) => {
    input = input2;
    return input;
}
console.log(one(1, 2));
console.log(one("a", "b"));
console.log(one(true, false));

///

interface MyNode<T> {
    value: T;
    next: MyNode<T> | null;
}
function push<T>(currNode: MyNode<T>, nextNode: MyNode<T>) {
    currNode.next = nextNode;
}
function createNode<T>(value: T): MyNode<T> {
    return {
        value,
        next: null
    }
}

const defaultNode = createNode({ name: 'lim', age: 25 });
// push(defaultNode, {
//     value: 'hong',  // value: defaultNode2.value,
//     next: null
// });

// push({ value: 'han', next: null }, defaultNode);

type OnlyStringProperties<T> = {
    [k in keyof T]: T[k] extends string ? k : never;
}[keyof T];

/**
 * {
 *  participants: never;
    location: string;
    name: string;
    year: never;
}
 */


interface AllEventData {
    participants: string[];
    location: string;
    name: string;
    year: number;
}

// 'location' | 'name'
type OnlyStringEventData = OnlyStringProperties<AllEventData>; 
