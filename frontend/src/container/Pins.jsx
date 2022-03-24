import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import {
  Navbar,
  Feed,
  PinDetail,
  CreatePin,
  Search,
  Explore,
} from "../components";

function Pins({ user }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [exploreBool, setExploreBool] = useState(true);

  useEffect(()=>{
    console.log(user)
  },[])

  return (
    <div className="px-2 md:px-5 relative ">
     {
       user && (<div className="bg-gray-50 mb-2 ">
       <Navbar
         searchTerm={searchTerm}
         exploreBool={exploreBool}
         setExploreBool={setExploreBool}
         setSearchTerm={setSearchTerm}
         user={user && user}
       />
     </div>)
     } 
      <div className="h-full mt-4">
        <Routes>
          <Route path="/" element={<Feed />} />
          <Route path="/category/:cateforyId" element={<Feed />} />
          <Route
            path="/pin-detail/:pinId"
            element={<PinDetail user={user && user} />}
          />
          <Route
            path="/create-pin"
            element={<CreatePin user={user && user} />}
          />
          <Route
            path="/explore"
            element={
              <Explore
                exploreBool={exploreBool}
                setExploreBool={setExploreBool}
                user={user && user}
              />
            }
          />

          <Route
            path="/search"
            element={
              <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default Pins;
