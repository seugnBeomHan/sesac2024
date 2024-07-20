import assert from 'assert/strict';

/**
 * 아래 코드의 핵심은 startOrKey: number | keyof T 선언이다.
 * 
 * T의 경우 어떤 값이든 들어올 수 있고, 커스텀 객체 배열이 들어온 경우 조회가 필요하다.
 * 
 * 하지만 startOrKey 타입이 string이 들어 온다면 객체를 조회할 방법이 없다.
 * TS 입장에서는 string 타입은 무한한 literal을 생성할 수 있고, 객체의 식별자라는
 * 보장이 없기 때문이다. 해서 조회가 불가능하다. 
 * 
 * 거기에 제네릭 타입이기 때문에 사용하는 쪽에서 as const로 readonly로 만들어
 * literal 화 한다고 해도 알 방법이 없다. 그렇기에 함수 시그니처에서 선언해야 한다.
 * 
 * 이때 필요한 게 keyof T 이다. 이는 들어오는 값을 T의 프로퍼티 키로 제한 하겠다는 것이다.
 * T는 함수가 호출되는 시점에 알려진다. 정해진다. 그렇기에 객체라면, 객체에 어떤 프로퍼티가
 * 존재하는지 TS는 알 수 있다.
 * 
 * 해서 들어올 수 있는 타입을 객체의 프로퍼티 키로 제한할 수 있고, 유니언 타입이기에
 * number에 대해서 내로잉이 진행된다면 남은 타입은 T의 프로퍼티 키라고 추론할 수 있게 된다.
 * 
 * 그렇기 때문에 filter 로직에서 arr 안에 담겨 있는 T 타입이 유효한 object로 추론되면
 * (내로잉을 통해) startOrKey로 순회가 가능한 것이다. 
 */

function deleteArray<T>
    (arr: T[], startOrKey: number | keyof T, endOrValue?: unknown) {
    if (typeof startOrKey === 'number') {
        return arr.filter((_, i) => {
            return i < startOrKey ||
                (typeof endOrValue === 'number' ? endOrValue - 1 : arr.length) < i;
        });
    }
    return arr.filter((e) => e && typeof e === 'object' && e[startOrKey] !== endOrValue);
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
