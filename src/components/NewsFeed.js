import Post from "./Post";
const NewsFeed = ({posts}) => {

  return (
    <div className="p-2 mt-3 shadow-xl">
      {posts.map((post) => (
        <Post post={post} key={post._id}></Post>
      ))}
    </div>
  );
};

export default NewsFeed;
