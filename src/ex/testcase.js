import assert from 'assert/strict';
import { keyPair, reduce, Emp, telfmt, searchByKoreanInitialSound, Stack, Queue, ArrayList, printCalender, neverOverflow } from './test_2.js';

리듀스();
키페어();
프록시();
전화번호_정규식();
초성_검색();
캘린더();
네버_오버플로우();
컬렉션();

function 키페어() {
    assert.deepStrictEqual(keyPair([1, 3, 4, 5], 7), [1, 2]);
    assert.deepStrictEqual(keyPair([1, 4, 45, 6, 10, 8], 16), [3, 4]);
    assert.deepStrictEqual(keyPair([1, 2, 4, 3, 6], 10), [2, 4]);
    assert.deepStrictEqual(keyPair([1, 2, 3, 4, 5, 7], 9), [3, 4]);
    assert.deepStrictEqual(keyPair([1, 2, 2, 3, 4, 4, 5, 7], 9), [4, 6]);
    assert.deepStrictEqual(keyPair([1, 2, 3, 4, 5, 7], 12), [4, 5]);
}

function 리듀스() {
    assert.deepStrictEqual(reduce([1, 2, 3], (acc, cur) => acc + cur), 6);
    assert.deepStrictEqual(reduce([1, 2, 3, 4, 5], (acc, cur) => acc + cur), 15);
    assert.deepStrictEqual(reduce([1, 2, 3, 4, 5], (acc, cur) => acc * cur), 120);
    assert.deepStrictEqual(reduce([2, 2, 2], (acc, cur) => acc * cur), 8);
    assert.deepStrictEqual(reduce([3, 3, 3], (acc, cur) => acc * cur), 27);
    assert.deepStrictEqual(reduce([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], (acc, cur) => acc + cur), 55);
    assert.deepStrictEqual(reduce(['han', 'seung', 'beom'], (acc, cur) => acc += cur), 'hanseungbeom');
}

function 프록시() {
    const hongConstructor = new Emp();
    hongConstructor.fullName = 'Kildong Hong';
    assert.deepStrictEqual(hongConstructor.fullName, 'Kildong HONG');
    assert.deepStrictEqual(hongConstructor.firstName, 'Kildong');
    assert.deepStrictEqual(hongConstructor.lastName, 'HONG');

    hongConstructor.fullName = 'LEE';
    assert.deepStrictEqual(hongConstructor.fullName, 'Kildong LEE');
    assert.deepStrictEqual(hongConstructor.firstName, 'Kildong');
    assert.deepStrictEqual(hongConstructor.lastName, 'LEE');
}

function 전화번호_정규식() {
    assert.deepStrictEqual(telfmt('021234567'), '02-123-4567');
    assert.deepStrictEqual(telfmt('0101234567'), '010-123-4567');
    assert.deepStrictEqual(telfmt('0331234567'), '033-123-4567');
    assert.deepStrictEqual(telfmt('0212345678'), '02-1234-5678');
    assert.deepStrictEqual(telfmt('01012345678'), '010-1234-5678');
    assert.deepStrictEqual(telfmt('07012341234'), '070-1234-1234');
    assert.deepStrictEqual(telfmt('050712345678'), '0507-1234-5678');
    assert.deepStrictEqual(telfmt('15771577'), '1577-1577');
}

function 초성_검색() {
    const datas = ['강원도 고성군', '고성군 토성면', '토성면 북면', '북면', '김1수'
        , '네이버', '다음', '아스키코드표', '아스키 코드표', '유니코드', '한글 초성', 'ASCII 코드표'];
    assert.deepStrictEqual(searchByKoreanInitialSound(datas, 'ㄴㅇ'), ['네이버']);
    assert.deepStrictEqual(searchByKoreanInitialSound(datas, 'ㄷㅇ'), ['다음']);
    assert.deepStrictEqual(searchByKoreanInitialSound(datas, 'ㄱ ㅊ'), ['한글 초성']);
    assert.deepStrictEqual(searchByKoreanInitialSound(datas, 'ㅇㄴ'), ['유니코드']);
    assert.deepStrictEqual(searchByKoreanInitialSound(datas, 'ㅇㅅㅋ'), ['아스키코드표', '아스키 코드표']);
    assert.deepStrictEqual(searchByKoreanInitialSound(datas, 'ㅇㅅㅋ '), ['아스키 코드표']);
    assert.deepStrictEqual(searchByKoreanInitialSound(datas, 'ASC'), ['ASCII 코드표']);
    assert.deepStrictEqual(searchByKoreanInitialSound(datas, 'ㄷ ㄱ'), ['강원도 고성군']);
    assert.deepStrictEqual(searchByKoreanInitialSound(datas, 'ㄱ ㅌ'), ['고성군 토성면']);
    assert.deepStrictEqual(searchByKoreanInitialSound(datas, 'ㄱㅅㄱ'), ['강원도 고성군', '고성군 토성면']);
    assert.deepStrictEqual(searchByKoreanInitialSound(datas, 'ㅌㅅㅁ'), ['고성군 토성면', '토성면 북면']);
    assert.deepStrictEqual(searchByKoreanInitialSound(datas, 'ㅂㅁ'), ['토성면 북면', '북면']);
    assert.deepStrictEqual(searchByKoreanInitialSound(datas, 'ㅍㅁ'), []);
    assert.deepStrictEqual(searchByKoreanInitialSound(datas, 'ㄱㄴ'), []);
    assert.deepStrictEqual(searchByKoreanInitialSound(datas, 'ㅅㅁ'), ['고성군 토성면', '토성면 북면']);
    assert.deepStrictEqual(searchByKoreanInitialSound(datas, 'ㄱ1ㅅ'), ['김1수']);
}

function 컬렉션() {
    const stack = new Stack([1, 2, 3, 4, 5]);
    assert.deepStrictEqual(stack.toArray(), [1, 2, 3, 4, 5]);
    stack.push(10);
    assert.deepStrictEqual(stack.toArray(), [1, 2, 3, 4, 5, 10]);
    stack.pop();
    stack.pop();
    stack.pop();
    assert.deepStrictEqual(stack.toArray(), [1, 2, 3]);
    assert.deepStrictEqual(stack.toString(), '[1, 2, 3]');
    assert.deepStrictEqual(stack.peek(), 3);
    assert.deepStrictEqual(stack.isEmpty(), false);
    assert.deepStrictEqual(stack.pop(), 3);
    assert.deepStrictEqual(stack.pop(), 2);
    assert.deepStrictEqual(stack.isEmpty(), false);
    assert.deepStrictEqual(stack.pop(), 1);
    assert.deepStrictEqual(stack.isEmpty(), true);
    stack.push(10);
    stack.push(20);
    stack.push(30);
    stack.push(40);
    assert.deepStrictEqual(stack.toArray(), [10, 20, 30, 40]);
    assert.deepStrictEqual(stack.toString(), '[10, 20, 30, 40]');
    assert.deepStrictEqual(stack.size(), 4);
    const stackIter = stack.iterator();
    assert.deepStrictEqual(stackIter.next().value, 40);
    assert.deepStrictEqual(stackIter.next().done, false);
    assert.deepStrictEqual(stackIter.next().value, 20);
    assert.deepStrictEqual(stackIter.next().value, 10);
    assert.deepStrictEqual(stackIter.next().done, true);
    stack.clear();
    assert.deepStrictEqual(stack.size(), 0);
    assert.deepStrictEqual(stack.toString(), '[]');
    assert.deepStrictEqual(stack.toArray(), []);

    const queue = new Queue([1, 2, 3, 4, 5]);
    assert.deepStrictEqual(queue.toArray(), [1, 2, 3, 4, 5]);
    queue.enqueue(10);
    assert.deepStrictEqual(queue.toArray(), [10, 1, 2, 3, 4, 5]);
    queue.dequeue();
    queue.dequeue();
    queue.dequeue();
    assert.deepStrictEqual(queue.toArray(), [10, 1, 2]);
    assert.deepStrictEqual(queue.toString(), '[10, 1, 2]');
    assert.deepStrictEqual(queue.peek(), 2);
    assert.deepStrictEqual(queue.isEmpty(), false);
    assert.deepStrictEqual(queue.dequeue(), 2);
    assert.deepStrictEqual(queue.dequeue(), 1);
    assert.deepStrictEqual(queue.isEmpty(), false);
    assert.deepStrictEqual(queue.dequeue(), 10);
    assert.deepStrictEqual(queue.isEmpty(), true);
    queue.enqueue(10);
    queue.enqueue(20);
    queue.enqueue(30);
    queue.enqueue(40);
    assert.deepStrictEqual(queue.toArray(), [40, 30, 20, 10]);
    assert.deepStrictEqual(queue.toString(), '[40, 30, 20, 10]');
    assert.deepStrictEqual(queue.size(), 4);
    const queueIter = queue.iterator();
    assert.deepStrictEqual(queueIter.next().value, 10);
    assert.deepStrictEqual(queueIter.next().done, false);
    assert.deepStrictEqual(queueIter.next().value, 30);
    assert.deepStrictEqual(queueIter.next().value, 40);
    assert.deepStrictEqual(queueIter.next().done, true);
    queue.clear();
    assert.deepStrictEqual(queue.size(), 0);
    assert.deepStrictEqual(queue.toString(), '[]');
    assert.deepStrictEqual(queue.toArray(), []);

    const list = new ArrayList([1, 2, 3, 4, 5]);
    assert.deepStrictEqual(list.toArray(), [1, 2, 3, 4, 5]);
    list.add(10);
    assert.deepStrictEqual(list.toArray(), [1, 2, 3, 4, 5, 10]);
    list.remove(10);
    list.remove(4);
    list.remove(2);
    assert.deepStrictEqual(list.toArray(), [1, 3, 5]);
    assert.deepStrictEqual(list.toString(), '[1, 3, 5]');
    assert.deepStrictEqual(list.peek(), 1);
    assert.deepStrictEqual(list.isEmpty(), false);
    list.remove();
    assert.deepStrictEqual(list.toArray(), [1, 3, 5]);
    list.add(10);
    list.add(20);
    list.add(30);
    list.add(40);
    assert.deepStrictEqual(list.toArray(), [1, 3, 5, 10, 20, 30, 40]);
    assert.deepStrictEqual(list.toString(), '[1, 3, 5, 10, 20, 30, 40]');
    assert.deepStrictEqual(list.size(), 7);
    list.remove(1);
    list.remove(3);
    list.remove(5);
    const listIter = list.iterator();
    assert.deepStrictEqual(listIter.next().value, 10);
    assert.deepStrictEqual(listIter.next().done, false);
    assert.deepStrictEqual(listIter.next().value, 30);
    assert.deepStrictEqual(listIter.next().value, 40);
    assert.deepStrictEqual(listIter.next().done, true);
    list.clear();
    assert.deepStrictEqual(list.size(), 0);
    assert.deepStrictEqual(list.toString(), '[]');
    assert.deepStrictEqual(list.toArray(), []);
    list.add(10);
    list.add(20);
    list.add(30);
    list.add(40);
    list.add(50);
    assert.deepStrictEqual(list.toString(), '[10, 20, 30, 40, 50]');
    assert.deepStrictEqual(list.toArray(), [10, 20, 30, 40, 50]);
    assert.deepStrictEqual(list.get(2), 30);
    assert.deepStrictEqual(list.get(4), 50);
    assert.deepStrictEqual(list.get(0), 10);
    assert.deepStrictEqual(list.get(-1), undefined);
    list.set(0, 100);
    assert.deepStrictEqual(list.get(0), 100);
    assert.deepStrictEqual(list.toArray(), [100, 20, 30, 40, 50]);
    list.set(4, 100);
    assert.deepStrictEqual(list.toArray(), [100, 20, 30, 40, 100]);
    assert.deepStrictEqual(list.indexOf(30), 2);
    assert.deepStrictEqual(list.contains(40), true);
    list.remove(100);
    list.remove(100);
    assert.deepStrictEqual(list.toArray(), [20, 30, 40]);
    assert.deepStrictEqual(ArrayList.arrayToList(list.toArray()), { value: 20, next: { value: 30, next: { value: 40, next: undefined } } })
    assert.deepStrictEqual(ArrayList.listToArray(ArrayList.arrayToList(list.toArray())), [20, 30, 40]);
}

function 캘린더() {
    printCalender('2024-01-05');
    printCalender('2024-02-15');
    printCalender('2024-03-24');
    printCalender('2024-04-11');
    printCalender('2024-05-3');
    printCalender('2024-06-1');
    printCalender('2024-07-4');
    printCalender('2024-08-30');
    printCalender('2024-09-29');
    printCalender('2024-10-17');
    printCalender('2024-11-13');
    printCalender('2024-12-9');
}

function 네버_오버플로우() {
    assert.deepStrictEqual(neverOverflow(10000), 50005000);
    assert.deepStrictEqual(neverOverflow(100000), 5000050000);
    assert.deepStrictEqual(neverOverflow(1000000), 500000500000);
    assert.deepStrictEqual(neverOverflow(10000000), 50000005000000);
    assert.deepStrictEqual(neverOverflow(100000000), 5000000050000000);
    // assert.deepStrictEqual(neverOverflow(1000000000), 500000000500000000);
}