import React from 'react';
import {Routes, Route, useNavigate} from "react-router-dom";
import Signin from "./components/Signin";
import Home from "./container/Home"

function App() {
  return (
   <Routes>
     <Route path="signin" element={<Signin/>}/>
     <Route path="/*" element={<Home/>}/>
   </Routes>
  )
}

export default App
