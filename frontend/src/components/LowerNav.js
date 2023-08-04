import React from 'react'
import {

    BellIcon,
    InboxIcon,
 
  } from "@heroicons/react/outline";
  import {BsSearch} from 'react-icons/bs'
  import Link from 'next/link'
  import { HomeIcon} from "@heroicons/react/outline"

const LowerNav = ({toggleSearchSlide, setToggleSearchSlide}) => {
  return (
    <div className="flex justify-around z-[11] items-center bg-black border-t border-gray-700 text-white w-full min-h-[54px] bottom-0 fixed sm:hidden xl:hidden ">
        <Link href="/">
        <div className="h-[42px] w-[42px] flex justify-center items-center ">
          <HomeIcon className="h-[27px] w-[27px] "/>
        </div>
        </Link>
       
        <div onClick={()=>{setToggleSearchSlide(!toggleSearchSlide)}} className="h-[42px] w-[42px] flex justify-center items-center ">
          <BsSearch className="h-[27px] w-[27px] font-extralight "/>
        </div>
        
       
        <div className="h-[42px] w-[42px] flex justify-center items-center ">
          <BellIcon className="h-[27px] w-[27px] "/>
        </div>
        
      
        <div className="h-[42px] w-[42px] flex justify-center items-center ">
          <InboxIcon className="h-[27px] w-[27px] "/>
        </div>
        
        
      </div>
  )
}

export default LowerNav