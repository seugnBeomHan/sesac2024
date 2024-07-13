console.log('Hello TS');
console.log('replaceAll'.replaceAll('A', 'X'));
function add(num1, num2, num3) {
    if (num3)
        return num1 + num2 + num3;
    return num1 + num2;
}
console.log(add(1, 2));
console.log(add(1, 2, 3));
export {};
