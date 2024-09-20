/**
 * TS에서 JS에 있는 수만은 API의 타입일 알고, 매개변수와 반환 타입을 강제할 수 있는 이유는
 * lib.d.ts 라는 파일에 모든 JS API들에 대해서 타입 정의가 되어 있기 때문이다.
 *
 * 해서 우리는 JS에 기존 정의 된 모든 빌트인 함수 및 API에 타입을 적용해
 * 가져다 사용할 수 있게 되는 것이다.
 *
 * JSDoc을 통해 JS에서 타입스크립트의 타입 체킹 및 추론 기능을
 * 사용할 수 있다.
 *
 * 주석의 형태로 달아주면, TS 컴파일러가 이를 해석해 적용한다.
 *
 * //@ts-check 를 JS 파일에 적어주면 적용할 수 있다.
 *
 * 해서 기존 JS 레거시 역시 TS 컴파일러를 활용해
 * 안전하게 협업할 수 있다.
 *
 * /**
 * @param {number} num1
 * @param {number} num2
 * @returns {number}
 *
 * 함수마다 위와 같은 형태로 작성하면 타입에 대한 컴파일 타임 확인이 가능하다.
 */
const first = () => { console.log("Hello World"); };
first();
// 사용하는 경우 위 Humen 타입의 key - value가 모두 동일한 이름과 타입으로 구성되어야 한다.
// name > mame이라고 쓰면 안된다. 결국 내부 프로퍼티를 비교해 동일 타입인지 아닌지 확인하기 때문
const user = {
    name: "Han",
    age: 27,
    addr: "서울시",
    married: false
};
// enum 타입이다. enum의 경우 주로 상태 값들을 부여할 때 사용하는 타입이다.
// 원래는 문자열을 통해 const openState = 'OPEN' 이런식으로 작성해 사용했다.
// 하지만 이 방식의 문제는 문자열에 오타가 있다면 (openState === "OOPEN") false가 반환 되는 등의 문제가 있다.
// enum은 이를 완전히 방지하고, STATE 라는 타입이 생성되고, STATE에 정의 된 값만 자동완성을 통해 사용할 수 있다.
// 그렇기에 에러가 발생할 확률이 훨씬 낮아지고, STATE라는 타입을 활용해 더 명확하게 프로그래밍 할 수 있다. 
var STATE;
(function (STATE) {
    STATE[STATE["OPEN"] = 10] = "OPEN";
    // 기본은 0이지만 10으로 할 경우 CLOSE는 11의 값을 가진다.
    STATE[STATE["CLOSE"] = 11] = "CLOSE";
    STATE[STATE["ING"] = 12] = "ING";
    STATE[STATE["LENGTH"] = 13] = "LENGTH"; // 약간의 테크닉으로 이렇게 LENGTH를 잡아주면 0부터 시작하기에 전체 개수를 파악할 수 있다.
    // 나중에 반복문을 돌 때 index로 활용할 수도 있다.
})(STATE || (STATE = {}));
// 이렇게 상태 비교를 하면 훨씬 더 명확하고 안전하게 프로그래밍 할 수 있다.
// enum은 상태들의 묶음에 대한 새로운 타입 지정이다.
const isOpen = (state) => {
    return state === STATE.OPEN;
};
/**
 * 타입 추론 (Type Inference) 라고도 한다.
 * 입력 되는 값을 통해 해당 변수의 타입을 추론하는 것이다.
 *
 * const reteral 타입이 있다. const 변수의 특징인데 const의 경우
 * 처음 선언 시 값을 할당해야 하기 때문에 해당 값만 들어갈 수 있다는 의미의 타입이다.
 * 즉, 값까지 고정시키는 굉장히 구체적인 타입 선언이 되며, tsc 입장에서도 추론하기 편하다.
 *
 * 만약 타입을 지정할 수 없는 객체 리터럴의 경우 [as 타입] 을 사용해 명확하게 타입을 줄 수 있다.
 * [as 타입]을 캐스팅이라고 하며, 이 경우 객체 리터럴의 속성에 타입을 명확하게 지정할 수 있다.
 * 캐스팅을 통해 타입을 지정하면, 다른 타입의 값을 대입할 수 없어 좀더 안전한 프로그래밍이 가능하다.
 * as const의 경우 const 속성을 가진다.
*/
// 이건 바로 객체 리터럴을 생성한 경우이다. 타입을 따로 잡아주지 않아 동일 타입의 객체를
// 매번 값까지 이렇게 선언해야 한다. 이 경우 as 키워드를 사용할 수 있다.
const objA = {
    a: "a",
    b: 1,
    c: true
};
// 기본적으로 TS는 JS로 컴파일 되기 때문에 JS에 없는 기능은 컴파일 시점에 모두 사라진다.
// 즉 타입 관련 된 부분은 모두 사라진다고 볼 수 있다. 결국 JS에 있는 것들로만 코드를 구성할 것이기 떄문
/**
 * 기본적으로 any는 사용하지 않는다. any를 사용하는 것은 TS를 사용하는 이유에 반하기 떄문이다.
 * 어떤 타입이든 들어올 수 있다는 말은 곧, 타입을 체크하지 않겠다는 것이기 떄문.
 *
 * TS는 타입 추론 기능을 활용해 해당 타입에서 사용할 수 있는 메서드 및 함수의 자동 완성을 보여준다.
 * 만약 타입이 유니온 타입이라면 n개의 타입에서 모두 사용할 수 있는 메서드만 사용 가능하다.
 * 특정 타입에서만 사용할 수 있는 메서드느 사용할 수 없다. 해당 메서드를 가지지 않은 타입의 값도
 * 들어올 수 있기 때문이다. 유니온 타입은 항상 교집합 되어 있는 메서드만 사용할 수 있다.
 */
// 캐스팅 역시 남발하게 되면 TS를 제대로 사용하지 못할 수 있다. number 변수를 string으로 형변환 하는 게 가능하기 때문.
// 결국 any나 casting 같은 게 가능한 이유는 TS코드는 JS로 트랜스컴파일 되기 때문이다. JS에서는 모두 가능하기 때문.
// 해서 any나 강제 형변환 같은 기능은 최대한 사용하지 않고,
// 타입에 맞춰 프로그래밍 하는 게 중요하다.
// 즉 타입과 관련 된 코드는 결국 JS에서는 의미를 가지지 못한다.(네로잉을 위한 코드 등)
/**
 * 유니온은(Union) 타입을 병합하는 기능이다. 하나의 변수에 여러개의 타입을 지정할 수 있다.
 *
 * 이 경우 or로 타입이 지정되는데 number | string | boolean 일 경우
 * 해당 변수는 number or string or boolean 으로 평가되어 3개 타입의 값을 할당 받을 수 있다.
 *
 * 하지만 이 경우 각 타입의 고유한 메서를 사용하려고 하면, 문제가 생긴다.
 *
 * 런타임에 어떤 타입의 값이 들어올 지 TS는 모르기 때문에 위 3개 타입의 교집합에 해당하는 메서드만 사용할 수 있다.
 *
 * 해서 이를 해결하기 위해선 네로잉(narrowing)을 진행해 타입을 명확하게 하나로 좁혀줘야 한다.
 *
 * 또, 유니온은 타입 뿐 아니라 값을 지정할 수도 있다. 즉, 특정 값들만 들어올 수 있는 변수를 만들 수도 있다.
 * enum과 비슷한 기능을 하도록 할 수 있다는 것이다.
 */
/**
 * List의 타입 선언 시 (string | number)[] 와 string[] | number[] 는 다르다.
 *
 * (string | number)[]의 경우 하나의 [] 안에 string 값과 number 값이 모두 들어갈 수 있음을 의미한다.
 * const a = [1, 2, 3, '4', '5'];
 *
 * string[] | number[] 의 경우 하나의 [] 안에 각각 string과 number 값만 들어갈 수 있으며,
 * 이런 배열만 참조하는 변수라는 것이다.
 * const b = [1, 2, 3, 4, 5]; or const b = ['1', '2', '3', '4', '5'];
 */
/**
 * 타입스크립트가 객체 리터럴의 타입을 유추하는 방법은 내부 속성의 개수와 네이밍, 타입이다.
 * 이에 대한 비교를 통해 타입을 유추하며, 커스텀 객체 타입을 유니온으로 가져도, 내부 속성이 다르다면
 * 속성에 대한 값 입력 시 타입을 정확하게 유추할 수 있다.
 */
/**
 * 자주 사용되는 타입의 형태가 있을 경우 이를 type 키워드를 통해 선언해 놓고 사용하게 되면 재사용성을 높일 수 있다.
 */
// 타입에 대한 예외가 발생하면 추론을 할 수 있는지 논리적으로 생각해 보는 게 중요하다.
// intersection 이란 유니온에 반대 되는 개념으로 &로 타입을 엮을 수 있다.
// interface를 조합해 새로운 타입을 만들 때 사용할 수 있을 거 같다.
// type intersection = interface1 & interface2;
// 이 경우 intersection은 interface1과 2의 모든 속성을 필수로 가져야 하는 새로운 타입이 된다.
// 단 primitive 타입의 경우 number & string인 경우가 동시에 존재할 수 없기에 never가 된다.
// -------
/**
 * 경우의 수를 모두 외울 필요 없다.
 * 단지 타입이 추론 가능한 상황인지 논리적으로 생각해 볼 것.
 */
// -------
/**
 * Narrowing은 유니온 타입을 구체화 시키는 것을 말한다.
 * 유니온 타입은 여러개의 타입을 받을 수 있지만
 * 그렇기에 타입 전용 메서드를 호출 할 수 없다.
 *
 * 해서 이 경우 Narrowing을 통해 타입을 구체화 할 필요가 있는 것이다.
 *
 * 총 8가지로 나눠 볼 수 있다.
*/
// 1. Assignment Narrowing
// 특정 값을 할당 해서 구체화 진행
let narrowingA = true;
narrowingA; // 이 경우 true 값을 할당 했기 때문에 boolean 타입으로 구체화 된다.
//-----------------------------------------------------
// 2. type of Narrowing
// typeof 키워드를 활용해 변수의 값을 확인하고, 확인 된 값을 통해 타입을 구체화한다.
narrowingA = Math.random() > 0.5 ? 10 : '10'; // 이 경우 다시 number | string 타입이 되었다.
if (typeof narrowingA === 'string') {
    narrowingA; // 이 경우 무조건 string임을 런타임에도 확신할 수 있기에 string 타입으로 구체화 되었다.
}
else {
    narrowingA; // 이 경우 역시 무조건 number임을 확신할 수 있기에 number 타입으로 구체화 되었다.
}
// 이 시점에 boolean 타입이 없는 이유는 Math.random()을 통해 number | string 타입으로 구체화 했기 때문이다.
/**
 * typeof 연산자의 한계는 기본 primitive 타입만 비교 가능하다는 것이다.
 * 객체 역시 object로 전부 통일되어 결과가 나온다.
 * 즉, TS 문법을 활용해 정의 된 타입의 경우 비교가 되지 않는다.
 */
//-----------------------------------------------------
// 3. Truthiness Narrowing
// 2번 typeof Narrowing과 동일하다. 단, 따로 typeof 키워드를 사용하지 않고,
// 변수 자체로 그냥 true, false를 판단한다. if(변수) {} else {} 이런식으로.
// 하지만 이런식의 코드는 보는 사람으로 하여금 직관적이지 않기 때문에
// 웬만하면 조건식을 전부 작성해 주는 게 좋을 거 같다.
// 또, 타입을 위해서 조건식을 쓰는 게 비효율적일 거 같지만 어짜피
// 트랜스컴파일 되면 해당 내용은 다 삭제되기 떄문에 런타임에는
// 전혀 영향을 끼치지 않는다. TS에서만 타입 구체화를 위해 활용되는 것이다.
//-----------------------------------------------------
// 4. Equality Narrowing
// 만약 두 변수가 모두 유니온 타입일 때 비교를 한다면?
// 이땐 두 변수가 공통적으로 가지고 있는 타입의 값이 서로 비교가 되었을 땐
// 구체화 되지만 그 밖에 상황에서는 계속 유니온 타입을 유지할 것이다.
let narrowingB = Math.random() > 0.1 ? 'string' : true;
let narrowingC = Math.random() > 0.1 ? 'false' : 1;
console.log(narrowingB, typeof narrowingB);
console.log(narrowingC, typeof narrowingC);
if (narrowingB === narrowingC) { // 이렇게 할 경우 값까지 비교해 동일 타입이라도 true가 되지 않는다.
    // 타입 비교는 이런식으로 하면 안될 거 같다. typeof 연산자를 쓸 것
    narrowingB;
    narrowingC;
    console.log('서로 다른 string인데 들어올까?');
}
//-----------------------------------------------------
// 5. in operator Narrowing
// in 연산자는 객체 안에 key 이름을 비교하는 것이다.
// 비교할 key 이름 in 객체; 하게 되면
// 우항에 있는 객체 안에 좌항의 이름을 가진 key가 있는지 확인 후
// true, false를 반환하며, 이를 통해 객체 타입을 확인할 수 있다.
// 이때 key 이름은 string 형태로 작성해야 한다.
// string이 아니면 해당 값은 변수로 인식될 것이기 때문.
// 이게 가능한 이유는 결국 TS는 객체 리터럴 비교 시
// 내부 속성의 구성(key 이름, 타입, 개수 등)을 보고
// 객체의 타입을 구분하기 때문이다.
//-----------------------------------------------------
// 6. instenceof Narrowing
/**
 * instenceof 연산자의 경우  프로토타입 체인 안에서 속하는지를
 * 확인한다. 이때 자기보다 자식과의 비교는 확인할 수 없고
 * 자신의 부모와 그 위로 비교를 하며 우항에 있는 타입에 속하는지를 확인한다.
 * 프로토타입 체인을 따라 해당 되는지를 비교한다.
 */
//-----------------------------------------------------
// 7. discrimated Narrowing
/**
 * 만약 타입을 서로 합쳐야 하는 경우(공통된 속성이 있는 객체 등)
 * 하나에 옵셔널을 주면서 넣는 거 보다는 따로 따로 선언한 다음
 * type 키워드를 통해 하나의 type으로 커스텀 하는 게 낫다.
 *
 * 위와 같이 했을 때 얻을 수 있는 이점은 하나의 타입으로 구체화 되었을 때
 * 그 속성에 옵셔널이 없기 때문에 속성 역시 구체화가 된다는 것이다.
 *
 * 하지만 옵셔널이 있다면 하나의 타입으로 구체화가 되어도,
 * 옵셔널 속성은 | undifined를 가지게 될 것이다.
 *
 * 이는 결국 해당 타입을 온전히 사용할 수 없게 한다.
 */
//-----------------------------------------------------
// 8. exhaustiveness checking
/**
 * never를 이용한 타입 체킹 방법이다.
 * never 타입 변수는 never 타입 값만 받을 있다.
 * 어떤 게 never 타입일까?
 * 절대 값이 들어올 수 없는 상황에 있는 변수가 never 타입으로 구체화 된다.
*/
let nerrowingD = "string";
if (typeof nerrowingD === 'string') {
    nerrowingD;
}
else if (typeof nerrowingD === 'number') {
    nerrowingD;
}
else {
    /**
     * 여기에 들어오면 never가 된다. 애초에 위에서 모든 케이스를 적어주었기 때문이다.
     * 해서 이 곳에 절대 들어올 수 없다고 판단했고, 여기 선언되는 nerrowingD 변수는
     * never 타입이 된다.
     */
    const neverCheck = nerrowingD;
    // 만약 런타임 중에 값이 결정되고, 이 값이 유니온의 모든 타입을 아우를 수 있다면?
    // 그리고 nerrowingD 변수에 타입이 추가 된다면 어떻게 될까?
    // 이땐 neverCheck 타입의 변수가 에러가 뜰 것이다. 
    // 위에서 필터링 되지 않은 타입이 never 타입 변수에 할당 될 것이기 때문.
    // 이런 체크를 할 수 있다.
}
/**
 * 아래와 같이 사용할 수도 있다. 함수 시그니처를 타입으로 주게 되면
 * 이후 선언되는 파라미터 및 반환 타입을 명시하지 않아도 된다.
 *
 * 이미 타입으로 선언 된 시그니처에 매개변수 및 반환 타입이 명시되어 있기 때문에
 * 따로 구현 하는 쪽에서는 명시 하지 않아도 추론이 가능하기 때문이다.
 *
 * 함수 시그니처를 선언할 때 interface로 선언도 가능하다.
 * 여러개를 한 번에 묶어 선언할 수도 있다.
 */
const addCalcul = (num1, num2) => {
    return num1 + num2;
};
/**
 * 함수 오버로딩도 가능하다. 이때 구현은 하나의 함수만 하고,
 * 나머지 함수들은 함수 명은 동일하게 시그니처만 만들어도 된다.
 *
 * 단, 구현한 함수가 기준이 되어, 구현한 함수로 커버 가능한
 * 시그니처만 오버로딩이 가능하다. 구현한 함수엔 아예 없는
 * 타입을 가진다던가, 개수가 오히려 많다던가 하게 되면
 * 실제 구현부에서 런타임 시 오류가 발생할 수 있기 때문에
 * 에러가 발생한다. 해서 구현부가 있는 함수의 시그니처가 기준이 된다.
 *
 * 이때 변수 선언식으로 구현 된 함수는 오버로딩이 불가하다.
 * 애초에 const 및 let 키워드의 경우 호이스팅이 발생하지만
 * 변수의 선언만 호이스팅 되기 때문에 블록 스코프 내
 * 중복 정의가 될 수 없어 오버로딩이 불가하다.
 * function 키워드를 통해 선언 된 함수만 오버로딩이 가능하다.
 */
const overlodingEX = (num, str, bol) => {
    return { name: "han" };
};
// 아래 코드는 확장 불가능하다. 동일 프로퍼티에 대해 없는 타입으로 선언했기 때문
// interface Triangle extends Ractangle {
//     width: boolean;
//     height: boolean;
// }
// any는 쓰지 않는다!!!!!!!
// TS는 리스트의 인덱스를 확인하지 않는다. [9999] 이렇게 넣어도 에러를 뱉지 않는다.
// 그렇기 때문에 항상 직접 매직 넘버로 넣기 보다는 length 값을 반영한 변수를 통해
// 접근 하는 것이 안전하다.
/**
 * spread operator는 객체 및 배열 내부 값에 대해서 전부 또는 일부를
 * 다른 객체 및 배열에 빠르게 복사하는 문법으로 구조분해할당과 같이 쓰이는 경우가 많다.
 *
 * 구조분해할당은 객체 및 배열을 해체하여, 그 값을 개별 변수에 담을 수 있도록 해주는데
 * 하나의 배열에서 0, 1번째 인덱스의 값은 개별 변수에 각각 담고,
 * 이후 배열에 대해서는 다른 배열로 옮겨 담고자 할 때 같이 사용된다.
 *
 * [index0, index1, ...arrCopy] = arr;
 *
 * 위와 같은 경우 index0 = arr[0]; index1 = arr[1]; 과 동일하며
 * 나머지 배열 값은 arrCopy의 0번 부터 복사되어 들어가게 된다.
 *
 * 스프레드 문법과 구조분해할당을 같이 사용한 예시이다.
 */
// 2차원 배열은 const 2dArr : number[][] = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [10, 11, 12]];
// 위와 같이 선언하고 할당해 사용하면 된다. 배열 안에 배열이 위치한 상황으로
// 2차원 매트릭스로 보면 된다. 3차원 배열은 number[][][] 하면 된다.
/**
 * 기본적으로 튜블은 배열을 활용한 새로운 타입을 지정하는 것을 말한다.
 * 이때 배열 요소의 타입과 순서, 개수 등이 타입을 결정하게 된다.
 *
 * 만약 튜플 타입 선언 시 const로 선언하고, 안에 값을 넣어주게 된다면
 * 해당 값을 통해 타입과, 타입의 배치 순서를 추론하고,
 * 무조건 그 값만 들어올 수 있는 const 튜플이 된다.
 * const [지정한 값, 지정한 값, 지정한 값] 타입의 튜플인 셈이다.
 */
// 즉 아래와 같이 배열 요소의 타입과 순서, 개수로 튜플 타입을 생성했다.
// 이 경우 순서가 틀리거나 개수가 모자르거나, 타입이 잘못 들어온 경우
// 에러를 발생시키게 된다.
const tuple = [1, "", "", 2];
// tuple[2] = 10; // 이 경우 index 2번의 타입은 string인데 number를 넣고 있어 예외이다.
/**
 * named tuple의 경우 어떤 값을 입력해야 하는지 지정해 준 튜플이다.
 * 훨씬 직관적이고 협업할 때 해당 튜플을 사용하는 사람 입장에서
 * 도움이 되는 그런 기능이다.
 */
// 이렇게 되면 나중에 warrior 튜플을 쓸 때 각 자리에 어떤 값이 들어가야 하는지 확인이 된다.
let warrior;
const keyName = "name";
const keyAge = "age";
const keyGrade = "grade";
const keyClass = "class";
export {};