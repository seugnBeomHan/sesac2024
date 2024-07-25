const promi = new Promise((resolve, reject) => {
    console.log('여긴 프로미스 1');
    setTimeout(() => {
        resolve('아마 then이 실행? 4');
    }, 1000);
    console.log('여긴 프로미스 생성자 끝 2');

});

const newPromi = promi.then((ret) => {
    console.log('이건 언제 실행? 3');
    console.log(ret);
});

console.log(newPromi);