import { prompt } from "../Prompt.js";

let code = '';
prompt.on('line', input => {
    code += input;
});

prompt.on('close', () => {
    const run = new Function(code);
    run();
});