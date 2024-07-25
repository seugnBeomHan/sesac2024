// regist 함수가 다음과 같을 때 파라미터 처리를 해보세요.
function registUserObj({ name, age }) {
    const id = 100;
    return { id, name, age };
}
const paramObj = { name: 'Hong', age: 32 };
const newUser2 = registUserObj(paramObj);
console.log('🚀  newUser2:', newUser2);
export {};
