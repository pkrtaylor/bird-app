import {
  ChartBarIcon,
  ChatIcon,
  DotsHorizontalIcon,
  HeartIcon,
  ShareIcon,
  SwitchHorizontalIcon,
  TrashIcon
} from '@heroicons/react/outline'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { get_tweet_id, modal_on } from '../actions/tweets'
import { get_user_profile } from '../actions/profile'
import Moment from 'react-moment'
import { DJANGO_API_URL } from '../config'
import defaultImage from '../images.json'

//in every post we need to request from the db a users pfp and username and displat_name 
//because if a user changes in the future we cant go back and change all the tweets in the users cache 
//unless every time a user changes either of the those things we completely recreate users tl and home tl 


function Post({ id, text, media, username, createdAt, tweetPage }) {

  const auth_username = useSelector(state => state.auth.user?.username)
  const dispatch = useDispatch()
  const router = useRouter();
  const [profile, setProfile] = useState([])
  // const [tweetId, setTweetId] = useState(null)
  // const isModal = useSelector(state => state.tweets.isModal)
  const tweetData = useSelector(state => state.tweets.tweetData)


  useEffect(()=>{

    async function getProfile(){
      try {
        const res = await fetch(`${DJANGO_API_URL}/api/account/getProfile/${username}`, {
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
    <div
      className="p-3 flex cursor-pointer border-b border-gray-700"
      onClick={() => router.push(`/${username}/${id}`)}
    >
      {!tweetPage && (
        <img
          src={profile[0]?.pfp ? profile[0]?.pfp : defaultImage[0].url}
          alt=''
          className="h-11 w-11 rounded-full mr-4 object-cover object-center"
        />)}
      <div className="flex flex-col space-y-2 w-full">
        <div className={`flex ${!tweetPage && "justify-between"}`}>
          {tweetPage && (
            <img
              src=''
              alt="Profile Pic"
              className="h-11 w-11 rounded-full mr-4" />
          )}
          <div className="text-[#6e767d]">
            <div className="inline-block group">
              <h4 className={`font-bold text-[15px] sm:text-base text-[#d9d9d9] group-hover:underline ${!tweetPage && "inline-block"}`}>{profile[0]?.display_name}</h4>
              <span className={`text-sm sm:text-[15px] ${!tweetPage && "ml-1.5"}`}>@{profile[0]?.user_id?.username}</span>
            </div>{" "}
            ·{" "}
            <span className="hover:underline text-sm sm:text-[15px]">
              <Moment fromNow>{createdAt}</Moment>
            </span>
            {!tweetPage && <p className="text-[#d9d9d9] sm:text-base mt-0.5">{text}</p>
            }
          </div>
          <div className="icon group flex-shrink-0 ml-auto">
            <DotsHorizontalIcon className="h-5 text-[#6e767d] group-hover:text-[#1d9bf0]" />
          </div>
        </div>
        {tweetPage && <p className="text-[#d9d9d9] sm:text-base mt-0.5">{text}</p>}
        <img
          src={media}
          alt=''
          className="round-2xl max-h-[700px] object-cover mr-2" />
        {/*the reason we use object-cover and not contain, sometimes contain will mess up the border radius */}
        <div className={`text-[#6e767d] flex justify-between w-10/12 ${tweetPage && "mx-auto"} `}>
          <div className="flex items-center space-x-1 group"
            onClick={(e) => {
              e.stopPropagation();
              dispatch(modal_on())
              dispatch(get_tweet_id({
                'tweetId': id,
                'text': text,
                'media' : media,
                'pfp': profile[0].pfp,
                'displayName': profile[0].display_name,
                'username':profile[0].user_id?.username

                

              }));


            }}
          >
            <div className="icon group-hover:bg-[#1d9bf0] group-hover:bg-opacity-0">
              <ChatIcon className="h-5 group-hover:text-[#1d9bf0]" />
            </div>
            <span className="group-hover:text-[#1d9bf0] text-sm">
              1
            </span>
          </div>
          {
            auth_username === username ? (

              <div className="flex items-center space-x-1 group"
                onClick={(e) => {
                  e.stopPropagation();
                  //delete tweet
                  router.push('/')
                }}
              >
                <div className="icon group-hover:bg-red-600/10">
                  <TrashIcon className="h-5 group-hover:text-red-600" />
                </div>
              </div>

            ) : (
              <div className="flex items-center space-x-1 group">
                <div className="icon group-hover:bg-green-500/10">
                  <SwitchHorizontalIcon className="h-5 group-hover:text-green-500" />
                </div>
              </div>
            )
          }

          <div className="flex items-center space-x-1 group">
            <div className="icon group-hover:bg-pink-600/10">
              <HeartIcon className="h-5 group-hover:text-pink-600" />
            </div>
            <span
              className={`group-hover:text-pink-600 text-sm `}
            >
              1
            </span>
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
  )
}

export default Post
//to prevent a div from stretching and shrinking we use flex-shrink-0