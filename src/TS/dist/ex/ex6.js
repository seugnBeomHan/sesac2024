function once(cb) {
    let isCalled = false;
    return function (carNum1, carNum2) {
        if (isCalled)
            return;
        isCalled = true;
        setTimeout(() => { isCalled = false; }, 1000);
        return cb(carNum1, carNum2);
    };
}
const onceFn = once((x, y) => `금일 운행금지 차량은 끝번호 ${x}, ${y}입니다!`);
setInterval(() => {
    console.log(onceFn(Math.round(Math.random() * 9 + 1), Math.round(Math.random() * 9 + 1)));
}, 200);
export {};
