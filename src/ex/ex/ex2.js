'use strict'
var xx;
function varFn() {
    var v;
    var vv;
    v = 1;
    {
        v = 2, vv = 3;
        console.log(v, vv, xx); // 2, 3, 9
    }
    console.log(v, vv); // 2, 3
}

function letFn() {
    let l;
    l = 1;
    {
        let l;
        let ll;
        l = 2;
        ll = 3;
        console.log(l, ll); // 2, 3
    }
    console.log(l); // ll은 존재하지 않는 변수가 되는 것
}

xx = 9;
varFn();
letFn();

function test() {
    this.get = function () {

    }

    this.set = () => {

    }

    //    static this.getName = function () {

    //  } // static 선언 불가
}

class Test2 {
    static getName() { }
}

