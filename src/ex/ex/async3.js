async function f() {
    const a = await 1;
    console.log(a);
    const b = await 2;
    console.log(b);
    return 3;
}

const ff = f();
ff.then((value) => { console.log(value) }); // 1

//

const sampleUrl = 'https://jsonplaceholder.typicode.com/users/1';

async function loadJson(url) {
    const response = await fetch(url);
    if (response.status === 200) {
        return response.json();
        // return await response.json(); 의 차이는?
    }
    throw new Error(response.status);
}

loadJson(sampleUrl)
    .then(({ name, username, email, address, phone }) => {
        console.log(name);
        console.log(username);
        console.log(email);
        console.log(address);
        console.log(phone);
    })
    .catch(console.log); // Error: 404

async function wait() {
    await new Promise((resolve) => setTimeout(resolve, 100));
    return 10;
}

function ffff() {
    wait().then(console.log);
}

ffff();
