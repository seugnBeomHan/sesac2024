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

type Combine<T, U> = {
    [key in keyof (T & U)]: (T & U)[key] extends never ? (T | U)[(keyof T) & (keyof U)] : (T & U)[key];
};

type ICombined = Combine<IUser, IDept>;