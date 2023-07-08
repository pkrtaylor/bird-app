import { useState, useRef } from "react"
import { useSelector, useDispatch } from 'react-redux'



import { CalendarIcon, ChartBarIcon, EmojiHappyIcon, LocationMarkerIcon, PhotographIcon, XIcon } from '@heroicons/react/outline'

import Picker from "@emoji-mart/react"
import data from '@emoji-mart/data'
import { send_tweet } from "../actions/tweets"

const Input = () => {
  //overflow-y-scroll allows us to scroll through the text we are typing
  //tracking-wide is the space between words
  const user_id = useSelector(state => state.auth.user?.id)
  const loading = useSelector(state => state.tweets.loading)
  const dispatch = useDispatch();

  const [text, setText] = useState("");
  const [selectedFile, setSelectedFile] = useState(null)
  const filePickerRef = useRef(null);
  const [showEmojis, setShowEmojis] = useState(false)
  const [media, setMedia] = useState(null)
  const [isReply, setIsReply] = useState('False')
  const [parent, setParent] = useState(null)




  const sendTweet = () => {

    if (loading) return;


    if (dispatch && dispatch !== null && dispatch !== undefined) {
      dispatch(send_tweet(text, media, user_id, isReply, parent))
      //console.log(media)
    }

    setMedia(null)
    setText("")
    setSelectedFile(null)
    setShowEmojis(false)


  }
  // if(selectedFile){
  //   console.log(selectedFile)
  // }

  // const sendTweett = async () => {

  //         const body = new FormData();
  //         body.append('text' , text)
  //         body.append('media', media)
  //         body.append('user_id', user_id)
  //         console.log([...body])

  //         try {
  //           const res  = await fetch('http://127.0.0.1:8000/api/tweets/tweet',{
  //           method: 'POST',
  //           body: body
  //           })
  //           setMedia(null)
  //           setText("")
  //           setSelectedFile(null)
  //           setShowEmojis(false)

  //          return console.log(res.status)

  //         } catch (error) {
  //           setMedia(null)
  //           setText("")
  //           setSelectedFile(null)
  //           setShowEmojis(false)
  //           return console.log(error)
  //         }

  // }
  // // if(input !== null && selectedFile !== null){
  // //   const body = new FormData();
  // //         body.append('text' , input)
  // //         body.append('image', iFile)
  // //   console.log([...body])
  // // }

  const addImageToPost = (e) => {

    const reader = new FileReader();
    if (e.target.files[0]) {

      setMedia(e.target.files[0])
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target.result)

    }


  }




  const addEmoji = (e) => {
    let sym = e.unified.split("-");
    let codesArray = [];
    sym.forEach((el) => codesArray.push("0x" + el));
    let emoji = String.fromCodePoint(...codesArray);
    setInput(text + emoji);
  }
  return (
    <div className={`border-b border-gray-700 p-3 flex space-x-3
    overflow-y-scroll scrollbar-hide ${loading && "opacity-60"
      }`}>
      <img
        src="https://www.slashfilm.com/img/gallery/smallvilles-director-had-to-beg-tom-welling-to-even-accept-an-audition/l-intro-1657569446.jpg"
        alt=""
        className="h-11 w-11 rounded-full cursor-pointer object-contain " />
      <div className="w-full divide-y divide-gray-700 ">
        <div className={`${selectedFile && "pb-7"} ${text && "space-y-2.5"}`} >
          <textarea
            value={text}
            onChange={(e) => setText((e.target.value))}
            rows="2"
            placeholder="What's happening"
            className="bg-transparent outline-none text-[#d9d9d9]
                text-lg placeholder-gray-500 tracking-wide w-full min-h-[50px] "
          />

          {
            selectedFile && (
              <div className="relative">
                <div className="absolute w-8 h-8 bg-[#15181c] 
                  hover:bg-[#272c26] bg-opacity-75 rounded-full flex items-center
                  justify-center top-1 left-1 cursor-pointer" onClick={() => setSelectedFile(null)}>
                  <XIcon className="text-white h-3" />
                </div>
                <img
                  src={selectedFile}
                  alt=""
                  className="rounded-2xl max-h-80 object-contain"
                />
              </div>
            )
          }


        </div>
        <div className="flex items-center justify-between pt-2.5">
          <div className="flex items-center">
            <div className="icon" onClick={() => filePickerRef.current.click()}>
              <PhotographIcon className="h-[22px] text-[#1d9bf0]" />
              <input
                type="file"
                ref={filePickerRef}
                hidden
                onChange={addImageToPost}
              />
            </div>

            <div className="icon rotate-90">
              <ChartBarIcon className="text-[#1d9bf0] h-[22px]" />
            </div>

            < div className="icon" onClick={() => setShowEmojis(!showEmojis)}>
              <EmojiHappyIcon className="text-[#1d9bf0] h-[22px]" />
            </div>

            <div className="icon">
              <CalendarIcon className="text-[#1d9bf0] h-[22px]" />
            </div>
            <div className="icon">
              <LocationMarkerIcon className="text-[#1d9bf0] h-[22px]" />
            </div>
            {showEmojis &&

              (

                <div className="absolute mt-[470px] ml-[-40px] max-w-[320px] border-r-[20px]">
                  <Picker
                    data={data}
                    theme="dark"
                    onEmojiSelect={addEmoji} />
                </div>
              )}

          </div>
          <button className="bg-[#1d9bf0] text-white rounded-full px-4 py-1.5 
              font-bold shadow-md hover:bg-[#1a8cd8] 
              disabled:hover:bg-[#1d9bf0] disabled:opacity-50 disabled:cursor-default"
            disabled={!text.trim() && !selectedFile}
            onClick={() => { sendTweet() }}
          >Tweet</button>
        </div>
      </div>
    </div>
  )
}

export default Input
//the button is disabled if there is no text
//we use trim() cuz it removes the trailing or empty spaces
