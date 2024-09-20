// function delay(ms) {
//     return new Promise((res, rej) => {
//         setTimeout(res, ms,);
//     });
// }

// delay(3000).then(() => console.log('3초후 실행'));

new Promise(function (resolve, reject) {
    setTimeout(() => resolve(1), 1000); // (*)
}).then(function (result) { // (**)
    console.log(result); // 1
    return result * 2;
}).then(function (result) { // (***)
    console.log(result); // 2
    return new Promise((res, rej) => { setTimeout(() => res(result), 1000); });
}).then(function (result) {
    console.log(result); // 4
    return result * 2;
});