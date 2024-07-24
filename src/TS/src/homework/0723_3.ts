/**
 * (error as Error).message
 * 위 코드는 강제로 Error를 형변환 했다.
 * 그렇다보니 2, 3번째 에러의 경우 undefined가 출력된다.
 * Error 타입이 아니기 때문에 message 프로퍼티가 존재하지 않기 때문이다.
 * 
 * 위 코드가 없다면 error는 unknown이 된다.
 * 이에 확실하게 타입을 주기 위해선 내로잉이 필요하다.
 * 
 * Error type만 걸러내고, 나머지는 string으로 내로잉 해 문자열을 출력한다.
 */

const isErrorObject = (error: unknown): error is Error => {
    if (error
        && typeof error === 'object'
        && error instanceof Error
        && 'message' in error) {
        return true;
    }
    return false;
}

try {
    // throw new Error('some error!!!!');   // 가
    // throw 'some string error!!!';        // 나
    throw ['some', 'array', 'error'];       // 다
} catch (error) {
    isErrorObject(error) ? console.log(error.message) : console.log(String(error));
}
