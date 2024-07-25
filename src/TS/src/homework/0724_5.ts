type MyReturnType<F extends (...arsg: any) => any> =
    F extends (...args: any) => infer I ? I : never;

function debounce(cb: (...args: any) => void, ms: number) {
    let timer: MyReturnType<typeof setTimeout> | null = null;

    return (...args: unknown[]) => {
        if (timer) clearTimeout(timer);
        timer = setTimeout(cb, ms, ...args);
    }
}

function throttle(cb: (...args: any) => void, ms: number) {
    let timer: MyReturnType<typeof setTimeout> | null = null;

    return (...args: unknown[]) => {
        if (timer) return;
        timer = setTimeout(() => {
            cb(...args);
            timer = null;
        }, ms);
    }
}

// test
const debo = debounce(a => console.log(a + 1), 1000);
for (let i = 10; i < 15; i++) debo(i);   // 15

const thro = throttle(a => console.log(a + 1), 1000);
for (let i = 10; i < 15; i++) thro(i);   // 11
