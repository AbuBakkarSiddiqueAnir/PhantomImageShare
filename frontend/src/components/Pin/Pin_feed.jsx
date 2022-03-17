import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { v4 as uuidv4 } from "uuid";
import { MdDownloadForOffline } from "react-icons/md";
import { AiTwotoneDelete } from "react-icons/ai";
import { BsFillArrowUpRightCircleFill } from "react-icons/bs";
import { BsHandThumbsUp, BsHandThumbsUpFill } from "react-icons/bs";
import { FiExternalLink } from "react-icons/fi";

import { client, urlFor } from "../../client";
import { userInfo } from "../../utils/userInfo";

function Pin_feed({ pin }) {
  const [postHoverved, setPostHoverved] = useState(false);
  const [thumbsUp, setThumbsUp] = useState(false);

  const navigate = useNavigate();
  const { postedBy, image, _id, destination } = pin;

  const user = userInfo;

  const deletePin = (id) => {
    client.delete(id).then(() => {
      window.location.reload();
    });
  };

  let ThumbedUps = pin?.thumbsUp?.filter(
    (item) => item?.postedBy._id === user?.googleId
  );

  const savePin = (id) => {
    setThumbsUp(true);

    if (ThumbedUps.length > 0) {
      client
        .patch(id)
        .setIfMissing({ thumbsUp: [] })
        .insert("after", "thumbsup[-1]", [
          {
            _key: uuidv4(),
            userId: user?.googleId,
            postedBy: {
              _type: "postedBy",
              _ref: user?.googleId,
            },
          },
        ])
        .commit()
        .then(() => {
          window.location.reload();
          setThumbsUp(false);
        });
    }
  };

  return (
    <div className="m-2">
      <div
        onMouseEnter={() => setPostHoverved(true)}
        onMouseLeave={() => setPostHoverved(false)}
        onClick={() => navigate(`/pin-detail/${_id}`)}
        className=" relative cursor-zoom-in w-auto hover:shadow-lg rounded-lg overflow-hidden transition-all duration-500 ease-in-out"
      >
        {image && <img className="rounded-lg w-full " src={urlFor(image).width(250).url()} alt="user-pin" />}

        {postHoverved && (
          <div
            className="absolute top-0 w-full h-full flex flex-col justify-between p-1 pr-2 pt-2 pb-2 z-50"
            style={{ height: "100%" }}
          >
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <a
                  href={`${image?.asset?.url}?dl=`}
                  download
                  onClick={(e) => e.stopPropagation()}
                  className="bg-white w-9 h-9 p-2 rounded-full text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none flex items-center justify-center"
                >
                  <MdDownloadForOffline />
                </a>
              </div>
              {destination?.slice(8).length > 0 ? (
                <a
                  href={destination}
                  target="_blank"
                  className="bg-white flex items-center gap-2 text-black font-bold p-2 pl-4 pr-4 rounded-full opacity-70 hover:opacity-100 hover:shadow-md"
                  rel="noreferrer"
                >
                  {" "}
                  <BsFillArrowUpRightCircleFill />
                  Destination
                </a>
              ) : undefined}
              {/* {
               */}
            </div>
            <div className=" flex justify-between items-center gap-2 w-full">
              {ThumbedUps?.length !== 0 ? (
                <button
                  type="button"
                  className=" opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none"
                >
                  {pin?.ThumbedUps?.length} <BsHandThumbsUp />
                </button>
              ) : (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    savePin(_id);
                  }}
                  type="button"
                  className=" opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none"
                >
                  <BsHandThumbsUpFill />
                </button>
              )}
              {postedBy?._id === user?.googleId && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    deletePin(_id);
                  }}
                  className="bg-white p-2 rounded-full w-8 h-8 flex items-center justify-center text-dark opacity-75 hover:opacity-100 outline-none"
                >
                  <AiTwotoneDelete />
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Pin_feed;
