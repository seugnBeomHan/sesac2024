const postURL = 'https://jsonplaceholder.typicode.com/posts?userId=1';
const comentURL = `https://jsonplaceholder.typicode.com/posts/<postId>/comments`;

const getPosts = async () => {
    const httpPosts = await fetch(postURL);
    const posts = await httpPosts.json();
    const httpComents = await Promise.all(posts.map((post) => {
        return fetch(`https://jsonplaceholder.typicode.com/posts/${post.id}/comments`);
    }));
    const coments = await Promise.all(httpComents.map((coment) => {
        return coment.json();
    }));
    return [posts, coments];
}

getPosts().then((arr) => {
    for (const ele of arr) {
        console.log(ele);
    }
}).catch((err) => { console.log(err); });