import React from 'react';
import GoogleLogin from "react-google-login";
import {useNavigate} from "react-router-dom";
import {FcGoogle} from "react-icons/fc";
import shareVideo from "../assests/share.mp4";
import phantomshare from "../assests/phantomshare.png";
import logo_ from "../assests/logo_.png"
import {client} from "../client"

function Signin() {
  const navigate = useNavigate();

  const responseFromGoogle = (response) => {
    console.log(response)
      localStorage.setItem("user",JSON.stringify(response.profileObj));
      const {name, googleId, imageUrl} = response.profileObj;

      const userDoc = {
        _id: googleId,
        _type: "user",
        userName: name,
        image: imageUrl
      }
      client.createIfNotExists(userDoc).then(()=>{
        navigate("/",{
          replace: true
        })
      }).catch((err)=>{
        console.log(err)
      })
  }

  return (
    <div className='flex justify-start items-center flex-col h-screen'>
      <div className='relative w-full h-full'>
        <video
          src={shareVideo}
          type="video/mp4"
          loop
          controls={false}
          muted
          autoPlay
          className="object-cover w-full h-full "
        />
        <div className='absolute bg-blackOverlay -mt-20 flex flex-col sm:flex-row justify-center items-center right-0 left-0 top-0 bottom-0'>
          <div className='shadow-2xl'>
            <img src={phantomshare} width="299px" alt="logo"/>
          </div>
          <div className='w-1 bg-white h-24 rounded-lg m-5 hidden sm:block'>

          </div>

          <div className='shadow-2xl'>
            <GoogleLogin
              clientId='18946301269-ridgb1rtpo8qs6b46dam1i1b78mgomfu.apps.googleusercontent.com'
              render= {
                (renderProps)=>(
                  <button 
                    type='button'
                    disabled={renderProps.disabled}
                    onClick={renderProps.onClick}
                    className='bg-mainColor mt-1 flex cursor-pointer outline-nobe justify-center p-2 rounded-lg items-center'
                  >
                    <FcGoogle className='mr-4'/> Sign in with Google              </button>
                )
              }
              onSuccess={responseFromGoogle}
              onFailure={responseFromGoogle}
              cookiePolicy="single_host_origin"
            >

            </GoogleLogin>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Signin
