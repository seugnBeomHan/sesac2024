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

export function keyPair(data, pair) {
    const cache = new Map();

    for (let i = 0; i < data.length; i += 1) {
        const pairIndex = cache.get(pair - data[i]);
        if (pairIndex !== undefined) return [pairIndex, i];
        if (!cache.has(data[i])) cache.set(data[i], i);
    }
    return;
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
                    const [first, last] = value.split(' ');
                    last === undefined ?
                        target.lastName = first.toUpperCase() :
                        (target.firstName = first, target.lastName = last.toUpperCase());
                    return true;
                }
                return;
            }
        });
    }
}
export function telfmt(tel) {
    const localNum = tel[1];

    const C = 4;
    const A = localNum === '2' ? 2 : tel.length % 4 === 0 ? 4 : 3;
    const B = tel.length - (A + C);
    const regExp = tel.length <= 8 ?
        new RegExp(`(\\d{${A}})(\\d{${B}})`) :
        new RegExp(`(\\d{${A}})(\\d{${B}})(\\d{${C}})`);

    return tel.length <= 8 ?
        tel.replace(regExp, '$1-$2') :
        tel.replace(regExp, '$1-$2-$3');
}
export function neverOverflow(factorial) {
    let startN = 0;
    let prevN = 0;
    let sum = 0;

    sum += recursive(factorial);
    prevN = startN;

    while (startN !== 0) {
        sum += recursive(startN);
        if(prevN === startN) return sum;
        prevN = startN
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
    console.log();
}

export function searchByKoreanInitialSound(words, chos) {
    const CHO = ['ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ',
        'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'
    ];
    const CHO_INTERVAL = 588;
    const 가 = '가'.charCodeAt(0);
    const regExp = new RegExp([...chos].reduce((str, cur) => {
        const jamo = 가 + (CHO.indexOf(cur) * CHO_INTERVAL);
        return str += `[${cur}${String.fromCharCode(jamo)}-${String.fromCharCode(jamo + CHO_INTERVAL - 1)}]`;
    }, ''));

    return words.reduce((result, cur) => {
        if (regExp.test(cur)) result.push(cur);
        return result;
    }, []);
}
