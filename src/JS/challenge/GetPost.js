const postURL = "https://jsonplaceholder.typicode.com/posts?userId=1";

const getPosts = async () => {
  const httpPosts = await fetch(postURL);
  const posts = await httpPosts.json();
  const httpComents = await Promise.all(
    posts.map((post) => {
      return fetch(
        `https://jsonplaceholder.typicode.com/posts/${post.id}/comments`
      );
    })
  );
  const coments = await Promise.all(
    httpComents.map((coment) => {
      return coment.json();
    })
  );
  return [posts, coments];
};

getPosts()
  .then((arr) => {
    const [posts, coments] = arr;
    console.log(posts);
    console.log(coments);
  })
  .catch((err) => {
    console.log(err);
  });
