import Post from "./Post";
const NewsFeed = ({posts}) => {

  return (
    <div className="px-2 mt-3">
      {posts.map((post) => (
        <Post post={post} key={post._id}></Post>
      ))}
    </div>
  );
};

export default NewsFeed;
