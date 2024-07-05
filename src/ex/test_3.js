/**
 * 범위 (3시간)
 *  Debounce, Throttle (no test case)
 *  리듀스
 *  프록시 객체 구현
 *  전화번호 정규식
 *  초성 검색
 *  키페어
 *  collection (stack, queue, array list)
 *      [collection]
 *          non constructor         (저는 직접적인 생성자 호출을 막았습니다, 이 부분은 자유)
 *          peek                    return value
 *          toString                return string ([0, 1, 2, 3, 4, 5...])
 *          toArray                 return array
 *          isEmpty                 return boolean
 *          size                    return number
 *          iterator                return iterator
 *          clear                   return this
 *      [stack]       
 *          push                    return this
 *          pop                     return value
 *      [queue]       
 *          enqueue                 return this
 *          dequeue                 return value
 *      [array list]
 *          static arrayToList      return string ({value: 1, next: {value: 2, next: undefined}})
 *          static listToArray      return array
 *          add(value, index)       return this
 *          remove(value)           return value
 *          get(index)              return value
 *          set(index, value)       return this
 *          indexOf(value)          return number(index or -1)
 *          contains(value)         return boolean
 *  calender
 *  네버 오버플로우
 *  Array prototype 메서드 두개
 */

function debounce(cb, delay) {
    let timer = null;
    return (...args) => {
        if (timer) clearTimeout(timer);
        setTimeout(cb, delay, ...args);
    }
}

function throttle(cb, delay) {
    let timer = null;
    return (...args) => {
        if (timer) return;
        setTimeout(() => {
            cb(...args);
            timer = null;
        }, delay);
    }
}

export function reduce(array, cb, init, thisArg) {
    if (init === undefined) {
        init = array[0];
        array = array.slice(1);
    }

    for (let i = 0; i < array.length; i += 1) {
        init = cb(init, array[i], thisArg);
    }

    return init;
}


export function keyPair(data, pair) {
    const cache = new Map();

    for (let i = 0; i < data.length; i += 1) {
        const pairIndex = cache.get(pair - data[i]);
        if (pairIndex !== undefined) return [pairIndex, i];
        if (!cache.has(data[i])) cache.set(data[i], i);
    }
}

export class Emp {
    firstName
    lastName

    constructor() {
        return new Proxy(this, {
            get(target, key, receiver) {
                if (key === 'fullName') {
                    return `${target.firstName} ${target.lastName}`;
                }
                return target[key];
            },

            set(target, key, value, receiver) {
                if (key === 'fullName') {
                    const [firstName, lastName] = value.split(' ');

                    lastName === undefined ?
                        target.lastName = firstName.toUpperCase() :
                        (target.firstName = firstName,
                            target.lastName = lastName.toUpperCase()
                        );
                    return true;
                }
                return true;
            }
        });
    }
}

export function telfmt(tel) {
    const localNum = tel[1];
    const C = 4;
    const A = localNum === '2' ? 2 : tel.length % 4 === 0 ? 4 : 3;

    const B = tel.length - (C + A);
    const regExp = tel.length > 8 ?
        new RegExp(`(\\d{${A}})(\\d{${B}})(\\d{${C}})`) :
        new RegExp(`(\\d{${A}})(\\d{${B}})`);
    return tel.length > 8 ?
        tel.replace(regExp, '$1-$2-$3') :
        tel.replace(regExp, '$1-$2');
}

export function searchByKoreanInitialSound(words, initCho) {
    const CHO = ['ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ',
        'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ',
    ];
    const 가 = '가'.charCodeAt(0);
    const CHO_INTERVAL = 588;

    const regExp = new RegExp([...initCho].reduce((str, cho) => {
        const jamo = 가 + (CHO.indexOf(cho) * CHO_INTERVAL);
        return str += `[${cho}${String.fromCharCode(jamo)}-${String.fromCharCode(jamo + CHO_INTERVAL - 1)}]`;
    }, ''));

    return words.reduce((result, cur) => {
        if (regExp.test(cur)) result.push(cur);
        return result;
    }, []);
}

export function printCalender(date) {
    const [year, month] = date.split('-');
    const dateObj = new Date(year, month - 1, 1);
    const startDay = dateObj.getDay();
    dateObj.setDate(0);
    const lastDate = dateObj.getDate();
    let calender = '';

    for (let i = 0; i < startDay; i += 1) {
        calender += ''.padStart(3, ' ');
    }

    for (let i = 1; i < lastDate; i += 1) {
        calender += `${i}`.padStart(3, ' ');
        if ((i + startDay) % 7 === 0) calender += '\n';
    }

    console.log(`[${year}년 ${month}월]`.padStart(15, ' '));
    console.log(' 일 월 화 수 목 금 토');
    console.log(calender);
    console.log();
    console.log();
}

export function neverOverflow(factorial) {
    let startN = 0;
    let prevStart = 0;
    let result = 0;

    result += recursive(factorial);
    prevStart = startN;

    while (startN !== 0) {
        result += recursive(startN);
        if (prevStart === startN) return result;
        prevStart = startN;
    }

    function recursive(num) {
        try {
            if (num <= 0) return 0;
            return num + recursive(num - 1);
        } catch (error) {
            startN = num;
            return 0;
        }
    }
}

export class Collection {

}

export class ArrayList extends Collection {

}

export class Stack extends Collection {

}

export class Queue extends Collection {

}