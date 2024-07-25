import assert from 'assert/strict';

function _0723_1() {
    /**
     * 타입 서술어를 사용해 [string, number] 타입으로 추론 될 수 있도록 하기
     */

    // 정답 제출 코드
    const isStringNumber = (value: unknown): value is [string, number] =>
        Array.isArray(value)
        && value.length === 2
        && typeof value[0] === 'string'
        && typeof value[1] === 'number';

    const f1 = (value: number | string | boolean | [string, number]) => {
        if (isStringNumber(value)) {
            console.log(value[0].toUpperCase(), value[1].toFixed());
        }
    };

    f1(['han', 10]);
    f1('han');
    f1(true);
    f1(27);

    /**
     * 타입 서술어로 사용해 생성한 Retriever 타입이 Dog 타입인 지 검증하기
     */
    interface Animal { }
    interface Dog extends Animal {
        name: string;
    }
    interface Cat extends Animal {
        punch(): void;
    }
    class Retriever implements Dog {
        name: string;
        constructor(name: string) {
            this.name = name;
        }
    }

    // 정답 제출 코드
    const isDog = (input: Animal): input is Dog => 'name' in input;

    const donggu = new Retriever('동구');
    console.log(isDog(donggu));
}

function _0723_2() {
    /**
     * T4의 타입을 T3와 동일하게 만들기
     */
    const constCart = {
        X: 1,
        Y: 2,
        Z: 3,
    } as const;

    type T3 = 1 | 2 | 3;
    type T4 = (typeof constCart)[keyof typeof constCart];
}

function _0723_3() {
    /**
     * 모든 throw 상황에서 에러 메시지 검출 가능하도록 타입 서술어 사용해 구현 
    */

    // 정답 제출 코드
    const isErrorObject = (error: unknown): error is Error =>
        error !== null
        && typeof error === 'object'
        && error instanceof Error
        && 'message' in error;

    try {
        // throw new Error('some error!!!!');   // 가
        throw 'some string error!!!';        // 나
        // throw ['some', 'array', 'error'];    // 다
        // throw null;                          // 라
    } catch (error) {
        isErrorObject(error) ? console.log(error.message) : console.log(String(error));
    }
}

function _0723_4() {
    // deleteArray 구현
    function deleteArray<T, K extends keyof T>
        (array: T[], startOrKey: number | K, endOrValue?: unknown) {
        if (typeof startOrKey === 'number') {
            return array.filter((_, i) =>
                i < startOrKey ||
                i > (typeof endOrValue === 'number' ? endOrValue - 1 : array.length));
        }
        return array.filter((v) => v && typeof v === 'object' && v[startOrKey] !== endOrValue);
    }

    const arr = [1, 2, 3, 4];
    assert.deepStrictEqual(deleteArray(arr, 2), [1, 2]);
    assert.deepStrictEqual(deleteArray(arr, 1, 3), [1, 4]);
    assert.deepStrictEqual(arr, [1, 2, 3, 4]);

    const Hong = { id: 1, name: 'Hong' };
    const Kim = { id: 2, name: 'Kim' };
    const Lee = { id: 3, name: 'Lee' };
    const users = [Hong, Kim, Lee];

    assert.deepStrictEqual(deleteArray(users, 2), [Hong, Kim]);
    assert.deepStrictEqual(deleteArray(users, 1, 2), [Hong, Lee]);
    assert.deepStrictEqual(deleteArray(users, 'id', 2), [Hong, Lee]);
    assert.deepStrictEqual(deleteArray(users, 'name', 'Lee'), [Hong, Kim]);

    console.log('모든 assert 통과');
}

function _0723_5() {

    /**
     * 맵드 타입 만들기
     */
    interface IUser {
        id: number;
        age: number;
        name: string;
    }

    interface IDept {
        id: number;
        age: string;
        dname: string;
        captain: string;
    }

    // 정답 제출 코드
    type Change<T, K extends keyof T, U> = {
        [key in keyof T]: key extends K ? U : T[key];
    }

    // 첫 번째 인수 타입의 키를 (두 번째 인수) 세 번째 타입으로 교체
    type DeptCaptain = Change<IDept, 'captain', IUser>;

    // 없는 키를 넣으면 error, 아래는 error 코드
    // type Err = Change<IDept, 'somekey', IUser>; // Error!!!
}

function _0723_6() {
    /**
     * 맵드 타입 만들기, reduce > stock[itemPrice.item] 코드 에러 고치기
     */
    type Item = { item: string; price: number };

    // 정답 제출 코드
    type ItemPrice<T, U> = {
        [k in keyof T]: T[k] extends string ? keyof U : T[k];
    };

    const stock = { X: 1, Y: 2, Z: 30 };

    const itemPrices: ItemPrice<Item, typeof stock>[] = [
        { item: 'X', price: 1000 },
        { item: 'Y', price: 2000 },
        { item: 'Z', price: 3000 },
    ];

    const total = itemPrices.reduce((curr, itemPrice) =>
        curr + stock[itemPrice.item] * itemPrice.price, 0);

    console.log(total);
}

function _0724_1() {
    interface IUser {
        id: number;
        age: number;
        name: string;
    }

    interface IDept {
        id: number;
        age: string;
        dname: string;
        captain: string;
    }

    // Combine 구현하기 / 정답 제출 코드
    type Combine<T, U> = {
        [key in keyof (T & U)]: (T & U)[key] extends never ? (T | U)[(keyof T) & (keyof U)] : (T & U)[key];
    };

    type ICombined = Combine<IUser, IDept>;
}

function _0724_2() {
    type FirstArgs<F extends (...args: any) => any> =
        F extends (...args: infer I) => any ? I[0] : never;

    type SecondArgs<F extends (...args: any) => any> =
        F extends (...args: infer I) => unknown ? I[1] : never;

    type Args<F extends (...args: any) => any> =
        F extends (...args: infer I) => unknown ? I[number] : never;

    function add(a: number, b: string) {
        return `${a} - ${b}`;
    }

    type A = FirstArgs<typeof add>;  // number
    type B = SecondArgs<typeof add>; // string
    type C = Args<typeof add>;       // number | string

    type AU = Args<typeof String.prototype.endsWith>;
    // ⇒ string | number | undefined

    type AN = Args<typeof String.prototype.charAt>;
    // ⇒ number
}

function _0724_3() {
    type FullUser = Record<string, string | number>;

    // ex2) 다음 객체들을 하나로 합쳐(extend) 보세요.
    let users: FullUser[] = [
        { name: 'Hong' },
        { age: 23 },
        { id: 1, addr: 'Seoul' },
    ];

    const ret: FullUser = users.reduce((acc, user) => ({ ...acc, ...user }));
    console.log(ret);
}

function _0724_4() {
    // regist 함수가 다음과 같을 때 파라미터 처리를 해보세요.
    function registUserObj({ name, age }: { name: string; age: number }) {
        const id = 100;
        return { id, name, age };
    }

    type MyParameters<F extends (...args: any) => any> =
        F extends (...args: infer I) => any ? I[number] : never;

    type RegistUserObj = MyParameters<typeof registUserObj>;

    const paramObj: RegistUserObj = { name: 'Hong', age: 32 };
    const newUser2 = registUserObj(paramObj);
    console.log('newUser2:', newUser2);
}

function _0724_5() {
    type MyReturnType<F extends (...arsg: any) => any> =
        F extends (...args: any) => infer I ? I : never;

    function debounce(cb: (...args: any) => void, ms: number) {
        let timer: MyReturnType<typeof setTimeout> | null = null;

        return (...args: unknown[]) => {
            if (timer) clearTimeout(timer); // setTimeout을 취소하고
            timer = setTimeout(cb, ms, ...args); // 다시 등록한다.
        }
    }

    function throttle(cb: (...args: any) => void, ms: number) {
        let timer: MyReturnType<typeof setTimeout> | null = null;

        return (...args: unknown[]) => {
            if (timer) return; // 시간 범위 내 setTimeout 명령을 유지한다.
            timer = setTimeout(() => {
                cb(...args);
                timer = null; // 한 번 실행 후 다시 실행되기 위해 초기화한다.
            }, ms);
        }
    }

    // test
    const debo = debounce(a => console.log(a + 1), 1000);
    for (let i = 10; i < 15; i++) debo(i);   // 15

    const thro = throttle(a => console.log(a + 1), 1000);
    for (let i = 10; i < 15; i++) thro(i);   // 11
}

console.log('\n아래 결과에 나타나지 않는 함수는 타입 확인 과제입니다.');

[_0723_1, _0723_3, _0723_4, _0723_6, _0724_3, _0724_4, _0724_5].forEach((func) => {
    console.log(`\n------- ${func.name} -------`);
    func();
});