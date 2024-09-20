import * as readline from "readline";
export const prompt = readline.createInterface({
    input: process.stdin,
    // output: process.stdout
});



function* add() {
    const num1 = yield '첫 번째 수를 입력하세요.';
    const num2 = yield '두 번째 수를 입력하세요.';
    yield `결과는 ${num1 + num2}입니다.`;
}

const addIter = add();

console.log('시작하시려면 start 입력 후 enter를 눌러주세요.');

prompt.on('line', (input) => {
    if (input === 'start') {
        console.log(addIter.next().value);
    }

    const inputStrToNum = +input;
    if (Number.isInteger(inputStrToNum)) {
        const value = addIter.next(inputStrToNum).value;

        value !== undefined ?
            console.log(value) :
            prompt.close();
    }

}).on('close', () => {
    process.exit();
});