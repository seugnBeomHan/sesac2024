import assert from 'assert/strict';

class Subway {
    static #LINE_2 = [
        '신도림',
        '대림',
        '구로디지털단지',
        '신대방',
        '신림',
        '봉천',
        '서울대입구',
        '낙성대',
        '사당',
        '방배',
        '서초',
        '교대',
        '강남',
        '역삼',
        '선릉',
        '삼성',
        '종합운동장',
        '잠실새내',
        '잠실',
        '잠실나루',
        '강변',
        '구의',
        '건대입구',
        '성수',
        '용답',
        '신답',
        '용두',
        '신설동',
        '뚝섬',
        '한양대',
        '왕십리',
        '상왕십리',
        '신당',
        '동대문역사문화공원',
        '을지로4가',
        '을지로3가',
        '을지로입구',
        '시청',
        '충정로',
        '아현',
        '이대',
        '신촌',
        '홍대입구',
        '합정',
        '당산',
        '영등포구청',
        '문래',
    ];

    static stationCount() {
        return Subway.#LINE_2.length;
    }

    static #stationIndexOf(station) {
        return Subway.#LINE_2.indexOf(station);
    }

    static #stationsToArray(dIndex, aIndex) {
        return Subway.#LINE_2.slice(dIndex, aIndex);
    }

    #departures;
    #arrivals;

    constructor(departures, arrivals) {
        if (this.#inputIsNotVaild(departures, arrivals)) {
            throw new ReferenceError('Please enter the correct input value');
        }

        this.#departures = departures;
        this.#arrivals = arrivals;
    }

    #inputIsNotVaild(departures, arrivals) {
        if (departures === undefined || arrivals === undefined) {
            return true;
        }

        const departuresIndex = Subway.#stationIndexOf(departures);
        const arrivalsIndex = Subway.#stationIndexOf(arrivals);

        if ((departuresIndex === -1 || arrivalsIndex === -1) ||
            (departuresIndex === arrivalsIndex)) {
            return true;
        }
        return false;
    }

    #fromDeparturesToArrivals() {
        const departuresIndex = Subway.#stationIndexOf(this.#departures);
        const arrivalsIndex = Subway.#stationIndexOf(this.#arrivals);

        return arrivalsIndex > departuresIndex ?
            Subway.#stationsToArray(departuresIndex, arrivalsIndex + 1) :
            [...Subway.#stationsToArray(departuresIndex, Subway.stationCount()),
            ...Subway.#stationsToArray(0, arrivalsIndex + 1)];
    }

    iterator() {
        return this[Symbol.iterator]();
    }

    [Symbol.iterator]() {
        let index = 0;
        const stations = this.#fromDeparturesToArrivals();
        return {
            next: () => {
                return {
                    value: stations[index++],
                    done: index > stations.length
                }
            }
        }
    }
}

// const wrongInput1 = new Subway(); // ok
// const wrongInput2 = new Subway('서울대입구'); // ok
// const wrongInput3 = new Subway('서울대입구', '목동'); // ok
// const wrongInput4 = new Subway('목동', '서울대입구'); // ok
// const wrongInput5 = new Subway('서울대입구', '서울대입구'); // ok

console.log('========단방향 테스트========');
const route = new Subway('신도림', '서울대입구');
assert.deepStrictEqual([...route], ['신도림', '대림', '구로디지털단지', '신대방', '신림', '봉천', '서울대입구']);

const iter = route.iterator();
while (true) {
    const { value, done } = iter.next();
    if (done) break;
    console.log(value);
}

console.log('========순환 테스트========');

const route2 = new Subway('왕십리', '강남');
assert.deepStrictEqual([...route2], [
    '왕십리', '상왕십리',
    '신당', '동대문역사문화공원',
    '을지로4가', '을지로3가',
    '을지로입구', '시청',
    '충정로', '아현',
    '이대', '신촌',
    '홍대입구', '합정',
    '당산', '영등포구청',
    '문래', '신도림',
    '대림', '구로디지털단지',
    '신대방', '신림',
    '봉천', '서울대입구',
    '낙성대', '사당',
    '방배', '서초',
    '교대', '강남'
]);

const iter2 = route2.iterator();
while (true) {
    const { value, done } = iter2.next();
    if (done) break;
    console.log(value);
}

console.log('========전체 순환 테스트========');

const route3 = new Subway('종합운동장', '삼성');
assert.deepStrictEqual([...route3], [
    '종합운동장', '잠실새내', '잠실',
    '잠실나루', '강변', '구의',
    '건대입구', '성수', '용답',
    '신답', '용두', '신설동',
    '뚝섬', '한양대', '왕십리',
    '상왕십리', '신당', '동대문역사문화공원',
    '을지로4가', '을지로3가', '을지로입구',
    '시청', '충정로', '아현',
    '이대', '신촌', '홍대입구',
    '합정', '당산', '영등포구청',
    '문래', '신도림', '대림',
    '구로디지털단지', '신대방', '신림',
    '봉천', '서울대입구', '낙성대',
    '사당', '방배', '서초',
    '교대', '강남', '역삼',
    '선릉', '삼성'
]);
assert.deepStrictEqual([...route3].length, Subway.stationCount());

const iter3 = route3.iterator();
while (true) {
    const { value, done } = iter3.next();
    if (done) break;
    console.log(value);
}

console.log('========1정거장 테스트========');

const route4 = new Subway('홍대입구', '합정');
assert.deepStrictEqual([...route4], ['홍대입구', '합정']);

const iter4 = route4.iterator();
while (true) {
    const { value, done } = iter4.next();
    if (done) break;
    console.log(value);
}