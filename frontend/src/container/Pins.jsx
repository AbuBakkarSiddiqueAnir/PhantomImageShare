import React ,{useState}from 'react';
import {Routes, Route} from "react-router-dom";

import {Navbar, Feed, PinDetail, CreatePin, Search} from "../components"

function Pins({user}) {
  const [searchTerm, setSearchTerm] = useState("")
  return (
    <div className='px-2 md:px-5'>
      <div className='bg-gray-50'>
        <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} user={user && user}/>

      </div>
      <div className='h-full'>
          <Routes>
          <Route path='/' element={<Feed/>}/>
          <Route path='/category/:cateforyId' element={<Feed/>}/>
          <Route path='/pin-detail/:pinId' element={<PinDetail/>}/>
          <Route path='/create-pin' element={<CreatePin/>}/>

          <Route path='/search' element={<Search/>}/>

          </Routes>
      </div>
      
    </div>
  )
}

export default Pins