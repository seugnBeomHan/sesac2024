// regist 함수가 다음과 같을 때 파라미터 처리를 해보세요.
function registUserObj({ name, age }: { name: string; age: number }) {
    const id = 100;
    return { id, name, age };
}

type Parameters<T extends (...args: any) => any> =
    T extends (...args: infer I) => any ? I[number] : never;

type RegistUserObj = Parameters<typeof registUserObj>;

const paramObj: RegistUserObj = { name: 'Hong', age: 32 };
const newUser2 = registUserObj(paramObj);
console.log('🚀  newUser2:', newUser2);