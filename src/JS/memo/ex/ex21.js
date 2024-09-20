function add(num1, num2, num3, num4) {
    let i = 10;
    let j = 20;
    let k = 100;
    k = 15;
    return num1 + num2 + i + j;
}

add(1, 2);

const val1 = 1.1231;
console.log(val1.toFixed(2));

console.log(!!(undefined));
console.log(!!(null));
console.log(!!(NaN));
console.log(!!(0));
console.log(!!(false));
console.log(!!(Infinity));
console.log(!!(-1));
console.log(!!([]));
console.log(!!({}));
console.log(!!(1));
console.log(!!(''));
console.log(!!(' '));

const date1 = new Date('2024-06-20');
const getTimeFunc = date1.getTime;
// console.log(getTimeFunc());

const han = {
    nid: 3,
    nm: 'Seung',
    addr: {
        living: 'Busan',
        hometown: 'Seoul'
    },
    pets: {
        name: ['navi', 'baeggu', 'kkamdung-i']
    }
};

const { ...kim } = han;
kim.addr.living = 'Inchen';
console.log(kim.addr.living !== han.addr.living);