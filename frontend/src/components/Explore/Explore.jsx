import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import UnsplashApi from "./Api/Api";
import Mesonry_explore from "../Masonary/Masonry_explore";
import { IoMdSearch } from "react-icons/io";

function Explore({ exploreBool, setExploreBool,user }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [images, setImages] = useState([]);
  const [catagory, setCatagory] = useState("")

  const loc = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (loc.pathname === "/explore") {
      setExploreBool(false);
    }
  }, []);

  useEffect(() => {
    setCatagory(searchTerm)
    const onSearchSubmit = async () => {
      try {
        const unsplashData = await UnsplashApi.get("/search/photos", {
          params: { query: searchTerm },
        });
        setImages(unsplashData.data.results);
        console.log(unsplashData.data.results);
      } catch (e) {
        console.log(e);
      }
    };

    if (searchTerm && !images.length) {
      var timeoutIdFirstTime = setTimeout(() => {
        onSearchSubmit();
      }, 300);
    } else if (searchTerm) {
      var timeoutIdOtherTimes = setTimeout(() => {
        onSearchSubmit();
      }, 300);
    }

    return () => {
      if (timeoutIdFirstTime) clearTimeout(timeoutIdFirstTime);
      if (timeoutIdOtherTimes) clearTimeout(timeoutIdOtherTimes);
    };
  }, [searchTerm]);

  useEffect(()=>{
  setSearchTerm(["random", "nm", "man", "rando", "nature","wallpaper", "ca", "do","ch", "oc", "river"][Math.floor(10*Math.random())])
  },[])

  return (
    <div className="">
      <div className="flex justify-start my-7 items-center px-2 rounded-md bg-white border-none outline-none focus-within:shadow-lg ">
        <IoMdSearch fontSize={21} className="ml-1" />
        <input
          type="text"
          className="h-11 w-full bg-white outline-none"
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search..."
        />
      </div>

      <Mesonry_explore  user={user} catagory={catagory} pins={images} />
    </div>
  );
}

export default Explore;
