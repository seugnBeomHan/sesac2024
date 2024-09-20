Promise.resolve("foo")
    // 1. "foo"를 받고 "bar"를 추가한 다음 그 값으로 이행하여 다음 then에 넘겨줌
    .then(function (string) {
        return new Promise(function (resolve, reject) {
            setTimeout(function () {
                string += "bar";
                resolve(string);
            }, 1);
        });
    })
    // 2. "foobar"를 받고 그대로 다음 then에 넘겨준 뒤,
    // 나중에 콜백 함수에서 가공하고 콘솔에 출력
    .then(function (string) {
        setTimeout(function () {
            string += "baz";
            console.log(string, '3');
        }, 1);
        return string;
    })
    // 3. 이 부분의 코드는 이전의 then 블록 안의 (가짜) 비동기 코드에서
    // 실제로 문자열을 가공하기 전에 실행됨
    .then(function (string) {
        console.log(
            "마지막 Then: 앗... 방금 then에서 프로미스 만들고 반환하는 걸 까먹어서 " +
            "출력 순서가 좀 이상할지도 몰라요",
        );

        // 'baz' 부분은 setTimeout 함수로 비동기적으로 실행되기 때문에
        // 이곳의 string에는 아직 'baz' 부분이 없음
        console.log(string, '2');
    });

console.log('동기 코드 완료');