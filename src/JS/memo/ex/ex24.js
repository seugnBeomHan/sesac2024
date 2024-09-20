let count = 0;
function turn10(timer) {
    console.log('interval', new Date());
    count++;
    if (count === 10) {
        clearInterval(timer);
    }
    ;
}

const inter = setInterval(function () {
    turn10(inter);
}, 1000);