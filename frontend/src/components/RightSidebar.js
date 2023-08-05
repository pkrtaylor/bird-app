import React, {useState} from 'react'
import SearchBar from './SearchBar'
import SearchResultsList from './SearchResultsList'


const RightSidebar = () => {
  
    const [ results, setResults] = useState([])
    const [input, setInput] = useState("")

  return (
    <div className='hidden sm:flex flex-col items-center xl:w-[340px] p-2 h-full'>
        <SearchBar input={input} setInput={setInput} setResults={setResults} />
        <SearchResultsList results={results} setResults={setResults} input={input} setInput={setInput} />
    </div>
  )
}

export default RightSidebar