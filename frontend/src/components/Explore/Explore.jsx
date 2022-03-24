import React,{useState, useEffect} from 'react';
import UnsplashApi from "./Api/Api";
import Mesonry_explore from "../Masonary/Masonry_explore"

function Explore() {
  const [searchTerm, setSearchTerm] = useState("");
  const [images, setImages] = useState([])

  useEffect(() => {
    const onSearchSubmit = async () => {
      try {
        const unsplashData = await UnsplashApi.get("/search/photos", {
          params: { query: searchTerm },
        });
        setImages(unsplashData.data.results);
        console.log(unsplashData.data.results);
      } catch (e) {
        console.log(e);
      }
    };

    if (searchTerm && !images.length) {
      var timeoutIdFirstTime = setTimeout(() => {
        onSearchSubmit();
      }, 300);
    } else if (searchTerm) {
      var timeoutIdOtherTimes = setTimeout(() => {
        onSearchSubmit();
      }, 300);
    }

    return () => {
      if (timeoutIdFirstTime) clearTimeout(timeoutIdFirstTime);
      if (timeoutIdOtherTimes) clearTimeout(timeoutIdOtherTimes);
    };
  }, [searchTerm]);

  return (
    <div>
      <input type="text" onChange={(e)=>setSearchTerm(e.target.value)} />
  
              <Mesonry_explore pins={images}/>
  
    </div>
  )
}

export default Explore
