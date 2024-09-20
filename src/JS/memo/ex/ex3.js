'use strict'

function test1() {
    const ran = Math.random() * 6 > 3 ? true : false;
    console.log(a);
    // ifInner(); // is not defined, 아예 존재하지 않는다고 판단한다. 
    if (ran) {
        console.log(`ran : ${ran}`);
        var a = 10;
        ifInner();
        function ifInner() {
            console.log('이건 어디에?');
        }
    }
    // ifInner(); // 이 역시 동일한 is not defined이다. use strict에서 function 선언문은 block scope 이다.
}
test1();