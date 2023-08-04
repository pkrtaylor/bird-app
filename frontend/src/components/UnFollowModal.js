import React, { Fragment } from 'react'
import { Dialog, Transition } from "@headlessui/react";
import {
    XIcon,
} from "@heroicons/react/outline";
import { unfollow } from '../actions/relations';
import { useDispatch } from 'react-redux';

const UnFollowModal = ({unFollowModal, setUnFollowModal, followee, follower}) => {


    const dispatch = useDispatch();

  return (
    <Transition.Root show={unFollowModal} as={Fragment}>
            <Dialog as="div" className="fixed z-50 inset-0 pt-8" onClose={() => {setUnFollowModal(false)}}>
                <div className="flex items-start justify-center sm:min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
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
                        <div className="inline-block bg-black rounded-2xl text-left w-[320px] h-[300px] shadow-xl transform transition-all sm:my-8 sm:align-middle  ">
                           <div className="w-full h-full flex flex-col justify-center items-center">
                           <div className="text-[white]">
                             UnFollow @{followee}
                            </div>
                            <div  onClick={()=>{dispatch(unfollow(follower, followee)); setUnFollowModal(false)}} className="text-black h-[36px] w-[114px] rounded-[20px] bg-white text-sm font-semibold my-3 flex justify-center items-center cursor-pointer ">
                            Unfollow</div>
                            <div onClick={() => {setUnFollowModal(false)}} className="text-[#d9d9d9] h-[36px] w-[114px] rounded-[20px] border border-[#536471] text-sm font-semibold flex justify-center items-center cursor-pointer ">
                            Cancel</div>

                           </div>



                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
  )
}

export default UnFollowModal