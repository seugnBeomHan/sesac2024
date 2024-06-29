import * as readline from "readline";

const prompt = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function* add() {
    const num1 = yield '첫 번째 수를 입력해주세요.';
    const num2 = yield '두 번째 수를 입력해주세요.';
    return num1 + num2;
}

const addIter = add();

console.log(addIter.next().value);

prompt.on('line', (input) => {
    if (Number.isInteger(+input)) {
        const nextObj = addIter.next(+input);

        if (nextObj.done) {
            console.log(`Total: ${nextObj.value}`);
            prompt.close();
        }

        console.log(nextObj.value);
    }
}).on('close', () => process.exit());