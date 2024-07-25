console.log(c);
{
    var c = 3;
}

console.log(d);
console.log(a);
if (false) {
    var d = 4;
    a();
    function a() {
        console.log('never used');
    }
    a();
}