import React, { useEffect, useState } from "react";
import axios from "axios";
import News from "./News";
import { API } from './../backend';


const Sidebar = () => {
  const [news, setNews] = useState([]);
  useEffect(() => {
    axios
      .get(`${API}/news`)
      .then((res) => setNews(JSON.parse(res.data)))
      .catch(err => console.log(err))
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
