import React, {  useEffect } from 'react'
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import { useDispatch, useSelector } from 'react-redux';
import { getQuantitySelector, getAllProjectSelector } from '../../../redux/reducer/reducerProject'
import { getQuantity } from '../../../redux/action/Project'
import { AppDispatch } from '../../../redux/store';

interface setState{
    setStatus: (value: any) => void
}

const SelectProjects = ({ setStatus }:setState) => {
    const dispatch = useDispatch<AppDispatch>();
    const getAllQuality = useSelector(getQuantitySelector);

    const getAllProject  = useSelector(getAllProjectSelector );

    const Deactive = getAllQuality.filter((item) => item.status === 1).map((item) => {
        return item.quantity;
    })
    const Active = getAllQuality.filter((item) => item.status === 0).map((item) => {
        return item.quantity;
    })


    useEffect(() => {
        dispatch(getQuantity());
    }, [])
    return (
        <div className='Select-Project'>

            <FormControl fullWidth={true} >
              
                <TextField
                    // labelid="demo-simple-select-label"
                    id="demo-simple-select"
                    //   value={age}
                    select
                    label={ "Select Project" }
                    onChange={(e) => setStatus(e.target.value)}
                >
                    <MenuItem value={0}>Active Projects ({Active})</MenuItem>
                    <MenuItem value={1}>Deactive Project ({Deactive})</MenuItem>
                    <MenuItem value={""}>All Project({getAllProject.length})</MenuItem>
                </TextField>
            </FormControl>

        </div>
    )
}

export default SelectProjects
