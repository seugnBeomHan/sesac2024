let timerId = setTimeout(function tick() {
    /**
     * 여기에 주기적으로 진행할 코드를 넣어주면 된다.
     * 이렇게 되면 실행하는 시간은 실행 주기에 포함되지 않는다.
     * 온전히 딜레이 타임을 보장 받을 수 있다.
    */
    console.log('째깍');
    timerId = setTimeout(tick, 2000); // 위 로직이 실행되고, 재귀 형태로 기명 함수를 콜백함수로 제공 함으로써 딜레이 타임이 보장된다.
    clearTimeout(timerId); // 해당 함수를 통해 최초 1회 실행 후(가장 바깥쪽에 있는 2000ms 딜레이) 다시 실행 스케줄링 하게 되는데 이후 clear 하기 때문에 실행이 종료 된다.
}, 2000);