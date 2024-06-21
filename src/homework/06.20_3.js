const getNextDay = (() => {
    const days = ['일', '월', '화', '수', '목', '금', '토'];
    let day = 0;
    return () => {
        if ((day += 1) === days.length) day = 0;
        return `${days[day]}요일`;
    };
})();

(() => {
    let cnt = 0;
    const timer = setInterval(() => {
        console.log('call', (cnt += 1), getNextDay());
        if (cnt === 14) {
            clearInterval(timer);
        }
    }, 100);
})();