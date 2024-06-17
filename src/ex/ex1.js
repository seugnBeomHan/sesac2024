function add(a, b, c) {
    console.log(arguments);
    let res = 0;
    for (let argument of arguments) {
        res += argument;
    }
    return res;
}

console.log(add(1, 2));
console.log(add(1, 2, 3));
console.log(add(1, 2, 3, 5, 6, 5, 4));
console.log(add(1));
console.log(add(1, 3, 2, 1, 45, 6, 6, 5));

