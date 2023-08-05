import React, { useState } from 'react'
import { XIcon } from "@heroicons/react/outline"
import { useSelector } from 'react-redux'
import SearchBar from './SearchBar'
import SearchResultsList from './SearchResultsList'

const SearchSlide = ({setToggleSearchSlide, toggleSearchSlide}) => {

    const mainProfile = useSelector(state=>state.profile?.mainProfile[0])
    const [results, setResults] = useState([])
    const [input, setInput] = useState("")
    
    
  return (
    <div className={ `fixed bg-gray-700 w-full h-screen top-0 transition-all duration-1000 ${toggleSearchSlide ? "bg-opacity-60 z-10" : "bg-opacity-0 z-[-1] "}`}>
          <div className={`flex flex-col items-center bg-black h-full w-[100%] top-0 absolute transition-all duration-1000 ${toggleSearchSlide ? "right-0" : "right-[-100%]"}`}>
         <div className="flex justify-between w-full">
            <div className="flex justify-between p-3 w-full">
                <div className="rounded-full h-[40px] w-[40px] bg-cover bg-center cursor-pointer sm:hidden"
              style={{ backgroundImage: `url(${mainProfile?.pfp})`}} ></div>
                <div
                      className="hoverAnimatin w-9 h-9 flex items-center justify-center xl:px-0"
                      onClick={() => {setToggleSearchSlide(!toggleSearchSlide)}}
                  >
                    <XIcon className="h-[22px] text-white" />
                  </div>
            </div>
            
         </div>
         <div className="w-[95%] max-h-[80%] h-[80%] flex flex-col place-items-center">
                <SearchBar input={input} setInput={setInput} setResults={setResults} results={results} />
                <SearchResultsList results={results} setToggleSearchSlide={setToggleSearchSlide} toggleSearchSlide={toggleSearchSlide}/>

         </div>

         
          </div>
      </div>
  )
}

export default SearchSlide