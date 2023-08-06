import React, {useState} from 'react'
import {FaSearch} from 'react-icons/fa'

const SearchBar = ({setResults, setInput, input}) => {

  

  const fetchData = (value) => {
    fetch(`${process.env.DJANGO_API_URL}/api/account/userList`)
    .then((response) => response.json())
    .then((json) => {
        // console.log(json.profiles)
        const results = json.profiles.filter((profile) =>{
            //this will render the filtered values, but on the flip side even if there is not input then all vales will be displayed, we nothing to be dislayed
            //so we add value to make sure there is input before anything is displayed
            return value && profile.user_id.username && profile.user_id.username.toLowerCase().includes(value)
        })
        setResults(results)
        console.log(results)
    });
    }

    const handleChange = (value) => {
        setInput(value);
        fetchData(value);
  }
  return (
    <div className="sticky top-0 py-1.5 bg-transparent z-50 w-11/12 xl:w-9/12">
        <div className="flex items-center bg-[#202327] p-3 rounded-full relative">
          <FaSearch className="text-gray-500 h-5 z-50" />
          <input
            type="text"
            className="bg-transparent placeholder-gray-500 outline-none text-[#d9d9d9] absolute inset-0 pl-11 border border-transparent w-full focus:border-[#1d9bf0] rounded-full focus:bg-black focus:shadow-lg"
            placeholder="Search Twitter"
            value={input}
            onChange={(e) => {handleChange(e.target.value);}}
            
            
          />
        </div>
      </div>

  )
}

export default SearchBar