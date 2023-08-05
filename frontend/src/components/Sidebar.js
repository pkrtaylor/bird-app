import Image from "next/image"
import SidebarLink from "./SidebarLink"
import { HomeIcon } from "@heroicons/react/solid"
import {
  HashtagIcon,
  BellIcon,
  InboxIcon,
  BookmarkIcon,
  ClipboardListIcon,
  UserIcon,
  DotsCircleHorizontalIcon,
  DotsHorizontalIcon,
} from "@heroicons/react/outline";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/auth";
import Link from 'next/link'


const Sidebar = () => {
  const dispatch = useDispatch();
  const username = useSelector(state => state.auth.user?.username)
  // const isAuthenticated = useSelector(state=> state.auth.isAuthenticated)

  const logoutHandler = () => {
    if (dispatch && dispatch !== null && dispatch !== undefined) {
      dispatch(logout())
    }
  }
  return (
    //on 640px side is dislpayed as flex
    //children inside side bar have direction of column 
    //items aligned horizontaly in the center 
    //p-0 cuz there would be pading since this a custom class
    <div className='hidden sm:flex flex-col items-center xl:items-start xl:w-[340px] p-2 fixed h-full'>
      <Link href="/">
        <div className="flex items-center justify-center w-14 h-14 
              hoverAnimation p-0 xl:ml-24">
          <Image alt="" src="https://icon-library.com/images/twitter-icon-svg/twitter-icon-svg-28.jpg" width={30} height={30} />
        </div>
      </Link>
      <div className="space-y-2.5 mt-4 mb-2.5 xl:ml-24">{/* this place vertical spacing between the children, space-x would be horizontal spacing 2.5 is about 10px */}
        <SidebarLink text="Home" Icon={HomeIcon} userPath="/" />
        <SidebarLink text="Explore" Icon={HashtagIcon} />
        <SidebarLink text="Notifications" Icon={BellIcon} />
        <SidebarLink text="Messages" Icon={InboxIcon} />
        <SidebarLink text="Bookmarks" Icon={BookmarkIcon} />
        <SidebarLink text="Lists" Icon={ClipboardListIcon} />
        <SidebarLink text="Profile" Icon={UserIcon} userPath={`/profile/${username}`} />
        <SidebarLink text="More" Icon={DotsCircleHorizontalIcon} />

      </div>
      <button className="hidden xl:inline ml-auto bg-[#1db9f0] text-white
        rounded-full w-56 h-[52px] text-lg font-bold hover:bg-[#1a8cd8]">Tweet</button>
      <button className="hidden xl:inline ml-auto bg-[#1db9f0] text-white
        rounded-full w-56 h-[52px] text-lg font-bold hover:bg-[#1a8cd8] mt-auto" onClick={logoutHandler}>Logout</button>

    </div>
  )
}

export default Sidebar