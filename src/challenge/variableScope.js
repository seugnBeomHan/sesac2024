for (let i = 0; i < 5; i += 1) {
    setTimeout(() => { console.log(i); });
}

// var 일 때, let 일때, 변수 선언 시점에 따라 스코프 확인 및 결과 확인