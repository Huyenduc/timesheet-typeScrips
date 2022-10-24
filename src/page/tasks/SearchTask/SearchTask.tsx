import React, { useEffect, useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';

interface ISearchBar {
  setSearchItem: (e: string) => void;
}
const SeachTasks = ({setSearchItem} :ISearchBar ) => {
  const [search,setSearch] = useState("");

  useEffect(()=>{
    handleSearch()
  },[search])

  const handleSearch =() =>{
    setSearchItem(search.trim());

  }
  return (
    <div className='SearchTasks'>
        <SearchIcon className='icon'/>
        <input
         placeholder='Search by task name'
         type="text"
         onChange={(e)=>setSearch(e.target.value.trim())}
        />
    </div>
  )
}

export default SeachTasks