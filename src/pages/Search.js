import { useEffect, useState } from "react";
import { search } from "../api/searchApi";
import SearchResult from "../components/SearchResult";
import Sidebar from "../components/Sidebar";
import Navbar from "./../components/Navbar";

const Search = () => {
  const [text, setText] = useState("");
  const [tab, selectedTab] = useState("user");
  const [results, setResults] = useState([]);
  const searchTextHandler = (e) => {
    setText(e.target.value);
    if(text.trim().length === 0){
      setResults([])
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (text.trim().length > 0) {
        search(tab, text).then((results) => setResults(results));
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [text, tab]);

  return (
    <div className="wrapper">
      <Navbar></Navbar>
      <main className="main">
        <div>
          <p className="text-center mt-4">Search</p>
          <div className="w-full flex justify-center">
            <input
              type="text"
              name=""
              id=""
              onChange={searchTextHandler}
              className="border-2  mt-4 p-2 w-full rounded-full focus:outline-none"
              placeholder="Search for post or user"
            />
          </div>
          <div className="flex text-center mt-4">
            <div
              className={`flex-grow  p-2 cursor-pointer ${
                tab === "user" ? "border-b border-twitter_blue p-2" : ""
              }`}
              onClick={() => {
                selectedTab("user");
                setResults([]);
              }}
            >
              Users
            </div>
            <div
              className={`flex-grow  p-2 cursor-pointer ${
                tab === "post" ? "border-b border-twitter_blue p-2" : ""
              }`}
              onClick={() => {
                selectedTab("post");
                setResults([]);
              }}
            >
              Posts
            </div>
          </div>
          {results && <SearchResult results={results} tab={tab}></SearchResult>}
        </div>
      </main>

      <Sidebar></Sidebar>
    </div>
  );
};

export default Search;
