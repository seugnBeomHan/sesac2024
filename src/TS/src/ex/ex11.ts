import assert from 'assert/strict';



class Subway {
    private readonly LINE_2 = [
        '신도림', '대림', '구로디지털단지', '신대방', '신림', '봉천', '서울대입구', '낙성대',
        '사당', '방배', '서초', '교대', '강남', '역삼', '선릉', '삼성', '종합운동장', '잠실새내',
        '잠실', '잠실나루', '강변', '구의', '건대입구', '성수', '용답', '신답', '용두', '신설동',
        '뚝섬', '한양대', '왕십리', '상왕십리', '신당', '동대문역사문화공원', '을지로4가', '을지로3가',
        '을지로입구', '시청', '충정로', '아현', '이대', '신촌', '홍대입구',
        '합정', '당산', '영등포구청', '문래',
    ];

    private readonly start;
    private readonly end;
    private readonly isOver;

    constructor(start: string, end: string) {
        this.start = this.LINE_2.indexOf(start);
        this.end = this.LINE_2.indexOf(end);
        this.isOver = this.inputIsValid();
    }

    inputIsValid(): boolean {
        if ((this.start === -1 || this.end === -1) || this.start === this.end) {
            this.fail('잘못 된 입력입니다. 다시 입력하세요.');
        }

        return this.start > this.end;
    }

    private fail(msg: string): never {
        throw new Error(msg);
    }

    stationCount() {
        return this.makeOneWayArray().length;
    }

    iterator() {
        return this[Symbol.iterator]();
    }

    [Symbol.iterator]() {
        const line_2 = this.makeOneWayArray();
        let index = 0;

        return {
            next() {
                return {
                    value: line_2[index++],
                    done: index > line_2.length
                }
            }
        }
    }

    private makeOneWayArray() {
        return this.isOver ?
            [...this.LINE_2.slice(this.start, this.LINE_2.length), ...this.LINE_2.slice(0, this.end + 1)] :
            [...this.LINE_2.slice(this.start, this.end + 1)];
    }
}

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
assert.deepStrictEqual([...route3].length, route3.stationCount());

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

