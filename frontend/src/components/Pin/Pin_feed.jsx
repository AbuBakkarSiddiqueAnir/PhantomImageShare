import React from 'react'
import { client, urlFor } from '../../client';



function Pin_feed({pin}) {
    const { postedBy, image, _id, destination } = pin;
  return (
    <div>
      <div>
      <img className="rounded-lg w-full " src={(urlFor(image).width(250).url())} alt="user-post" /> 
      </div>
    </div>
  )
}

export default Pin_feed
