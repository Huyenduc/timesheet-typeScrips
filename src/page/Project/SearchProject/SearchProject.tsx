import React, { useEffect, useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';


interface setState {
    setSearch: (value: string) => void
}
const SearchProject = ({ setSearch }: setState) => {
    const [search, setSearchs] = useState("");
    useEffect(() => {
        handleSearch();
    }, [search])

    const handleSearch = () => {
        setSearch(search.trim());
    };
    return (
        <div className='Search-Project'>
            <SearchIcon className='icon' />
            <input
                placeholder='Search by clent or project name '
                type="text"
                onChange={(e) => setSearchs(e.target.value.trim())}
            />
        </div>
    )
}

export default SearchProject