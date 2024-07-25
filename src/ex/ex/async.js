const sampleUrl = 'https://jsonplaceholder.typicode.com/users/1';
// const myFetch = url => fetch(url).then((res) => res.json());

// myFetch(sampleUrl).then(user => {
//     console.log('user>>>', user);
// });

// fetch(sampleUrl).then((res) => res.json()).then((user) => { console.log(user) });

// const fetchPromi = fetch(sampleUrl);
// const jsonPromi = fetchPromi.then((res) => res.json());
// const consolePromi = jsonPromi.then((user) => console.log(user))
//     .catch((err) => {
//         console.error(err);
//         finish = true;
//     });

// console.log(fetchPromi === jsonPromi);
// console.log(jsonPromi === consolePromi);
// console.log(consolePromi === fetchPromi);

// console.log('동기 처리 종료');

const fetchArr = Array.from({ length: 10 }, (_, i) => i)
    .map((i) => fetch(`https://jsonplaceholder.typicode.com/users/${i + 1}`));

Promise.all(fetchArr)
    .then((arr) => {
        return Promise.all(arr.map((response) => { return response.json(); }));
    })
    .then((users) => {
        console.log(users);
    })
    .catch((err) => { console.log(err) });