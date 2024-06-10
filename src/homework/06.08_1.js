(() => {
    const signiture1 = (user = {}) => {
        console.log(user.id, user.name);
    }

    const signiture2 = ({ id, name } = {}) => {
        console.log(id, name);
    }

    const signiture3 = ({ id: userId, name: userName } = {}) => {
        console.log(userId, userName);
    }

    const signiture4 = ({ id = -1, name = 'unknown' } = {}) => {
        console.log(id, name);
    }

    const signiture5 = ({ id, ...info } = {}) => {
        const { name } = info;
        console.log(id, name);
    }

    const signiture6 = (...args) => {
        const [{ id, name }] = args.length === 0 ? [{}] : args;
        console.log(id, name);
    }

    const init = () => [
        [
            { id: 1, name: 'Hong' },
            { id: 2, name: 'Lee' },
            { id: 3, name: 'Han' },
            { id: 4, name: 'youn', addr: 'seoul' },
            { name: 'chan', lv: 10, str: 10 },
            { lv: 20, str: 16 },
            {}
        ], [
            signiture1,
            signiture2,
            signiture3,
            signiture4,
            signiture5,
            signiture6
        ]];

    (() => {
        const [datas, funcs] = init();
        for (let func of funcs) {
            console.log('------------');
            for (let data of datas) {
                func(data);
            }
        }
    })();
})();