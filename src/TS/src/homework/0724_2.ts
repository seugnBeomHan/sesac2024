type FirstArgs<F extends (...args: any) => any> =
    F extends (...args: infer I) => any ? I[0] : F;

type SecondArgs<F extends (...args: any) => any> =
    F extends (...args: infer I) => unknown ? I[1] : F;

type Args<F extends (...args: any) => any> =
    F extends (...args: infer I) => unknown ? I[number] : F;

function add(a: number, b: string) {
    return `${a} - ${b}`;
}

type A = FirstArgs<typeof add>;  // number
type B = SecondArgs<typeof add>; // string
type C = Args<typeof add>;       // number | string

type AU = Args<typeof String.prototype.endsWith>;
// ⇒ string | number | undefined

type AN = Args<typeof String.prototype.charAt>;
// ⇒ number