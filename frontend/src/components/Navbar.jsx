import React, { useRef } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { IoMdAdd, IoMdSearch } from "react-icons/io";
import { categories } from "../utils/data";
import { AiOutlineArrowRight, AiOutlineArrowLeft } from "react-icons/ai";

const isNotActiveStyle =
  "flex rounded-2xl flex-none my-1 bg-gray-100 items-center px-3 gap-3 text-gray-700 mx-3 hover:text-black transition-all duration-200 ease-in-out capitalize";
const isActiveStyle =
  "flex text-white  rounded-2xl my-1 shadow-md  flex-none items-center bg-gray-700 px-3 mx-3 gap-3   border-black  transition-all duration-200 ease-in-out capitalize";

function Navbar({
  searchTerm,
  setSearchTerm,
  user,
  exploreBool,
  setExploreBool,
}) {
  const navigate = useNavigate();
  const catagoriesRef = useRef(null);

  const onMoreCatagories = (amount) => {
    console.log(catagoriesRef.current.scrollLeft);
    catagoriesRef.current.scrollLeft += amount;
  };

  return (
    <>
      {exploreBool && (
        <div className="">
          <div className="flex gap-2 md:gap-5 mt-5 pb-7">
            <div className="flex justify-start items-center w-full px-2 rounded-md bg-white border-none outline-none focus-within:shadow-sm">
              <IoMdSearch fontSize={21} className="ml-1" />

              <input
                type="text"
                className="-2 w-full bg-white outline-none"
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search..."
                onFocus={() => navigate("/search")}
              />

           
            </div>
            <div className="flex  gap-3">
              <Link
                to={`user-profile/${user?._id}`}
                className="hidden md:block"
              >
                <img
                  src={user?.image}
                  alt="User Photo"
                  className="w-14 h-12 rounded-lg "
                />
              </Link>
              <Link
                to="/create-pin"
                className="bg-black text-white rounded-lg w-12 h-12 md:w-14 md:h-12 flex justify-center items-center"
              >
                <IoMdAdd />
              </Link>
            </div>
          </div>
          <div
            className="flex overflow-x-scroll hide-scrollbar flex-wrap"
            ref={catagoriesRef}
          >
            {/* <span onClick={()=>onMoreCatagories(-50)} className='absolute -4   w-9 flex justify-center items-center h-5'>
              <AiOutlineArrowLeft  fontSize={23}/>
            </span> */}
            {categories.map((category) => (
              <NavLink
                to={`/category/${category.name}`}
                className={({ isActive }) =>
                  isActive ? isActiveStyle : isNotActiveStyle
                }
                key={category.name}
              >
                {/* <img src={category.image} className="w-8 flex-none h-8 rounded-full shadow-sm" /> */}
                {category.name}
              </NavLink>
            ))}
            {/* <span onClick={()=>onMoreCatagories(50)} className='absolute right-4   w-9 flex justify-center items-center h-5'>
              <AiOutlineArrowRight  fontSize={23}/>
            </span> */}
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
