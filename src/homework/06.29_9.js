const printCalender = (date) => {
    if (typeof date !== 'string') return;

    const makeCalender = () => {
        const calender = [['일', '월', '화', '수', '목', '금', '토']];
        let oneWeek = [];

        for (let i = 1; i <= MONTH_OF_FULL_DAYS[month - 1]; i += 1) {
            oneWeek[startDayOfMonth] = i;

            if ((startDayOfMonth += 1) === WEEK_COUNT) {
                startDayOfMonth = 0;
                calender.push(oneWeek);
                oneWeek = [];
            }
        }
        calender.push(oneWeek);
        return calender;
    };

    const draw = () => {
        console.log(`\n${inputDate.getFullYear()}년 ${month}월`)
        console.table(makeCalender());
    };

    const getInputDate = () => {
        return new Date(new Date().getFullYear(), month - 1, day);
    }

    const getStartDayOfMonth = () => {
        const result = inputDate.getDay() - ((day - 1) % WEEK_COUNT);
        return result < 0 ?
            result + WEEK_COUNT :
            result;
    };

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

    const [month, day] = date.split('/');
    const inputDate = getInputDate();
    let startDayOfMonth = getStartDayOfMonth();

    draw();
};

/**
 * 입력 양식 제한 (년도는 올해)
 * string: mm/dd
 */
const today = new Date();
printCalender(`${today.getMonth() - 5}/${14}`);
printCalender(`${today.getMonth() - 4}/${22}`);
printCalender(`${today.getMonth() - 3}/${30}`);
printCalender(`${today.getMonth() - 2}/${5}`);
printCalender(`${today.getMonth() - 1}/${1}`);
printCalender(`${today.getMonth()}/${15}`);
printCalender(`${today.getMonth() + 1}/${today.getDay()}`);
printCalender(`${today.getMonth() + 2}/${25}`);
printCalender(`${today.getMonth() + 3}/${18}`);
printCalender(`${today.getMonth() + 4}/${6}`);
printCalender(`${today.getMonth() + 5}/${3}`);
printCalender(`${today.getMonth() + 6}/${15}`);