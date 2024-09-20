const printCalender = (date) => {
    if (typeof date !== 'string') return;

    const WEEK_COUNT = 7;
    const MONTH_OF_FULL_DAYS = {
        0: 31,
        1: new Date().getFullYear() % 4 === 0 ? 29 : 28,
        2: 31,
        3: 30,
        4: 31,
        5: 30,
        6: 31,
        7: 31,
        8: 30,
        9: 31,
        10: 30,
        11: 31,
    };

    const [month, day] = date.split(new RegExp('/|\\.|-'));

    const makeCalender = () => {
        const CUR_MONTH = MONTH_OF_FULL_DAYS[month - 1];
        const calender = [['일', '월', '화', '수', '목', '금', '토']];
        let oneWeek = [];
        let startDayOfMonth = getStartDayOfMonth();

        for (let i = 1; i <= CUR_MONTH; i += 1) {
            oneWeek[startDayOfMonth] = i;

            if ((startDayOfMonth += 1) === WEEK_COUNT) {
                calender.push(oneWeek);
                startDayOfMonth = 0;
                oneWeek = [];
            }
        }
        calender.push(oneWeek);
        return calender;
    };

    const draw = () => {
        console.log(`\n${month}월`);
        console.table(makeCalender());
    };

    const getStartDayOfMonth = () => {
        const startDayOfMonth = makeDateObj().getDay() - ((day - 1) % WEEK_COUNT);
        return startDayOfMonth < 0 ?
            startDayOfMonth + WEEK_COUNT :
            startDayOfMonth;
    };

    const makeDateObj = () => {
        return new Date(new Date().getFullYear(), month - 1, day);
    }

    draw();
};

/**
 * 입력 양식 (년도는 올해)
 * string: mm/dd | mm.dd | mm-dd
 */
const today = new Date();
printCalender(`${today.getMonth() - 5}-${14}`);
printCalender(`${today.getMonth() - 4}-${22}`);
printCalender(`${today.getMonth() - 3}-${30}`);
printCalender(`${today.getMonth() - 2}/${5}`);
printCalender(`${today.getMonth() - 1}/${1}`);
printCalender(`${today.getMonth()}/${15}`);
printCalender(`${today.getMonth() + 1}.${today.getDay()}`);
printCalender(`${today.getMonth() + 2}.${25}`);
printCalender(`${today.getMonth() + 3}.${18}`);
printCalender(`${today.getMonth() + 4}-${6}`);
printCalender(`${today.getMonth() + 5}-${3}`);
printCalender(`${today.getMonth() + 6}-${15}`);