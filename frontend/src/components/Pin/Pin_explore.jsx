import React, { useState, useEffect } from "react";
import { AiFillSave } from "react-icons/ai";
import { MdDownloadForOffline } from "react-icons/md";
import { client } from "../../client";
import Spinner from "../Spinner";

function Pin_sidebar({ pin, category, user }) {
  const [postHovered, setPostHovered] = useState(false);

  const [title, setTitle] = useState("");
  const [about, setAbout] = useState("");
  const [loading, setLoading] = useState(true);
  const [destination, setDestination] = useState();


  useEffect(() => {
    setTitle(pin.alt_description);
    setAbout(pin.description);
    setDestination(pin.links.download);
  }, []);

  const saveToProfile = () => {
    setLoading(false)
    console.log(title, about, destination, user, category);
 
    const doc = {
      _type: "pin",
      title,
      about,
      destination,
      userId: user?._id,
      postedBy: {
        _type: "postedBy",
        _ref: user?._id,
      },
      category,
    };
    console.log(doc);
    client.create(doc).then((data) => {
      setLoading(true)
    });
  };

  return (
    <div className="m-2">
      <div
        onMouseEnter={() => setPostHovered(true)}
        onMouseLeave={() => setPostHovered(false)}
        className=" relative cursor-zoom-in w-auto hover:shadow-xl rounded-lg overflow-hidden transition-all duration-500 ease-in-out"
      >
        {pin && (
          <img
            className="rounded-lg w-full "
            src={pin.urls.small}
            alt={pin.alt_description}
          />
        )}
        {postHovered && (
          <div>
            {loading ? (
              <div
                className="absolute top-0 w-full h-full flex flex-col justify-between p-1 pr-2 pt-2 pb-2 z-50"
                style={{ height: "100%" }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    <a
                      href={pin.links.download}
                      download
                      target={"blank"}
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                      className="bg-white w-9 h-9 p-2 rounded-full flex items-center justify-center text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none"
                    >
                      <MdDownloadForOffline />
                    </a>
                  </div>
                </div>
                <div className=" flex justify-start items-center gap-2 w-full">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      saveToProfile();
                    }}
                    className="bg-white p-2 flex rounded-full  flex items-center justify-center text-dark opacity-75 hover:opacity-100 outline-none"
                  >
                    <AiFillSave className="w-4 h-4" />
                  </button>
                  <h2 className="font-bold">Save to my profile</h2>
                </div>
              </div>
            ) : (
              <div   className="absolute top-0 w-full h-full flex flex-col justify-between p-1 pr-2 pt-2 pb-2 z-50"
              style={{ height: "100%" }}>
                <Spinner/>
              </div>
            )}
          </div>
        )}
      </div>
      <div className="flex gap-2 mt-2 items-center">
        <img
          className="w-8 h-8 rounded-full object-cover"
          src={pin.user.profile_image.small}
          alt="user-profile"
        />
        <p className="font-semibold capitalize">{pin.user.first_name}</p>
      </div>
    </div>
  );
}

export default Pin_sidebar;
