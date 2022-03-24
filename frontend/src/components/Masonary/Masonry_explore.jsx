import React from "react";
import Masonry from "react-masonry-css";


import Pin_explore from "../Pin/Pin_explore";

const breakpointColumnsObj = {
    default: 4,
    3000: 6,
    2000: 5,
    1200: 3,
    1000: 2,
    500: 1,
  };


function Masonry_sidebar ({pins, catagory, user}){
    return(
        
        <Masonry className="flex animate-slide-fwd" breakpointCols={breakpointColumnsObj}>
            {pins?.map((pin)=> <Pin_explore user={user} category={catagory} key={pin._id} pin={pin} className="w-max"/>)}

        </Masonry>
    )
}

export default Masonry_sidebar