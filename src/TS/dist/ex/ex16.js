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
function getValue(obj, key) {
    return obj[key];
}
let x2 = getValue(smArray, sym3); // Returns 3
console.log(x2);
// 이게 무슨 차이일까?!
const fff = (input) => {
    if (typeof input === 'string') {
        input = 'aa';
    }
};
const one = (input, input2) => {
    input = input2;
    return input;
};
console.log(one(1, 2));
console.log(one("a", "b"));
console.log(one(true, false));
function push(currNode, nextNode) {
    currNode.next = nextNode;
}
function createNode(value) {
    return {
        value,
        next: null
    };
}
const defaultNode = createNode({ name: 'lim', age: 25 });
export {};
