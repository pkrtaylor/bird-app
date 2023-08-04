import Link from 'next/link'
import React from 'react'
import { useRouter } from "next/router";

const SearchResultsList = ({results, setResults, toggleSearchSlide ,setToggleSearchSlide, setInput}) => {

  const router = useRouter();  
  
  return (
    <div className={`flex flex-col ${results.length > 0 && "border-[1px] border-gray-700" }  max-h-[90%] overflow-y-scroll text-white rounded-md sm:ml-[30px] `}
    style={{boxShadow: 'rgba(149, 157, 165, 0.6) 1px 1px 24px'}}>
    {results.map((result) => {
      return ( 
      <div onClick={ ()=>{router.push(`/profile/${result.user_id.username}`); 
      toggleSearchSlide && setToggleSearchSlide(false); 
      setResults([]);
      setInput("");
      
      }} key={result.profile_id} className="flex w-[357px] h-[85px] px-[16px] py-12px] cursor-pointer hover:shadow-[inset_100px_100px_rgba(255,255,255,0.1)] "
      >
        <div className=" flex-[30%] flex justify-center items-center">
          <div className="rounded-full h-[56px] w-[56px] bg-cover bg-center"
          style={{ backgroundImage: `url(${result.pfp})`}} ></div>
        </div>
        <div className="flex-[70%] flex flex-col justify-center">
         <p className="text-sm font-bold ">{result.display_name}</p>
         <p className="text-sm text-[#6e767d] ">@{result.user_id.username}</p>
        </div>
      </div>)
    })}
    </div>
  )
}

export default SearchResultsList

// /style={{boxShadow: "inset 0 0 100px 100px rgba(255, 255, 255, 0.1)"}}