import React from 'react';
import Masonry from "react-masonry-css";

import Pin_feed from "../Pin/Pin_feed";

const breakpointColumnsObj = {
  default: 4,
  3000: 6,
  2000: 5,
  1200: 3,
  1000: 2,
  500: 1,
};

function Masonry_feed({pins}) {

  if(pins?.length<1){
    return(
      <div className='flex justify-center items-center h-full font-bold text-3xl mt-32 mx-3 w-full'>There is no pins available with this tag</div>
    ) 
  } 
  return (
    <Masonry className="flex animate-slide-fwd" breakpointCols={breakpointColumnsObj}>
    {pins?.map((pin) => <Pin_feed key={pin._id} pin={pin} className="w-max" />)}
  </Masonry>
  )
}

export default Masonry_feed
