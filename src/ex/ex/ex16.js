const arr = [1, 2, 3, 4];
const obj = { '1': 10, '2': 20 };
console.log(Object.getPrototypeOf(arr) === Array);
console.log(Object.getPrototypeOf(arr).constructor === Array);
console.log(Object.getPrototypeOf(obj));
console.log(Object.getPrototypeOf(obj).constructor === Object);

function aa(arr) {
    arr.push(100);
}

console.log(arr);
aa(arr);
console.log(arr);