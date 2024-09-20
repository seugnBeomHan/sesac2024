function origin() {
    for (let i = 0; i < 10; ++i) {
        console.log(i);
    }
}

origin.one = 1;
origin.two = 2;

console.log(origin.one);
console.log(origin.two);
console.log(origin);
console.log('origin ' + origin());

const copy = new Function(origin);
console.dir(copy.one);
console.dir(copy.two);
console.dir(copy.name);
console.dir('copy ' + copy());

console.log(origin === copy);