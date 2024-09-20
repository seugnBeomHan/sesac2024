const user = { name: 'Hong', passwd: 'xyz', addr: 'Seoul' };

const getValueExceptInitial = inputKey => {
    const { [inputKey]: value } = user;
    const [, ...result] = value;
    return result.join('');
}

console.log(getValueExceptInitial('name')); // 'ong'
console.log(getValueExceptInitial('passwd')); // 'yz'
console.log(getValueExceptInitial('addr')); // 'eoul'