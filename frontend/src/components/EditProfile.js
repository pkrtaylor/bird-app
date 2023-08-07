import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { edit_modal_off, edit_modal_on, send_profile } from "../actions/profile";
import {TbCameraPlus} from 'react-icons/tb'

import {
    CalendarIcon,
    ChartBarIcon,
    EmojiHappyIcon,
    PhotographIcon,
    XIcon,
} from "@heroicons/react/outline";
import { useRouter } from "next/router";


const EditProfile = ({display_name, pfp, bgp, location, bio, birthdate, username}) => {

    const editModal = useSelector(state => state.profile.editModal)
    const userId = useSelector(state => state.auth.user?.id)
    const dispatch = useDispatch();
    const profile = useSelector(state => state.profile.profile)

    const [displayName, setDisplayName] = useState(display_name)
    const [pfp2, setPFP] = useState(pfp)
    const [bgp2, setBGP] = useState(bgp)
    const [location2, setLocation] = useState(location)
    const [bio2, setBio] = useState(bio)
    const [birthdate2, setBirthdate] = useState(birthdate)
    console.log(bgp2)
    console.log(pfp2)
    console.log(birthdate2)

    const filePickerRef = useRef(null);
    const bgpRef = useRef(null);


   
    const [selectedFile, setSelectedFile] = useState(null)
    const [bgpFile, setBGPFile] = useState(null)


    const addImageToPost = (e, displayImageSetter, imgFileSetter) => {

        const reader = new FileReader();
        if (e.target.files[0]) {
    
            imgFileSetter(e.target.files[0])
            
          reader.readAsDataURL(e.target.files[0]);
        }
    
        reader.onload = (readerEvent) => {
            displayImageSetter(readerEvent.target.result)
    
        }
      }


      const sendProfile = () =>{

        if (dispatch && dispatch !== null && dispatch !== undefined) {
            dispatch(send_profile(bgp2, pfp2, displayName, bio2, location2, birthdate2, userId, username ))
            console.log(username)
          }
      
          
         
         dispatch(edit_modal_off())

      }


    return (
        <Transition.Root show={editModal} as={Fragment}>
            <Dialog as="div" className="fixed z-50 inset-0 pt-8" onClose={() => { dispatch(edit_modal_off()) }}>
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
                        <div className={`${!editModal && "absolute top-0"} inline-block sm:max-h-[550px] sm:max-w-[600px] sm:w-[600px] align-bottom bg-black rounded-2xl text-left w-screen overflow-y-scroll shadow-xl transform transition-all`}>
                            {/*here we will be creatin the top div of the modal above the visibile line max-h-[550px] max-w-[600px] w-[600px] */}
                            <div className="flex items-center justify-between px-1.5 py-2 border-b border-gray-700 " >
                                <div
                                    className="hoverAnimation w-9 h-9 flex items-center justify-center xl:px-0"
                                    onClick={() => { dispatch(edit_modal_off()) }}
                                >
                                    <XIcon className="h-[22px] text-white" />
                                </div>
                                <h1 className="text-white font-bold text-lg ml-8">Edit Profile</h1>
                                <button onClick={() => {sendProfile()}} className="bg-white text-black h-[32px] w-[67px] rounded-3xl mr-4">Save</button>

                            </div>

                            <div className="w-full relative">
                                <div className="absolute  h-[112px] w-[112px] top-[137px] ml-[30px]">
                                    <div className={`flex border-[3px] border-black justify-center items-center rounded-full w-full h-full bg-cover bg-center `}
                                    style={{ backgroundImage: selectedFile ? `url(${selectedFile})` : `url(${pfp2})`}}>
                                        <div onClick={() => filePickerRef.current.click()} className="flex justify-center items-center rounded-full h-[42px] w-[42px] bg-black cursor-pointer bg-opacity-[0.5] hover:bg-opacity-[0.4]">
                                            <TbCameraPlus className="text-white h-[22px] w-[22px] "/>
                                                 <input
                                                    type="file"
                                                    ref={filePickerRef}
                                                    hidden
                                                    onChange={(e) => addImageToPost(e,setSelectedFile,setPFP)}
                                                />
                                       </div>
                                    </div>
                                    
                                </div>
                                <div className=" h-[193px]">
                                    <div className={`flex justify-center items-center bg-cover bg-center w-[100%] h-[100%] `}
                                    style={{ backgroundImage: bgpFile ? `url(${bgpFile})` : `url(${bgp2})`}}>
                                       <div onClick={()=> bgpRef.current.click()} className="flex justify-center items-center rounded-full h-[42px] w-[42px] bg-black mr-4 cursor-pointer bg-opacity-[0.5] hover:bg-opacity-[0.4]">
                                            <TbCameraPlus className="text-white h-[22px] w-[22px] "/>
                                            <input
                                                    type="file"
                                                    ref={bgpRef}
                                                    hidden
                                                    onChange={(e) => addImageToPost(e,setBGPFile, setBGP)}
                                                />
                                            
                                       </div>
                                       <div onClick={()=>{setBGP(null); setBGPFile(null);}} className="flex justify-center items-center rounded-full h-[42px] w-[42px] bg-black cursor-pointer bg-opacity-[0.5] hover:bg-opacity-[0.4]">
                                            <XIcon className="h-[22px] w-[22px] text-white" />
                                       </div>
                                    </div>
                                </div>
                                <div className="h-[700px] flex flex-col items-center">
                                    <div className="relative flex h-[55px] w-[90%] mt-[70px] rounded-md ">
                                    <textarea
                                                value={displayName}
                                                onChange={(e) => setDisplayName((e.target.value))}
                                                rows="1"
                                                className="profileInput pt-5"
                                            />
                                    <label className="profileLabel">Name</label>
                                    </div>
                                    <div className="relative flex h-[100px] w-[90%] mt-8">
                                    <textarea
                                                value={bio2}
                                                onChange={(e) => setBio((e.target.value))}
                                                rows="2"
                                                className="profileInput pt-5"
                                            />
                                    <label className="profileLabel">Bio</label>
                                    </div>
                                    <div className=" relative flex h-[60px] w-[90%] mt-8">
                                    <textarea
                                                value={location2}
                                                onChange={(e) => setLocation((e.target.value))}
                                                rows="1"
                                                className="profileInput pt-5"
                                            />
                                    <label className="profileLabel">Location</label>
                                    </div>
                                    <div className="relative flex h-[60px] w-[90%] mt-8">
                                    <textarea
                                                value={birthdate2}
                                                onChange={(e) => setBirthdate((e.target.value))}
                                                rows="1"
                                                className="profileInput pt-5"
                                            />
                                        <label className="profileLabel">Date of birth - year/month/day</label>
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

export default EditProfile
