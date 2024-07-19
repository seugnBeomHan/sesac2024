const weeks = ['일', '월', '화', '수', '목', '금', '토'];
const getNextWeek = (() => {
    let day = 0;
    return () => {
        return `${weeks[day++]}요일`;
    };
})();
let cnt = 0;
const timer = setInterval(() => {
    console.log('call', cnt, getNextWeek());
    if ((cnt += 1) === 7)
        clearInterval(timer);
}, 1000);
export {};
