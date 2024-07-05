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
 *          toString                return string
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
 *          static arrayToList      return string({value: 1, next: {value: 2, next: {value: 3, next: undefined}}})
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

function debounce() { }
function throttle() { }
export function keyPair() { }
export function reduce() { }
export class Emp {
    firstName
    lastName
    constructor() {

    }
}
export function telfmt() { }
export function searchByKoreanInitialSound() { }
export class Collection { }
export class Stack extends Collection { }
export class Queue extends Collection { }
export class ArrayList extends Collection { }
export function printCalender() { }
export function neverOverflow() { }