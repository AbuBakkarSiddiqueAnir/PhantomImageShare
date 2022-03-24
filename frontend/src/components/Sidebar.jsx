import React, { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { RiHomeFill } from "react-icons/ri";
import { IoIosArrowForward } from "react-icons/io";
import { MdExplore } from "react-icons/md";
import phantomshare from "../assests/phantomshare.png";

import { categories, usersQuery } from "../utils/data";
import { client, urlFor } from "../client";
import avatar from "../assests/avatar.png"

const isNotActiveStyle =
  "flex text-white items-center py-2 px-5 gap-3   transition-all duration-200 ease-in-out capitalize";
const isActiveStyle =
  "flex text-white items-center px-5 gap-3 py-2 rounded-lg  border-r-8 border-white  transition-all duration-200 ease-in-out capitalize";

function Sidebar({ setToggleSidebar, user }) {
  const [users, setUsers] = useState([]);

  const handleCloseSidebar = () => {
    setToggleSidebar(false);
  };

  useEffect(() => {
    client
      .fetch(usersQuery())
      .then((data) => {
        setUsers(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div
      className="flex flex-col justify-between h-full overflow-y-scroll min-w-210 hide-scrollbar "
      style={{ backgroundColor: "#005A5A" }}
    >
      <div className="flex flex-col ">
        <Link
          to="/"
          className="flex px-5 gap-2 my-6 pt-1 w-190 items-center"
          onClick={handleCloseSidebar}
        >
          <Link to="/">
            <img src={phantomshare} alt="phantomshare_logo" className="w-40" />
          </Link>
        </Link>
        <div className="flex flex-col gap-5 ">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? isActiveStyle : isNotActiveStyle
            }
            onClick={handleCloseSidebar}
          >
            <RiHomeFill />
            Home
          </NavLink>

          <NavLink
            to="/explore"
            className={({ isActive }) =>
              isActive ? isActiveStyle : isNotActiveStyle
            }
            onClick={handleCloseSidebar}
          >
            <MdExplore />
            Explore
          </NavLink>

          <div>
            <h3 className="my-2 px-5 text-base 2xl:text-xl text-white">
              Users
            </h3>

            {users.map((user) => (
              <NavLink
                to={`/user-profile/${user?._id}`}
                className={({ isActive }) =>
                  isActive ? isActiveStyle : isNotActiveStyle
                }
                onClick={handleCloseSidebar}
                key={user.userName}
              >
               
                 {user?.image ? (<img src={user?.image} alt="user" className="w-8 h-8 rounded-lg" />):(<img className="w-8 h-8 rounded-lg"  src={avatar} alt="user_avatar"  />)}
                <span className="text-white">{user.userName}</span>
              </NavLink>
            ))}
          </div>
        </div>
      </div>
      {user && (
        <Link
          to={`user-profile/${user._id}`}
          className="flex my-5 mb-3 gap-2 p-2 items-center bg-white rounded-lg shadow-lg mx-3"
          onClick={handleCloseSidebar}
        >
          <img
            src={user.image}
            className="w-10 h-10 rounded-full"
            alt="user-profile"
          />
          <p>{user.userName}</p>
          <IoIosArrowForward />
        </Link>
      )}
    </div>
  );
}

export default Sidebar;
