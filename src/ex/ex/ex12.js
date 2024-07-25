// 할인율 적용
const discount = () => {
    const DC_RATE = 0.2;
    return price => price * DC_RATE;
}

const items = [
    { item: '삼겹살', price: 2100 },
    { item: '목살', price: 1900 },
    { item: '항정살', price: 2300 },
    { item: '앞다리살', price: 1400 },
];

const dc = discount();
for (const { item, price } of items) {
    console.log(`${item}: ${price}원 ==> ${price - dc(price)}원`);
}

// 동시 접속자 수 확인
const concurrentUserCounting = () => {
    let count = 0;
    return {
        getCount() {
            return count;
        },
        entry() {
            count += 1; // === count = count + 1;
        },
        exit() {
            count <= 0 ? count = 0 : count -= 1;
        }
    }
};

const DAY_RESERVED_USER = Math.round((Math.random() * 40)) + 10;
const userCountChecker = concurrentUserCounting();

for (let i = 0; i < DAY_RESERVED_USER; i += 1) {
    const userState = Math.random() * 3 < 2 ? '입장' : '퇴장';

    userState === '입장' ? userCountChecker.entry() : userCountChecker.exit();
    console.log(`현재 입장객 : ${userCountChecker.getCount()}명`);
}

console.log(`오늘 예약: ${DAY_RESERVED_USER}명 / 현재 입장객: ${userCountChecker.getCount()}명`);