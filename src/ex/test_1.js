/**
 * 범위 (3시간)
 * 5. Debounce, Throttle (no test case)
 * 9. 리듀스
 * 1. 프록시 객체 구현
 * 7. 전화번호 정규식
 * 6. 초성 검색
 * 9. 키페어
 * 2. collection (stack, queue, array list)
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
 * 4. calender
 * 8. 네버 오버플로우
 * 3. Array prototype 메서드 두개
 */

function debounce(cb, delay) {
    let timer = null;
    return (...args) => {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
            cb(...args);
        }, delay);
    }
}

function throttle(cb, delay) {
    let timer = null;
    return (...args) => {
        if (timer) return;
        timer = setTimeout(() => {
            cb(...args);
            timer = null;
        }, delay);
    }
}

export function keyPair(data, pair) {
    const cache = new Map();

    for (let i = 0; i < data.length; i += 1) {
        const pairIndex = cache.get(pair - data[i]);
        if (pairIndex !== undefined) return [pairIndex, i];
        if (!cache.has(data[i])) cache.set(data[i], i);
    }
}

export function reduce(array, cb, init, thisArg) {
    if (init === undefined) {
        init = array[0];
        array = array.slice(1);
    }

    for (let i = 0; i < array.length; i += 1) {
        init = cb(init, array[i], i, thisArg);
    }

    return init;
}

export class Emp {
    firstName
    lastName
    constructor() {
        return new Proxy(this, {
            get(target, key, receiver) {
                if (key === 'fullName') return `${target.firstName} ${target.lastName}`;
                return target[key];
            },
            set(target, key, value, receiver) {
                if (key === 'fullName') {
                    const [firstName, lastName] = value.split(' ');
                    lastName === undefined ?
                        target.lastName = firstName.toUpperCase() :
                        (target.firstName = firstName,
                            target.lastName = lastName.toUpperCase());
                    return true;
                }
                return;
            }
        });
    }
}
export function telfmt(tel) {
    const local = tel[1];

    const C = 4;
    const A = local === '2' ? 2 : tel.length % 4 === 0 ? 4 : 3;
    const B = tel.length - C - A;
    const regExp = tel.length <= 8 ?
        new RegExp(`(\\d{${A}})(\\d{${C}})`, 'g') :
        new RegExp(`(\\d{${A}})(\\d{${B}})(\\d{${C}})`, 'g');

    return tel.length <= 8 ?
        tel.replace(regExp, '$1-$2') :
        tel.replace(regExp, '$1-$2-$3');
}

export function searchByKoreanInitialSound(words, initCho) {
    const CHO_HANGUL = [
        'ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ',
        'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ',
        'ㅎ'
    ]
    const CHO_INTERVAL = 588;
    const 가 = '가'.charCodeAt(0);

    const regExp = new RegExp([...initCho].reduce((regExpStr, cur) => {
        const jamo = 가 + (CHO_HANGUL.indexOf(cur) * CHO_INTERVAL);
        return regExpStr += `[${cur}${String.fromCharCode(jamo)}-${String.fromCharCode(jamo + CHO_INTERVAL - 1)}]`;

    }, ''));
    return words.reduce((array, word) => {
        if (regExp.test(word)) array.push(word);
        return array;
    }, []);
}

export class Collection {
    #array;
    constructor(...values) {
        if (this.constructor.name === 'Collection') throw new ReferenceError('생성자 호출 불가');
        this.#array = values.length !== 0 ? values : [];
    }

    get _array() { return this.#array; }
    peek() {
        switch (this.#getConstructorName()) {
            case 'Stack':
            case 'ArrayList': return this.#array.at(-1);
            case 'Queue': return this.#array[0];
        }
    }
    toString() { return `[${this.#array.join(',')}]`; }
    toArray() { return [...this.#array]; }
    isEmpty() { return this.#array.length === 0; }
    size() { return this.#array.length; }
    iterator() { return this[Symbol.iterator](); }
    clear() { return this.#array = []; }
    [Symbol.iterator]() {
        let index = 0;
        const array = this.#array;
        switch (this.#getConstructorName()) {
            case 'Stack': return {
                next() {
                    return {
                        value: array[array.length - (index += 1)],
                        done: index > array.length
                    }
                }
            }
            case 'ArrayList':
            case 'Queue': return {
                next() {
                    return {
                        value: array[index++],
                        done: index <= array.length
                    }
                }
            }
        }
    }
    #getConstructorName() { return this.constructor.name; }
}
export class ArrayList extends Collection {
    static arrayToList(array) { return array.reduce((list, cur) => list = { value: cur, next: list }, undefined); }
    static listToArray(list) {
        const result = [];
        const node = list;

        while (node !== undefined) {
            result.push(node.value);
            node = node.next;
        }
        return result;
    }

    constructor(...values) {
        super(...values);
    }

    add(value, index = this.size()) {
        index === this.size() ?
            this._array.push(value) :
            this._array.splice(index, 0, value);
        return this;
    }

    remove(value) {
        const deleteIndex = this.indexOf(value);
        this._array.splice(deleteIndex, deleteIndex);
        return this;
    }

    get(index) {
        return this._array[index];
    }

    set(index, value) {
        this._array[index] = value;
        return this;
    }

    indexOf(value) {
        return this._array.indexOf(value);
    }

    contains(value) {
        return this.indexOf(value) !== -1;
    }
}

export class Stack extends Collection {
    constructor(...values) {
        super(...values);
    }

    push(value) {
        this._array.push(value);
        return this;
    }

    pop() {
        return this._array.pop();
    }
}

export class Queue extends Collection {
    constructor(...values) {
        super(...values);
    }

    enequeue(value) {
        this._array.unshift(value);
        return this
    }

    dequeue() {
        return this._array.pop();
    }
}

export function printCalender(date) {
    const [year, month] = date.split('-');
    const today = new Date(year, month - 1, 1);
    const startDay = today.getDay();
    today.setDate(0);
    const thisMonthLastDate = today.toLocaleDateString().split('.').map(Number)[2];

    let calender = '';

    for (let i = 1; i <= thisMonthLastDate; i += 1) {
        if (i < startDay + 1) {
            calender += ''.padStart(3, ' ');
            continue;
        }

        calender += `${i}`.padStart(3, ' ');

        if (i % 7 === 0) {
            calender += '\n';
        }
    }

    console.log(`[${year}년 ${month}월]`.padStart(15, ' '));
    console.log(' 일 월 화 수 목 금 토');
    console.log(calender);
    console.log();
}

export function neverOverflow(factorial) {
    let startNum = 0;
    let prevStartNum = 0;
    let result = 0;

    result += recursive(factorial);
    if (startNum === 0) {
        return result;
    }
    prevStartNum = startNum;

    while (true) {
        result += recursive(startNum);
        if (prevStartNum === startNum) {
            return result;
        }
        prevStartNum = startNum;
    }

    function recursive(num) {
        try {
            if (num <= 1) return 1;
            return num + recursive(num - 1);
        } catch (error) {
            startNum = num;
            return 0;
        }
    }
}