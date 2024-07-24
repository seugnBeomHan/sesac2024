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

function getValue<T, K extends keyof T>(obj: T, key: K): T[K] {
    return obj[key];
}

let x2 = getValue(smArray, sym3);  // Returns 3

// 이게 무슨 차이일까?!