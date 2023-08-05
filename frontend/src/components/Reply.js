import {
    ChartBarIcon,
    ChatIcon,
    DotsHorizontalIcon,
    HeartIcon,
    ShareIcon,
} from "@heroicons/react/outline";
import { useEffect, useState } from "react";
import Moment from "react-moment";
import { useDispatch } from "react-redux";
import { get_tweet_id, modal_on } from "../actions/tweets";

function Reply({ tweetId, text, media, username, createdAt }) {
    const [profile, setProfile] = useState([])
    const dispatch = useDispatch()

    useEffect(()=>{

        async function getProfile(){
          try {
            const res = await fetch(`http://localhost:8000/api/account/getProfile/${username}`, {
                            method: 'GET'
                  })
            const data = await res.json()
            setProfile(data.profile)
          } catch (error) {
            console.log(error)
          }
        }
        getProfile();
    
       
      },[username])
    return (
        <div className="p-3 flex cursor-pointer border-b border-gray-700">
            <img
                src={profile[0]?.pfp}
                alt=""
                className="h-11 w-11 rounded-full mr-4 object-cover object-center"
            />
            <div className="flex flex-col space-y-2 w-full">
                <div className="flex justify-between">
                    <div className="text-[#6e767d]">
                        <div className="inline-block group">
                            <h4 className="font-bold text-[#d9d9d9] text-[15px] sm:text-base inline-block group-hover:underline">
                                {profile[0]?.display_name}
                            </h4>
                            <span className="ml-1.5 text-sm sm:text-[15px]">
                                @{username}
                            </span>
                        </div>{" "}
                        ·{" "}
                        <span className="hover:underline text-sm sm:text-[15px]">
                            <Moment fromNow>{createdAt}</Moment>
                        </span>
                        <p className="text-[#d9d9d9] mt-0.5 max-w-lg  text-[15px] sm:text-base">
                            {text}
                        </p>
                    </div>
                    <div className="icon group flex-shrink-0">
                        <DotsHorizontalIcon className="h-5 text-[#6e767d] group-hover:text-[#1d9bf0]" />
                    </div>
                </div>

                <div className="text-[#6e767d] flex justify-between w-10/12">
                    <div  onClick={(e) => {
                    e.stopPropagation();
                    dispatch(modal_on())
                    dispatch(get_tweet_id({
                        'tweetId': tweetId,
                        'text': text,
                        'media' : media,
                        'pfp': profile[0].pfp,
                        'displayName': profile[0].display_name,
                        'username':profile[0].user_id?.username

                

              }));


            }} className="icon group">
                        <ChatIcon className="h-5 group-hover:text-[#1d9bf0]" />
                    </div>

                    <div className="flex items-center space-x-1 group">
                        <div className="icon group-hover:bg-pink-600/10">
                            <HeartIcon className="h-5 group-hover:text-pink-600" />
                        </div>
                        <span className="group-hover:text-pink-600 text-sm"></span>
                    </div>

                    <div className="icon group">
                        <ShareIcon className="h-5 group-hover:text-[#1d9bf0]" />
                    </div>
                    <div className="icon group">
                        <ChartBarIcon className="h-5 group-hover:text-[#1d9bf0]" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Reply;
