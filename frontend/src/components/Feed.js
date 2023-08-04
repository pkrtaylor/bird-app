
//the feed at first was left of the sidebar, this was cuz the sidebar was fixed
// fized this by using margin 

import { HomeIcon, SparklesIcon, XIcon } from "@heroicons/react/outline"
import Input from "./Input"
import { useEffect, useState } from "react"
import { load_homeTL } from "../actions/tweets"
import { useDispatch, useSelector } from "react-redux"
import Post from "./Post"
import { GET_REPLIES_FAIL } from "../actions/types"
import { get_user_profile } from "../actions/profile"
import {

  BellIcon,
  InboxIcon,
  BookmarkIcon,
  UserIcon,
  
} from "@heroicons/react/outline";
import {BsSearch} from 'react-icons/bs'
import Link from 'next/link'
import SearchSlide from "./SearchSlide"
import { logout } from "../actions/auth"



//also think of flex-grow like flex-1
//so since hoverAnimation has padding and we dont want padding for the
//sparklesicon parent div when screen is large, we remove it 
const Feed = ({setToggleSideBar, toggleSideBar, toggleSearchSlide, setToggleSearchSlide}) => {
  const dispatch = useDispatch();
  const tweets = useSelector(state => state.tweets.homeTL)
  const username = useSelector(state=>state.auth.user?.username)
  const pfp = useSelector(state=> state.profile?.profile[0]?.pfp)//note if you keep getting errors of undefined sto trying to access the specific value or add the ?. to wanted value
  const mainProfile = useSelector(state=>state.profile?.mainProfile[0])
 
  const followerCount = useSelector(state => state.relations?.mainRelationsList?.followers) 
  const followingCount = useSelector(state => state.relations?.mainRelationsList?.following) 
  
  console.log(tweets.tweets)
  const [screenSize, setScreenSize] = useState(getCurrentDimension());
  function getCurrentDimension(){
    return {
        width: window.innerWidth,
        height: window.innerHeight
    }
  }
  const logoutHandler = () => {
    if (dispatch && dispatch !== null && dispatch !== undefined) {
      dispatch(logout())
    }
  }
  useEffect(() => {
    const updateDimension = () => {
        setScreenSize(getCurrentDimension())
    }
    window.addEventListener('resize', updateDimension);
    if(screenSize.width > 640)
    {
      setToggleSearchSlide(false)
      setToggleSideBar(false)
    }


    return(() => {
        window.removeEventListener('resize', updateDimension);
    })
}, [screenSize])
  useEffect(() => {
    dispatch(load_homeTL(), dispatch({ type: GET_REPLIES_FAIL }))
  }, [])

  

  return (
    <div className="relative text-white flex-grow  max-w-2xl sm:ml-[73px] xl:ml-[370px] sm:border-x-2 sm:border-gray-700">
      <SearchSlide setToggleSearchSlide={setToggleSearchSlide} toggleSearchSlide={toggleSearchSlide}/>
      <div className={ `fixed bg-gray-700 w-screen h-screen top-0 transition-all duration-1000 ${toggleSideBar ? "bg-opacity-60 z-10" : "bg-opacity-0 z-[-1] "} `}>
          <div className={`bg-black h-full w-[70%] top-0 absolute transition-all duration-1000 ${toggleSideBar ? "left-0" : "left-[-100%]"}`}>
         <div>
            <div className="flex justify-between p-3">
                <div className="rounded-full h-[40px] w-[40px] bg-cover bg-center cursor-pointer sm:hidden"
              style={{ backgroundImage: `url(${mainProfile?.pfp})`}} ></div>
                <div
                      className="hoverAnimation w-9 h-9 flex items-center justify-center xl:px-0"
                      onClick={() => {setToggleSideBar(!toggleSideBar)}}
                  >
                    <XIcon className="h-[22px] text-white" />
                  </div>
            </div>
            <div className="p-3 flex flex-col">
            <h1 className="text-white font-extrabold text-[17px]">{mainProfile?.display_name}</h1>
            <p className="text-[#6e767d] text-[15px] mr-2 ">@{mainProfile?.user_id.username}</p>
            <div className="flex text-sm mt-[20px]">
                           <div className="flex items-center mr-4">
                               <h3 className="text-white mr-1 font-semibold text-sm">{followerCount?.length}</h3>
                               <span className="text-[#6e767d]">followers</span>
                           </div>
                           <div className="flex items-center">
                               <h3 className="text-white mr-1 font-semibold text-sm">{followingCount?.length}</h3>
                               <span className="text-[#6e767d]" >following</span>
                           </div>

            </div>
            </div>
         </div>
         <div className="space-y-2.5 mt-4 mb-2.5">
              <Link href="">
            <div className={`text-[#d9d9d9] flex items-center
                justify-start text-xl space-x-3 hoverAnimation2`}>
              <BookmarkIcon className="h-7 text-white" />
              <span className="">Bookmark</span>
            </div>
          </Link>
              <Link href={`/profile/${mainProfile?.user_id.username}`}>
          <div className={`text-[#d9d9d9] flex items-center
              justify-start text-xl space-x-3 hoverAnimation2`}>
            <UserIcon className="h-7 text-white" />
            <span className="">Profile</span>
          </div>
        </Link>
         </div>
        <div className="h-[55%] flex justify-center items-end">
        <button className="bg-[#1db9f0] text-white
        rounded-full w-56 h-[52px] text-lg font-bold hover:bg-[#1a8cd8]" onClick={logoutHandler}>Logout</button>
        </div>
          </div>
         
      </div>
      
      <div className={`text-[#d9d9d9] flex items-center sm:justify-between py-2 px-3 ${!toggleSideBar && !toggleSearchSlide && "sticky"} top-0 z-[9] bg-black border-b border-gray-700`}>
        <h2 className="hidden sm:inline text-lg sm:text-xl font-bold">Home</h2>
        <div onClick={()=>{!toggleSearchSlide && setToggleSideBar(!toggleSideBar)}} className="rounded-full h-[56px] w-[56px] bg-cover bg-center cursor-pointer sm:hidden"
          style={{ backgroundImage: `url(${mainProfile?.pfp})`}} ></div>
        <div className="hoverAnimation w-9 h-9 flex items-center justify-center
          xl:px-0 ml-auto" >
          <SparklesIcon className="text-white h-5" />
        </div>

      </div>
      <Input pfp={mainProfile?.pfp}/>
      <div className="min-h-[700px]" >
        {
          tweets.tweets?.map((tweet) => (
            <Post key={tweet.tweet_id} id={tweet.tweet_id} text={tweet.text} media={tweet.media} username={tweet.username} createdAt={tweet.created_at} />
          ))
        }
      </div>
      <div className="flex justify-around z-[11] items-center bg-black border-t border-gray-700 w-full min-h-[54px] bottom-0 sticky sm:hidden xl:hidden ">
        <Link href="/">
        <div className="h-[42px] w-[42px] flex justify-center items-center ">
          <HomeIcon className="h-[27px] w-[27px] "/>
        </div>
        </Link>
       
        <div onClick={()=>{!toggleSideBar && setToggleSearchSlide(!toggleSearchSlide)}} className="h-[42px] w-[42px] flex justify-center items-center ">
          <BsSearch className="h-[27px] w-[27px] font-extralight "/>
        </div>
        
        
        <div className="h-[42px] w-[42px] flex justify-center items-center ">
          <BellIcon className="h-[27px] w-[27px] "/>
        </div>
        
        
        <div className="h-[42px] w-[42px] flex justify-center items-center ">
          <InboxIcon className="h-[27px] w-[27px] "/>
        </div>
        
        
      </div>

    </div>
  )
}

export default Feed