const someFn = (name, greeting) => console.log(`${greeting}, ${name}`);
const someFn2 = (id, nickname, email, level) =>
    console.log(`${id}/${nickname}/${email}/${level}`);

// 아래 함수를 완성하시오.
const template = (fn) => {
    const before = () => console.log('before....');
    const after = () => console.log('after...');

    return (...rest) => {
        before();
        fn(...rest);
        after();
    }
};

const temp = template(someFn);  // before → someFn → after 실행
const temp2 = template(someFn2);  // before → someFn2 → after 실행

temp('sico', 'hello');
temp2(1, 'lnsol', 'sico@gmail.com', 5);