function isBoolObj(obj) {
    if (obj === undefined || obj === null) {
        return false;
    }

    if (obj.constructor.name === 'Boolean') {
        return true;
    }

    return false;
}
console.log(isBoolObj(1));
console.log(isBoolObj(''));
console.log(isBoolObj(true));
console.log(isBoolObj(false));
console.log(isBoolObj(new Boolean(false)));
console.log(isBoolObj(NaN));
console.log(isBoolObj(undefined));
console.log(isBoolObj(null));
console.log(isBoolObj(Symbol('is bool')));
console.log(isBoolObj(new Number(1)));

const num = 1;
console.log(isBoolObj(num));

const trueObj = new Boolean(true);
const falseObj = new Boolean(false);
console.log(trueObj);
console.dir(trueObj);
console.dir(trueObj.valueOf());

console.log(new Boolean(trueObj).valueOf());
console.log(!!trueObj);
console.log(!!falseObj);
console.log(!!0);
console.log(falseObj.valueOf() === false);
console.log(falseObj.valueOf());
console.log(new Boolean(false).valueOf());
console.log(true.valueOf());
console.log(false.valueOf());
console.log(trueObj.valueOf());
console.log(falseObj.valueOf());


const left = 'han'
const right = 10;
const rightFloat = 10.1273861;

const leftType = left.constructor.name;
const rightType = right.constructor.name;
const rightFloatType = rightFloat.constructor.name;

console.log(typeof leftType);
console.log(rightType);
console.log(rightFloatType);


let leftNullable = undefined;
leftNullable = leftNullable ?? leftNullable;
console.log(leftNullable);

leftNullable = null;
leftNullable = leftNullable ?? leftNullable;
console.log(leftNullable);

leftNullable = 10;
leftNullable = leftNullable ?? leftNullable;
console.log(leftNullable);

let a = undefined, b = undefined, c = null, d = null;
console.log(a === b);
console.log(c === b);
console.log(c === d);
