const arr = [100, 200, 300, 400, 500, 600, 700];

// 1. for-in문을 사용하여 배열의 인덱스(키)를 출력하시오.
const getArrayKeys = (inputArr) => {
    for (const idx in inputArr) {
        console.log(idx);
    }
};
getArrayKeys(arr);
console.log('--------------------');

// 2. for-in문을 사용하여 배열의 원소(값)를 출력하시오. (of)
const getArrayValues = (inputArr) => {
    for (const idx in inputArr) {
        console.log(inputArr[idx]);
    }
};
getArrayValues(arr);
console.log('--------------------');

const obj = { name: 'lim', addr: 'Yongsan', level: 1, role: 9, receive: false };

// 3. for-in문을 사용하여 프로퍼티 이름(키)을 출력하시오.
const getObjKeys = (inputObj) => {
    for (const key in inputObj) {
        console.log(key);
    }
};
getObjKeys(obj);
console.log('--------------------');

// 4. for-in문을 사용하여 프로퍼티 값을 출력하시오.
const getObjValuesIn = (inputObj) => {
    for (const key in inputObj) {
        console.log(inputObj[key]);
    }
};
getObjValuesIn(obj);
console.log('--------------------');

// 5. for-of문을 사용하여 프로퍼티 값을 출력하시오.
const getObjValuesOf = (inputObj) => {
    for (const value of Object.values(inputObj)) {
        console.log(value);
    }
}
getObjValuesOf(obj);
console.log('--------------------');

// 6. level 프로퍼티가 열거(entries)되지 않도록 설정하시오.
Object.defineProperty(obj, 'level', { enumerable: false });
getObjValuesOf(obj);
console.log('--------------------');

// 7. role 프로퍼티는 읽기전용으로 설정하시오.
Object.defineProperty(obj, 'role', { writable: false });
console.log(obj.role);
// obj.role = 99; // error