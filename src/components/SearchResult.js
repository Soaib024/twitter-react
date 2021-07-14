import Post from "./Post";
import User from "./User";
const SearchResult = ({ results, tab }) => {
  return (
    <div className="mt-4 p-2">
      {Array.isArray(results) &&
        results.map((result) =>
          tab === "post" ? (
            <Post post={result} key={result._id}></Post>
          ) : (
            <User user={result} key={result._id}></User>
          )
        )}

        {results.length === 0 && <p>Nothing to show</p>}
    </div>
  );
};

export default SearchResult;
