const func = (array, result) => {
    const len = array.length;

    for (let i = 0; i < len; i += 1) {
        const target = array[i];
        for (let j = i + 1; j < len; j += 1) {
            if (target + array[j] === result) return [i, j];
        }
    }
    return;
};
console.log(func([2, 4, 1, 8, 6, 3, 7, 9, 5], 15));