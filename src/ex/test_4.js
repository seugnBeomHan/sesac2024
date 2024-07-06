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
            cb();
            timer = null;
        }, delay, ...args);
    }
}

export function reduce(array, cb, init, thisArgs) {
    if (init === undefined) {
        init = array[0];
        array = array.slice(1);
    }

    for (let i = 0; i < array.length; i += 1) {
        init = cb(init, array[i], i, thisArgs);
    }
    return init;
}

export function telfmt(tel) {
    const localNum = Number(tel[1]);

    const C = 4;
    const A = localNum === 2 ? 2 : tel.length % 4 === 0 ? 4 : 3;
    const B = tel.length - (C + A);
    const regExp = tel.length <= 8 ? new RegExp(`(\\d{${A}})(\\d{${B}})`) :
        new RegExp(`(\\d{${A}})(\\d{${B}})(\\d{${C}})`);

    return tel.length <= 8 ? tel.replace(regExp, '$1-$2') : tel.replace(regExp, '$1-$2-$3');
}

export function searchByKoreanInitialSound(datas, chos) {
    const CHO = ['ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ', 'ㅇ',
        'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ',
    ];
    const CHO_INTERVAL = 588;
    const 가 = '가'.charCodeAt(0);
    const regExp = new RegExp([...chos].reduce((str, cur) => {
        const jamo = 가 + (CHO.indexOf(cur) * CHO_INTERVAL);
        return str += `[${cur}${String.fromCharCode(jamo)}-${String.fromCharCode(jamo + CHO_INTERVAL - 1)}]`;
    }, ''));

    return datas.reduce((result, word) => {
        if (regExp.test(word)) result.push(word);
        return result;
    }, []);
}

export function keyPair(data, pair) {
    const cache = new Map();

    for (let i = 0; i < data.length; i += 1) {
        const pairIndex = cache.get(pair - data[i]);
        if (pairIndex !== undefined) return [pairIndex, i];
        if (!cache.has(data[i])) cache.set(data[i], i);
    }
}

export function neverOverflow(factorial) {
    let startN = 0;
    let prevN = 0;
    let sum = 0;

    sum += recursive(factorial);
    prevN = startN;

    while (startN !== 0) {
        sum += recursive(startN);
        if (prevN === startN) return sum;
        prevN = startN;
    }

    return sum;

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

export function printCalender(date) {
    const [year, month] = date.split('-');
    const dateObj = new Date(year, month - 1, 1);
    const startDay = dateObj.getDay();
    dateObj.setDate(0);
    const lastDate = dateObj.getDate();
    let cal = '';

    for (let i = 0; i < startDay; i += 1) {
        cal += ''.padStart(3, ' ');
    }

    for (let i = 1; i < lastDate; i += 1) {
        cal += `${i}`.padStart(3, ' ');
        if ((i + startDay) % 7 === 0) cal += '\n';
    }

    console.log(`[${year}년 ${month}월]`.padStart(15, ' '));
    console.log(' 일 월 화 수 목 금 토');
    console.log(cal);
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
                return;
            }

        });
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