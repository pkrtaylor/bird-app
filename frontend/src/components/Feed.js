
//the feed at first was left of the sidebar, this was cuz the sidebar was fixed
// fized this by using margin 

import { SparklesIcon } from "@heroicons/react/outline"
import Input from "./Input"
import { useEffect } from "react"
import { load_homeTL } from "../actions/tweets"
import { useDispatch, useSelector } from "react-redux"
import Post from "./Post"


//also think of flex-grow like flex-1
//so since hoverAnimation has padding and we dont want padding for the
//sparklesicon parent div when screen is large, we remove it 
const Feed = () => {
  const dispatch = useDispatch();
  const tweets = useSelector(state => state.tweets.homeTL)
  console.log(tweets.tweets)
  useEffect(() => {
    dispatch(load_homeTL())
  }, [])

  return (
    <div className="text-white flex-grow border-l border-r 
    border-gray-700 max-w-2xl sm:ml-[73px] xl:ml-[370px]">
      <div className="text-[#d9d9d9] flex items-center sm:justify-between py-2 px-3 sticky top-0 z-50 bg-black border-b border-gray-700">
        <h2 className="text-lg sm:text-xl font-bold">Home</h2>
        <div className="hoverAnimation w-9 h-9 flex items-center justify-center
    xl:px-0 ml-auto" >
          <SparklesIcon className="text-white h-5" />
        </div>

      </div>
      <Input />
      <div className="pb-72">
        {
          tweets.tweets?.map((tweet) => (
            <Post key={tweet.tweet_id} id={tweet.tweet_id} text={tweet.text} media={tweet.media} username={tweet.username} />
          ))
        }
      </div>
    </div>
  )
}

export default Feed