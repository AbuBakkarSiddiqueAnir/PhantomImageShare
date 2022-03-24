import React, { useState, useRef, useEffect } from "react";
import { HiMenu } from "react-icons/hi";
import { AiFillCloseCircle } from "react-icons/ai";
import { Link, Route, Routes } from "react-router-dom";

import { Sidebar, UserProfile } from "../components";
import Pins from "../container/Pins";
import phantomshare from "../assests/phantomshare.png";
import { userInfo } from "../utils/userInfo";
import { userQuery } from "../utils/data";
import { client } from "../client";

function Home() {
  const [toogleSidebar, setToggleSidebar] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const query = userQuery(userInfo?.googleId);

    client
      .fetch(query)
      .then((data) => {
        setUser(data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="flex bg-gray-50 md:flex-row flex-col h-screen transition-height duration-75 ease-out">
      <div className="hidden md:flex h-screen flex-initial">
        <Sidebar />
      </div>
      <div
        className="flex md:hidden flex-row "
        style={{ backgroundColor: "#005A5A" }}
      >
        <div className="p-2 py-2 w-full flex flex-row justify-between items-center shadow-md">
          <HiMenu
            fontSize={40}
            className="cursor-pointer"
            onClick={() => setToggleSidebar(!toogleSidebar)}
          />
          <Link to="/">
            <img src={phantomshare} alt="phantomshare_logo" className="w-40" />
          </Link>
          <Link to={`user-profile/${user?._id}`}>
            <img src={user?.image} alt="user" className="w-14 rounded-lg" />
          </Link>
        </div>
        {toogleSidebar && (
          <div className="fixed w-4/5 bg-white h-screen overflow-y-auto shadow-lg z-10 animate-slide-in">
            <div className="absolute w-full flex justify-end items-center p-2">
              <AiFillCloseCircle
                fontSize={30}
                className="cursor-pointer text-white"
                onClick={() => setToggleSidebar(false)}
              />
            </div>
            <Sidebar closeToggle={setToggleSidebar} user={user && user} />
          </div>
        )}
      </div>
      <div className="pb-2 flex-1 h-screen overflow-y-scroll">
        <Routes>
          <Route path="/user-profile/:userId" element={<UserProfile />} />
          <Route path="/*" element={<Pins user={user && user} />} />
        </Routes>
      </div>
    </div>
  );
}

export default Home;
