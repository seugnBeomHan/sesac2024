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

}

function throttle(cb, delay) {

}

export function reduce(array, cb, init, thisArg) {

}


export function keyPair(data, pair) {

}

export class Emp {

}

export function telfmt(tel) {

}

export function searchByKoreanInitialSound(words, initCho) {

}

// 월, 목, 금, 월, 수, 토, 월, 목, 일, 화, 금 일
export function printCalender(date) {

}

export function neverOverflow(factorial) {

}

export class Collection {

}

export class ArrayList extends Collection {

}

export class Stack extends Collection {

}

export class Queue extends Collection {

}