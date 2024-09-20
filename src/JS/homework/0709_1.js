const depthTimer = (count) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(`depth${count}: `, new Date());
            if (count > 2) reject(new Error('Already 3-depth!!'));
            resolve((count += 1));
        }, count * 1000);
    });
};

console.log('depth0: ', new Date());
depthTimer(1).then(depthTimer).then(depthTimer).catch((err) => console.log(err));