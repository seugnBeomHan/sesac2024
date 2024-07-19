type User = { name: string, passwd: string, addr: string };

function getValueExceptInitial(target: User, key: keyof User) {
    const tmpTarget = target;
    const [, ...rest] = [...tmpTarget[key]];
    return rest.join('');
}

const user: User = { name: 'Hong', passwd: 'xyz', addr: 'Seoul' };
console.log(getValueExceptInitial(user, 'name')); // 'ong'
console.log(getValueExceptInitial(user, 'passwd')); // 'yz'
console.log(getValueExceptInitial(user, 'addr')); // 'eoul