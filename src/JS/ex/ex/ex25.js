const dog = {
    name: 'Maxx',
    showMyName() {
        console.log(`My name is ${this.name}.`);
    },
    whatsYourName() {
        setTimeout(this.showMyName, 1000);
    }
};

dog.whatsYourName();

// same as weeks = '일월화수목금토' (: 유사배열객체)

// const getWeekName = (weekNo) => {
//     const WEEKS = '일월화수목금토';
//     return `${weeks[weekNo]}요일`;
// };


// const day = new Date().getDay();
// console.log(`오늘은 ${getWeekName(day)}입니다!`);
