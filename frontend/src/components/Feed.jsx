import React, {useState, useEffect} from 'react';
import {useParams} from "react-router-dom";

import {client} from "../client";
import {feedQuery, searchQuery} from "../utils/data";
import Masonry_feed from './Masonary/Masonry_feed';
import Spinner from "./Spinner"


function Feed() {
  const [loading, setLoading] = useState(false);
  const [pins, setPins] = useState(null);

const catagory = useParams();

  useEffect(()=> {

    setLoading(true);
    if(catagory.cateforyId){
      const query = searchQuery(catagory.cateforyId);
      client.fetch(query).then((data)=> {
        console.log("searchquery", data)
        setPins(data)
        setLoading(false)
      })
    }else{
      client.fetch(feedQuery)
      .then((data)=>{
        console.log("feedQuery" ,data)
        setPins(data);
        setLoading(false)
      })
    }
  },[catagory.cateforyId])

  if(loading) return <Spinner message="We are adding new photos of users"/>;

  return (
    <div>
       <div >
      {pins && <Masonry_feed pins={pins}/>}
    </div>
    </div>
  )
}

export default Feed
