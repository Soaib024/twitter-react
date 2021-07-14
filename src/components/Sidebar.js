import React, { useEffect, useState } from "react";
import axios from "axios";
import News from "./News";

require("dotenv").config();

const API_KEY = process.env.REACT_APP_NEWS_API;
const Sidebar = () => {
  const [news, setNews] = useState([]);
  useEffect(() => {
    axios
      .get(`https://newsapi.org/v2/top-headlines?country=in&apiKey=841f2885c75f494f81a7cda0ac1c1f80`)
      .then((res) => setNews(res.data.articles));
  }, []);
  return (
    <div className="hidden lg:ml-3 lg:r-3 lg:w-3/12 lg:block scrollbar-none overflow-scroll bg-white shadow-lg rounded-lg p-2">
      <div className="">
        <p className="text-lg text-gray-700 py-2 font-bold">What’s happening</p>
        {news.map((n, index) => (
          <News key={index} newsObj={n}></News>
        ))}
      </div>

    </div>
  );
};

export default Sidebar;
