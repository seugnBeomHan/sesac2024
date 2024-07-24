type FirstArgs<F> = F extends (a: (infer I), b: (infer J)) => string ? I : F;
type SecondArgs<F> = F extends (a: (infer I), b: (infer J)) => string ? J : F;
type Args<F> = F extends (a: (infer I), b: (infer J)) => string ? I | J : F;
type ArgsG<F> = F extends (...args: (infer I)[]) => unknown ? I : F;

function add(a: number, b: string) {
    return `${a} - ${b}`;
}

type A = FirstArgs<typeof add>;  // number
type B = SecondArgs<typeof add>; // string
type C = Args<typeof add>;    // number | string

type AU = ArgsG<typeof String.prototype.endsWith>;
// ⇒ string | number | undefined
type AN = ArgsG<typeof String.prototype.charAt>;
// ⇒ number