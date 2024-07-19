function getValueExceptInitial(target, key) {
    const tmpTarget = target;
    const [, ...rest] = [...tmpTarget[key]];
    return rest.join('');
}
const user = { name: 'Hong', passwd: 'xyz', addr: 'Seoul' };
console.log(getValueExceptInitial(user, 'name')); // 'ong'
console.log(getValueExceptInitial(user, 'passwd')); // 'yz'
console.log(getValueExceptInitial(user, 'addr')); // 'eoul
export {};
