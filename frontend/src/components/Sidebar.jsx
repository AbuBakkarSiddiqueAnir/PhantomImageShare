import React,{useState, useEffect} from 'react';
import {NavLink, Link} from "react-router-dom";
import {RiHomeFill} from "react-icons/ri";
import {IoIosArrowForward} from "react-icons/io";
import {MdExplore} from "react-icons/md"
import phantomshare from "../assests/phantomshare.png";

import { categories , usersQuery} from '../utils/data';
import {client, urlFor } from "../client"


const isNotActiveStyle = 'flex items-center py-2 px-5 gap-3 text-gray-500 hover:text-black transition-all duration-200 ease-in-out capitalize';
const isActiveStyle = 'flex items-center px-5 gap-3 py-2   border-r-2 border-black  transition-all duration-200 ease-in-out capitalize';

// const isNotActiveStyle = 'flex items-center px-5 gap-3 text-gray-500 hover:text-black transition-all duration-200 ease-in-out capitalize';
// const isActiveStyle = 'flex items-center px-5 gap-3 font-extrabold border-r-2 border-black  transition-all duration-200 ease-in-out capitalize';

function Sidebar({closeToggle,toogleSidebar, user}) {
  const [users, setUsers] = useState([])

  const handleCloseSidebar = () => {
    closeToggle(!toogleSidebar)
  }

  useEffect(()=>{
    client.fetch(usersQuery()).then((data)=>{
  
      setUsers(data)
    }).catch((err)=>{
      console.log(err)
    })
  },[])


  return (
    <div className="flex flex-col justify-between bg-white h-full overflow-y-scroll min-w-210 hide-scrollbar">
    <div className="flex flex-col">
      <Link
        to="/"
        className="flex px-5 gap-2 my-6 pt-1 w-190 items-center"
        onClick={handleCloseSidebar}
      >
        {/* <img src={phantomshare} alt="logo" className="w-full" /> */}
        <p className='text-2xl'>Phantomshare</p>
      </Link>
      <div className="flex flex-col gap-5">

        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? isActiveStyle : isNotActiveStyle)}
          onClick={handleCloseSidebar}
        >
          <RiHomeFill />
          Home
        </NavLink>

        <NavLink
          to="/explore"
          className={({ isActive }) => (isActive ? isActiveStyle : isNotActiveStyle)}
          onClick={handleCloseSidebar}
        >
          <MdExplore />
          Explore
        </NavLink>
        
        <div>
        <h3 className="my-2 px-5 text-base 2xl:text-xl">Users</h3>

          {users.map((user) => (
            <NavLink
              to={`/user-profile/${user?._id}`}
              className={({ isActive }) => (isActive ? isActiveStyle : isNotActiveStyle)}
              onClick={handleCloseSidebar}
              key={user.userName}
            >
              <img src={user.image} className="w-8 h-8 rounded-full shadow-sm" />
              {user.userName}
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
        <img src={user.image} className="w-10 h-10 rounded-full" alt="user-profile" />
        <p>{user.userName}</p>
        <IoIosArrowForward />
      </Link>
    )}
  </div>
  )
}

export default Sidebar
