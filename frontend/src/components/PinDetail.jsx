import React, { useEffect, useState } from 'react';
import { MdDownloadForOffline } from 'react-icons/md';
import { Link, useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import { pinDetailMorePinQuery, pinDetailQuery } from '../utils/data';
import {client, urlFor} from "../client";
import Masonry_feed from "./Masonary/Masonry_feed";
import Spinner from "./Spinner"

function PinDetail({user}) {
  const {pinId} = useParams();
  const {pins, setPins} = useState();
  const [pinDetail, setPinDetail] = useState(true);
  const [comment, setComment] = useState('');
  const [addingComment, setAddingComment] = useState(false);


  const fetchPinDetails = () => {
    const query = pinDetailQuery(pinId);

    if(query){
      client.fetch(query).then((data) => {
        setPinDetail(data[0]);
        if(data){
          const query1 = pinDetailMorePinQuery(data[0]);
          client.fetch(query1).then((response) => {
            setPins(response)
          })
        }
      })
    }
  }


  useEffect(() => {
    fetchPinDetails();
  }, [pinId]);








  return (
    <div>
        {pinDetail && (
          <div className="flex xl:flex-row flex-col m-auto bg-white" style={{ maxWidth: '1500px', borderRadius: '32px'}}>
            <div className="flex justify-center items-center md:items-start flex-initial">
              <img
                className='rounded-t-3xl rounded-b-lg'
                src={(pinDetail?.image && urlFor(pinDetail?.image).url())}
                alt="user-post"
              />
            </div>
            <div className='w-full p-5 flex-1 xl:min-w-620'>
              <div className='flex items'>

              </div>

            </div>
          </div>
        )}
    </div>
  )
}

export default PinDetail
