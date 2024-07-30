interface IUser {
    id: number;
    age: number;
    name: string;
}

interface IDept {
    id: number;
    age: string;
    dname: string;
    captain: string;
}

/**
 * U[(keyof T) & (keyof U)] 도 된다. 정확히는 IDept 타입이 오면 된다. 왜 되는지 모르겠다.
 * 처음 논리인 T | U가 유니언 상황에서 분배법칙 때문에 된다는 이유를 채택해 (T | U)로 제출
 */
// type Combine<T, U> = {
//     [key in keyof (T & U)]: (T & U)[key] extends never ? (T | U)[(keyof T) & (keyof U)] : (T & U)[key];
// };

type Combine<T, U> = {
    [k in keyof (T & U)]: k extends (keyof T & keyof U) ? T[k] | U[k] : (T & U)[k];
}

type ICombined = Combine<IUser, IDept>;