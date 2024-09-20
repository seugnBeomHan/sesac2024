function fn() {
    let l1 = 1;
    var v1 = 2;
    function ifn() {
        return this?.x ?? 0 + l1;
    }
    if (v1 > 1) {
        let l2 = 3;
        var v2 = 4;
    }

    return ifn;
}

var y = fn().bind({ x: 10 });
let x = 1;
console.log(y());
