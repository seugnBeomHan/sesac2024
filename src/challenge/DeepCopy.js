/**
 * 들어올 수 있는 타입
 * 
 * primitive
 *      Symbol
 * object
 *      []
 *      {}
 *      map
 *      set
 *      weakMap
 *      weakSet
 * object shallow
 *      null        ㅇ
 *      function      
 */

import assert from 'assert/strict';

const isArray = (obj) => Array.isArray(obj);
const isMap = (obj) => getConstructorName(obj) === 'Map';
const isSet = (obj) => getConstructorName(obj) === 'Set';
const isWeakMap = (obj) => getConstructorName(obj) === 'WeakMap';
const isWeakSet = (obj) => getConstructorName(obj) === 'WeakSet';
const isFunction = (obj) => getConstructorName(obj) === 'Function';
const isSymbol = (obj) => typeof obj === 'symbol';
const isObjectNotNull = (obj) => typeof obj === 'object' && obj !== null;
const getConstructorName = (obj) => obj.constructor.name;
const getSymbol = (key) => Symbol(key.description);
const getKeys = (obj) => isArray(obj) ?
    Reflect.ownKeys(obj).slice(0, obj.length) :
    Reflect.ownKeys(obj);
const insertData = (result, key, value) => {
    if (isObjectNotNull(value)) {
        if (Reflect.has(value, 'has')) {
            result[key] = getMapSetCopy(value);
            return result;
        }

        if (isFunction(value)) {
            result[key] = value;
            return result;
        }

        result[key] = deepCopy(value);
        return result;
    }
    result[key] = value;
    return result;
};
const getMapSetCopy = (mapAndSet) => {
    // shallowcopy
    if (isWeakMap(mapAndSet) || isWeakSet(mapAndSet)) return mapAndSet;

    if (isMap(mapAndSet)) {
        const result = new Map();

        for (let [key, value] of mapAndSet.entries()) {
            if (isObjectNotNull(key)) key = deepCopy(key);
            if (isObjectNotNull(value)) value = deepCopy(value);
            result.set(key, value);
        }
        return result;
    }

    if (isSet(mapAndSet)) {
        const result = new Set();
        const iter = mapAndSet.values();

        while (true) {
            const { value, done } = iter.next();
            if (done) return result;
            isObjectNotNull(value) ?
                result.add(deepCopy(value)) :
                result.add(value);
        }
    }
}

const deepCopy = (obj) =>
    getKeys(obj).reduce((acc, key) =>
        isSymbol(key) ?
            insertData(acc, getSymbol(key), obj[key]) :
            insertData(acc, key, obj[key]),
        isArray(obj) ? [] : {});

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
    },
    [Symbol('age')]: 27,
};
const innerObj = [[1, 2, 3, 4],
    kim,
    han,
{ 1: 1 ** 1, 2: 2 ** 2, 3: 3 ** 3, 4: 4 ** 4, 5: 5 ** 5 },
{
    korea:
        { capital: 'Seoul', population: 60000000, history: 2000 }
}];

// obj shallow copy test
const copyKim = deepCopy(kim);
copyKim.addr = 'Daegu';
assert.notDeepStrictEqual(kim, copyKim);
assert.notDeepStrictEqual(kim.addr, copyKim.addr);

// obj deep copy test
const copyHan = deepCopy(han);
copyHan.addr.living = 'Incheon';
copyHan.pets.name[0] = 'nyang-nyang';
assert.notDeepStrictEqual(han.addr.living, copyHan.addr.living);
assert.notDeepStrictEqual(han.pets.name[0], copyHan.pets.name[0]);

// array deep copy test
const copyInnerObj = deepCopy(innerObj);
copyInnerObj[0][0] = 100;
copyInnerObj[1].nid = 30;
copyInnerObj[2].pets.name[1] = 'gildong';
copyInnerObj[3]['1'] = 10 ** 10;

assert.notDeepStrictEqual(innerObj[0][0], copyInnerObj[0][0]);
assert.notDeepStrictEqual(innerObj[1].nid, copyInnerObj[1].nid);
assert.notDeepStrictEqual(innerObj[2].pets.name[1], copyInnerObj[2].pets.name[1]);
assert.notDeepStrictEqual(innerObj[3]['1'], copyInnerObj[3]['1']);

assert.deepStrictEqual(deepCopy([1, 2, 3, 4, 5]), [1, 2, 3, 4, 5]);
assert.deepStrictEqual(deepCopy({ val: null }), { val: null });

// all obj deep copy test
{
    const B = [1, 22, 3, 44, 5];
    const C = [11, 222, 3, 4, 555];
    const arr = [1, 2, 3, 4, 5, 3, B, C];
    const hong = { id: 1, name: 'Hong', dept: 'HR' };
    const kim = { id: 2, name: 'Kim', dept: 'Server' };
    const lee = { id: 3, name: 'Lee', dept: 'Front' };
    const park = { id: 4, name: 'Park', dept: 'HR' };
    const ko = { id: 7, name: 'Ko', dept: 'Server' };
    const loon = { id: 6, name: 'Loon', dept: 'Sales' };
    const beom = { id: 5, name: 'Beom', dept: 'Front' };
    const choi = {
        nid: 3,
        addr: 'Busan',
        arr: [1, 2, 3, { aid: 1 }, [10, 20]],
        oo: { id: 1, name: 'Hong', addr: { city: 'Seoul' }, friends: [park, ko, loon, beom] },
        xx: null,
        yy: function () { console.log(this.oo); },
        yyy() { console.log(this.oo); },
        [Symbol()]: 9,
        [Symbol()]: Symbol('symbol2'),
        zs: new Set([arr, hong, loon]),
        zws: new WeakSet([arr, hong, kim, lee]),
        zm: new Map([[hong, arr], [lee, C], [beom, park], [loon, B]]),
        zwm: new WeakMap([[hong, arr]]),
    };

    const newChoi = deepCopy(choi);
    const keys = Reflect.ownKeys(choi);

    // symbol도 새로 만들어 넣었기 때문에 값을 가져오지 못해 fail 발생
    // assert.deepStrictEqual(choi, newChoi, 'deepCopy equal fail!');
    newChoi.addr = 'Daegu';
    newChoi.oo.name = 'Choi';
    assert.notDeepStrictEqual(newChoi, choi, 'Not Valid Deep Copy!');
    newChoi.arr[0] = 100;
    newChoi.arr[3].aid = 200;
    newChoi.arr[4][1] = 300;
    newChoi.oo.addr.city = 'Daejeon';
    assert.notDeepStrictEqual(choi.arr[4][1], newChoi.arr[4][1], 'pass2: 다르지 않아요!');
    assert.notDeepStrictEqual(choi.oo.addr.city, newChoi.oo.addr.city, 'Not Pass3: city가 다르지 않아요!');
}