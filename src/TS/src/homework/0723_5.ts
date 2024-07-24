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

type Change<T, K extends keyof T, U> = {
    [key in keyof T]: key extends K ? U : T[key];
}

// 첫 번째 인수 타입의 키를 (두 번째 인수) 세 번째 타입으로 교체
type DeptCaptain = Change<IDept, 'captain', IUser>;

// 없는 키를 넣으면 error
// type Err = Change<IDept, 'somekey', IUser>; // Error!!!
