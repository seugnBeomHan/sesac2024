// helper method
const isObject = (property) => typeof property === 'object';
const isArray = (property) => Object.getPrototypeOf(property).constructor === Array;

// 순수함수는 아니지만 기능 분리 목적으로 구현
const input = (objOrArr, data, key = undefined) =>
    key === undefined ? objOrArr.push(data) : objOrArr[key] = data;

// array deep copy
const copyArray = (origin) => {
    const copy = [];

    for (const e of origin) {
        if (isObject(e)) { // [{}],  [[]] 의 경우
            if (isArray(e)) {
                input(copy, copyArray(e));
                continue;
            }
            input(copy, copyObject(e));
            continue;
        }
        input(copy, e);
    }
    return copy;
}

// object deep copy 
const copyObject = (origin) => {
    const copy = {};

    for (const key in origin) {
        const property = origin[key];

        if (isObject(property)) { // {{}},  {[]} 의 경우
            if (isArray(property)) {
                input(copy, copyArray(property), key);
                continue;
            }
            input(copy, copyObject(property), key);
            continue;
        }
        input(copy, property, key);
    }
    return copy;
};

// test data
const kim = { nid: 3, nm: 'Hong', addr: 'Busan' };
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
const innerObj = [[1, 2, 3, 4],
    kim,
    han,
{ 1: 1 ** 1, 2: 2 ** 2, 3: 3 ** 3, 4: 4 ** 4, 5: 5 ** 5 },
{
    korea:
        { capital: 'Seoul', population: 60000000, history: 2000 }
}];

// copy
const copyKim = copyObject(kim);
const copyHan = copyObject(han);
const copyInnerObj = copyObject(innerObj);

// obj shallow copy test
copyKim.addr = 'Daegu';
console.log(copyKim);
console.log(kim.addr !== copyKim.addr); // true
console.log('-------------------------------');

// obj deep copy test
copyHan.addr.living = 'Incheon';
copyHan.pets.name[0] = 'nyang-nyang';
console.log(copyHan);
console.log(han.addr.living !== copyHan.addr.living); // true
console.log(han.pets.name[0] !== copyHan.pets.name[0]); // true
console.log('-------------------------------');

// array deep copy test
copyInnerObj[0][0] = 100;
copyInnerObj[1].nid = 30;
copyInnerObj[2].pets.name[1] = 'gildong';
copyInnerObj[3]['1'] = 10 ** 10;

console.log(copyInnerObj);
console.log(innerObj[0][0] !== copyInnerObj[0][0]); // true
console.log(innerObj[1].nid !== copyInnerObj[1].nid); // true
console.log(innerObj[2].pets.name[1] !== copyInnerObj[2].pets.name[1]); // true
console.log(innerObj[3]['1'] !== copyInnerObj[3]['1']); // true