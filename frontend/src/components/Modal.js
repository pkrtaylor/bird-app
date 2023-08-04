import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { modal_off, send_tweet } from "../actions/tweets";


import {
    CalendarIcon,
    ChartBarIcon,
    EmojiHappyIcon,
    PhotographIcon,
    XIcon,
} from "@heroicons/react/outline";
import { useRouter } from "next/router";

const isReply = 'True'
const Modal = ({pfp, username}) => {
    const router = useRouter()
    const isModal = useSelector(state => state.tweets.isModal)
    const user_id = useSelector(state => state.auth.user?.id)
    const dispatch = useDispatch()
    const [reply, setReply] = useState("")
    const [media, setMedia] = useState(null)
    const parent = useSelector(state => state.tweets.tweetData.tweetId)
    const tweetData = useSelector(state => state.tweets.tweetData)


    const sendTweet = () => {

        if (dispatch && dispatch !== null && dispatch !== undefined) {
            dispatch(send_tweet(reply, media, user_id, isReply, parent))
            //console.log(media)
        }

        dispatch(modal_off())
        setReply("");

        router.push(`/${username}/${parent}`);
    }

    return (
        <Transition.Root show={isModal} as={Fragment}>
            <Dialog as="div" className="fixed z-50 inset-0 pt-8" onClose={() => { dispatch(modal_off()) }}>
                <div className="flex items-start justify-center min-h-[800px] sm:min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="fixed inset-0 bg-[#5b7083] bg-opacity-40 transition-opacity" />
                    </Transition.Child>

                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                        <div className="inline-block align-bottom bg-black rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-xl sm:w-full">
                            {/*here we will be creatin the top div of the modal above the visibile line */}
                            <div className="flex items-center px-1.5 py-2 border-b border-gray-700 " >
                                <div
                                    className="hoverAnimation w-9 h-9 flex items-center justify-center xl:px-0"
                                    onClick={() => dispatch(modal_off())}
                                >
                                    <XIcon className="h-[22px] text-white" />


                                </div>
                            </div>
                            {/*this is the under the line, the second part, this is the tweet of who u are replying too */}
                            <div className="flex px-4 pt-5 pb-2.5 sm:px-6">
                                <div className="w-full">
                                    <div className="text-[#6e767d] flex gap-x-3 relative">
                                        <span className="w-0.5 h-full z-[-1] absolute left-5 top-11 bg-gray-600" />
                                        <img
                                            src={tweetData.pfp}
                                            alt=""
                                            className="h-11 w-11 rounded-full object-cover object-center"
                                        />
                                        <div>
                                            <div className="inline-block group">
                                                <h4 className="font-bold text-[#d9d9d9] inline-block text-[15px] sm:text-base">
                                                    {tweetData.displayName}
                                                </h4>
                                                <span className="ml-1.5 text-sm sm:text-[15px]">
                                                    @{tweetData.username}{" "}
                                                </span>
                                            </div>{" "}
                                            ·{" "}
                                            <span className="hover:underline text-sm sm:text-[15px]">
                                                {/* <Moment fromNow>{post?.timestamp?.toDate()}</Moment> */}time
                                            </span>
                                            <p className="text-[#d9d9d9] text-[15px] mb-2 sm:text-base">
                                                {tweetData.text}
                                            </p>
                                            <img src={tweetData.media} className="rounded-sm max-h-[400px]">

                                            </img>
                                        </div>
                                    </div>

                                    <div className="mt-7 flex space-x-3 w-full">
                                        <img
                                            src={pfp}
                                            alt=""
                                            className="h-11 w-11 rounded-full object-cover object-center"
                                        />
                                        <div className="flex-grow mt-2">
                                            <textarea
                                                value={reply}
                                                onChange={(e) => setReply(e.target.value)}
                                                placeholder="Tweet your reply"
                                                rows="2"
                                                className="bg-transparent outline-none text-[#d9d9d9] text-lg placeholder-gray-500 tracking-wide w-full min-h-[80px]"
                                            />

                                            <div className="flex items-center justify-between pt-2.5">
                                                <div className="flex items-center">
                                                    <div className="icon">
                                                        <PhotographIcon className="text-[#1d9bf0] h-[22px]" />
                                                    </div>

                                                    <div className="icon rotate-90">
                                                        <ChartBarIcon className="text-[#1d9bf0] h-[22px]" />
                                                    </div>

                                                    <div className="icon">
                                                        <EmojiHappyIcon className="text-[#1d9bf0] h-[22px]" />
                                                    </div>

                                                    <div className="icon">
                                                        <CalendarIcon className="text-[#1d9bf0] h-[22px]" />
                                                    </div>
                                                </div>
                                                <button
                                                    className="bg-[#1d9bf0] text-white rounded-full px-4 py-1.5 font-bold shadow-md hover:bg-[#1a8cd8] disabled:hover:bg-[#1d9bf0] disabled:opacity-50 disabled:cursor-default"
                                                    type="submit"
                                                    onClick={sendTweet}
                                                    disabled={!reply.trim()}
                                                >
                                                    Reply
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    )
}

export default Modal
