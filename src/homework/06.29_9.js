const drawCalender = (date) => {
    if (typeof date !== 'string') return;

    const draw = () => {
        const calender = [['일', '월', '화', '수', '목', '금', '토']];
        let oneWeek = [];

        for (let i = 1; i <= MONTH_OF_FULL_DAYS[month - 1]; i += 1) {
            oneWeek[startDateOfWeek++] = i;

            if (startDateOfWeek === WEEK_COUNT) {
                startDateOfWeek = 0;
                calender.push(oneWeek);
                oneWeek = [];
            }
        }
        calender.push(oneWeek);

        console.log(`\n${inputDate.getFullYear()}년 ${month}월`)
        console.table(calender);
    };

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
    const WEEK_COUNT = 7;

    const [month, day] = date.split('/');
    const inputDate = new Date(new Date().getFullYear(), month - 1, day);
    let startDateOfWeek = inputDate.getDate() - ((day - 1) % WEEK_COUNT);

    draw();
};

/**
 * 입력 양식 제한 (년도는 올해)
 * string: mm/dd
 */
const today = new Date();
drawCalender(`${today.getMonth() + 1}/${today.getDay()}`);