import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Landing from '../../components/Landing';
import Head from 'next/head';
import Sidebar from '../../components/Sidebar';
import { check_auth_status } from '../../actions/auth';
import { ArrowLeftIcon } from '@heroicons/react/solid';
import { PiBalloon } from 'react-icons/pi'
import { LuCalendarRange } from "react-icons/lu";
import { SlLocationPin } from 'react-icons/sl'
import EditProfile from '../../components/EditProfile';
import { edit_modal_on, get_user_profile } from '../../actions/profile';
import Moment from "react-moment";
import SyncLoader from 'react-spinners/SyncLoader';
import { useRouter } from 'next/router';
import { follow, relation_status, relationsList } from '../../actions/relations';
import UnFollowModal from '../../components/UnFollowModal';
import RightSidebar from '../../components/RightSidebar';
import LowerNav from '../../components/LowerNav';
import SearchSlide from '../../components/SearchSlide';

function ProfilePage() {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
    const editModal = useSelector(state => state.profile.editModal)
    const userId = useSelector(state => state.auth.user?.id)
    const follower = useSelector(state => state.auth.user?.username)
    const profile = useSelector(state => state.profile.profile[0])
    const profileLoading = useSelector(state => state.profile.loading)
    const userOfProfileId = profile?.user_id.id
    const router = useRouter()
    const relationStatus = useSelector(state => state.relations?.relationStatus)
    const followerCount = useSelector(state => state.relations?.relationsList?.followers) 
    const followingCount = useSelector(state => state.relations?.relationsList?.following) 
    const [isHovering , setIsHovering] = useState(false)

    const [unFollowModal, setUnFollowModal] = useState(false)
    const [toggleSearchSlide, setToggleSearchSlide] = useState(false)
    
    

   
    useEffect(() => {
        if (dispatch && dispatch !== null && dispatch !== undefined) {
            dispatch(check_auth_status());//place the load process in this action
            //dispatch(request_refresh()); //this prolly woudnt be done in a real application, this would only be hit on very important pages, li
            //like maybe a checkout page 

        }
    }, [dispatch])

    
    
    useEffect(()=>{
        if(router.isReady && follower)
        {
            dispatch(relation_status(follower, router.query['username']))
            dispatch(
                get_user_profile(router.query['username'],false))
            dispatch(relationsList(router.query['username'], false))
        }
    },[router.isReady, follower, router.query['username']])

    //https://stackoverflow.com/questions/3971841/how-to-resize-images-proportionally-keeping-the-aspect-ratio






    if (isAuthenticated === false) {
        return (
            <>
                <Head>
                    <title>Bird app</title>
                    <meta name="description" content="Generated by create next app" />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <main>
                    <Landing />
                </main>
            </>
        )
    }
    return (
        <>
            <main className="bg-black min-h-screen max-w-[1500px] flex mx-auto">
                <Sidebar />
                <div className="flex-grow border-l border-r border-gray-700 max-w-2xl sm:ml-[73px] xl:ml-[370px]">
                <SearchSlide setToggleSearchSlide={setToggleSearchSlide} toggleSearchSlide={toggleSearchSlide}/>
                    <div className="flex items-center px-1.5 py-2 border-b border-gray-700 text-[#d9d9d9] font-semibold text-xl gap-x-4 sticky top-0 z-50 bg-black">
                        <div
                            className="hoverAnimation w-9 h-9 flex items-center justify-center xl:px-0"
                            onClick={() => router.push("/")}>
                            <ArrowLeftIcon className="h-5 text-white"/>
                        </div>
                        {profile?.display_name}
                    </div>
                    <div className="border-b border-gray-700 text-[#d9d9d9] h-[445px] flex flex-col relative">
                    {userOfProfileId ? (<>{/* Profile pic, smaller , im using userOfProfile as value for spinner */}
                        <div className="border-[3px] border-pink-500 h-[145px] w-[145px] absolute top-[calc(40%-72.5px)] left-[16px]  ">
                            <div className="border-[3px] border-blue-700 h-[100%] w-[100%] rounded-full bg-cover bg-center my-auto
                             z-10" style={{ backgroundImage: profile != undefined && `url(${profile?.pfp})`}} />
                        </div>
                        {/* this is where my background pic is, the larger one */}
                        <div className="flex-[40%] border-[2px] border-red-700 ">
                            <div className=" bg-cover bg-center w-[100%] h-[100%] "
                            style={{ backgroundImage: `url(${profile?.bgp})`}} />
                        </div>
                    <div className=" flex flex-col flex-[60%] border-[2px] border-yellow-700 pt-[12px] px-[16px]" >
                            {/* the lower half of profile*/}
                    <div className="h-[68px] flex border border-green-700 justify-end items-start">
                           {userId === userOfProfileId ? <div onClick={() => { dispatch(edit_modal_on()) }} className="text-[#d9d9d9] h-[36px] w-[114px] rounded-[20px] border border-[#536471] text-sm font-semibold mr-[50px] flex justify-center items-center cursor-pointer "
                           >Edit Profile</div> : 
                                ( relationStatus?.[0]?.[0] ? 
                                            (<div
                                                onMouseEnter={() => setIsHovering(true)}
                                                onMouseLeave={() => setIsHovering(false)}
                                            >
                                                {
                                                    isHovering ? (<div onClick={()=> {setUnFollowModal(true)}} className="text-[red] h-[36px] w-[114px] rounded-[20px] border border-[red] text-sm font-semibold mr-[50px] flex justify-center items-center cursor-pointer ">
                                                    UnFollow</div>) : (<div className="text-[#d9d9d9] h-[36px] w-[114px] rounded-[20px] border border-[#536471] text-sm font-semibold mr-[50px] flex justify-center items-center cursor-pointer ">
                                                    Following</div>)
                                                }
                                            </div>) : 
                                                    (<div onClick={() => 
                                                    {
                                                    const followee = profile?.user_id.username
                                                    dispatch(follow(follower, followee))}} className="text-black h-[36px] w-[114px] rounded-[20px] bg-white text-sm font-semibold mr-[50px] flex justify-center items-center cursor-pointer "
                                                    >Follow</div>))}
                            
                       </div>
                       <h1 className="font-extrabold text-xl">{profile?.display_name}</h1>
                       <div className="flex items-center mb-3">
                       <p className="text-[#6e767d] text-sm mr-2 ">@{profile?.user_id.username}</p>
                       {relationStatus?.[1]?.[0] && <p className="text-[#6e767d] text-xs bg-neutral-400 bg-opacity-[0.3] p-[2px]">Follows you</p>}
                       </div>
                       <p className="text-[#d9d9d9] text-sm mb-2">{profile?.bio}</p>
                       <div className="flex text-sm mb-2 text-[#6e767d]">
                           <div className="flex items-center mr-2  ">
                               <SlLocationPin className="mr-1" />
                               <span>{profile?.location}</span>
                           </div>
                           <div className="flex items-center mr-2">
                               <PiBalloon className="mr-1" />
                               <span>{profile?.birthdate}</span>
                           </div>
                           <div className="flex items-center mr-2">
                               <LuCalendarRange className="mr-1" />
                               <span>
                               <Moment fromNow>{profile?.created_at}</Moment>
                                   </span>
                           </div>
                       </div>
                       <div className="flex text-sm">
                           <div className="flex items-center mr-4">
                               <h3 className="mr-1 font-semibold text-sm">{followerCount?.length}</h3>
                               <span className="text-[#6e767d]">followers</span>
                           </div>
                           <div className="flex items-center">
                               <h3 className="mr-1 font-semibold text-sm">{followingCount?.length}</h3>
                               <span className="text-[#6e767d]" >following</span>
                           </div>

                       </div>
                        </div></>):
                        (<div className="flex justify-center items-center h-full">
                        <SyncLoader
                            color="#1d9bf0"
                            size={12}
                            aria-label="Loading Spinner"
                            data-testid="loader"
                          />
                          </div>)}

                    </div>
                    <LowerNav toggleSearchSlide={toggleSearchSlide} setToggleSearchSlide={setToggleSearchSlide}/>
                </div>
                <RightSidebar/>

            </main>
            {editModal && <EditProfile 
            bgp = {profile?.bgp}
            pfp = {profile?.pfp}
            display_name = {profile?.display_name}
            bio = {profile?.bio}
            location = {profile?.location}
            birthdate = {profile.birthdate}
            username = {profile?.user_id.username}
            />}

            {unFollowModal && <UnFollowModal 
            follower={follower}
            followee={profile?.user_id.username}
            unFollowModal={unFollowModal} 
            setUnFollowModal={setUnFollowModal} />}
        </>

    )
}

export default ProfilePage


