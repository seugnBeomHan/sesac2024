type ArrayItems<T> =
    T extends (infer Item)[]
    ? Item
    : T;
    
type StringItem = ArrayItems<string>;
type StringArrayItem = ArrayItems<string[]>;
type NumberArrayItem = ArrayItems<number[]>;
type BooleanArrayItem = ArrayItems<boolean[]>;
type StringArrayItem2 = ArrayItems<Array<string>>;
type String2DItem = ArrayItems<string[][]>;   