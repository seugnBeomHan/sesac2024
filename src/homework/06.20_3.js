const getNextDay = (() => {
    const weeks = ['일', '월', '화', '수', '목', '금', '토'];
    let day = 0;
    return () => {
        if ((day += 1) === weeks.length) day = 0;
        return `${weeks[day]}요일`;
    };
})();

(() => {
    let cnt = 0;
    const timer = setInterval(() => {
        console.log('call', (cnt += 1), getNextDay());
        if (cnt === 7   ) {
            clearInterval(timer);
        }
    }, 500);
})();