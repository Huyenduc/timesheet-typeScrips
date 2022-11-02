import React, { useState } from 'react'
import Chip from '@mui/material/Chip';
import { ListItem, ListItemButton, Avatar } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { pushMembers } from '../../../../../redux/reducer/reducerProject'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Checkbox, Button, FormControlLabel, FormControl, InputLabel, Select, InputAdornment, MenuItem, TextField, Collapse } from '@mui/material';

import { FixedSizeList as List ,FixedSizeListProps} from "react-window";
import { RootState } from '../../../../../redux/store';
import { IGetUserNotPagging } from '../../../../../interfaces/projectType';

interface row{
  index:any,
  key:number,
  style:any
}

const ListUsers:React.FC = () => {
  const [dataSearch, setDataSearch] = useState({
    brand: -1,
    type: -1,
    search: ''
  });
  const dispatch = useDispatch();
  const getUser = useSelector((state: RootState) => state.project.listMembers);


  const handleAddMenbers = (user: IGetUserNotPagging) => {
    dispatch(pushMembers(user));
  }
  const usersFilter = getUser.filter((item) => {
    if (dataSearch.brand === -1 && dataSearch.type === -1) {
      return item && item.name.includes(dataSearch.search);
    } else if (dataSearch.brand === -1 && dataSearch.type >= 0) {
      return item.type === dataSearch.type && item.name.includes(dataSearch.search)
    } else if (dataSearch.brand > 0 && dataSearch.type === -1) {
      return item.branchId === dataSearch.brand &&
        item.name.includes(dataSearch.search)
    } else {
      return item.branchId === dataSearch.brand
        && item.type === dataSearch.type
        && item.name.includes(dataSearch.search)
    }
  });
  const Row: FixedSizeListProps['children'] = ({ index, style }) => (
    <div key={index} style={style}>
      <ListItem divider >
        <ListItemButton sx={{ display: "flex", gap: 2 }}
          onClick={() => handleAddMenbers(usersFilter[index])}
        >
          <ArrowBackIosNewIcon />
          <Avatar
            // src={usersFilter[index].avatarPath === "" ? `http://dev-timesheet.nccsoft.vn/assets/images/men.png` : null}
          />
          <div className='list-item'>
            <div style={{ display: 'flex', alignItems: 'center', width: "400px" }}>
              <p>{usersFilter[index].name}</p>
              {
                usersFilter[index].branchId === 1 ? <Chip label="Hà Nội 1" size="small" sx={{ size: "10px", backgroundColor: "red", color: "#ffffff", marginLeft: 1 }} /> : null

              }
              {
                usersFilter[index].type === 0 ? <Chip label="Staff" size="small" sx={{ size: "10px", backgroundColor: "#f44336", color: "#ffffff", marginLeft: 1 }} /> :
                  usersFilter[index].type === 1 ? <Chip label="Internship" size="small" sx={{ size: "10px", backgroundColor: "#4caf50", color: "#ffffff", marginLeft: 1 }} /> :
                    <Chip label="Collaborator" size="small" sx={{ size: "10px", backgroundColor: "#2196f3", color: "#ffffff", marginLeft: 1 }} />
              }
              {
                usersFilter[index].level === 8 ? <Chip label="Junior" size="small" sx={{ size: "10px", backgroundColor: "rgb(165, 113, 100)", color: "#ffffff", marginLeft: 1 }} /> :
                  usersFilter[index].level === 5 ? <Chip label="Fresher" size="small" sx={{ size: "10px", backgroundColor: "rgb(137, 207, 240)", color: "#ffffff", marginLeft: 1 }} /> :
                    usersFilter[index].level === 6 ? <Chip label="Fresher+" size="small" sx={{ size: "10px", backgroundColor: "rgb(49, 140, 231)", color: "#ffffff", marginLeft: 1 }} /> :
                      usersFilter[index].level === 15 ? <Chip label="Senior+" size="small" sx={{ size: "10px", backgroundColor: "rgb(229, 43, 80)", color: "#ffffff", marginLeft: 1 }} /> :
                        usersFilter[index].level === 12 ? <Chip label="Middle+" size="small" sx={{ size: "10px", backgroundColor: "rgb(0, 128, 0)", color: "#ffffff", marginLeft: 1 }} /> :
                          usersFilter[index].level === 3 ? <Chip label="Intern_3" size="small" sx={{ size: "10px", backgroundColor: "rgb(119, 119, 119)", color: "#ffffff", marginLeft: 1 }} /> : ""
              }
            </div>
            <span>{usersFilter[index].emailAddress}</span>
          </div>
        </ListItemButton>
      </ListItem>
    </div>)
  return (

    <div className='list-User'>
      <p>Select team member</p>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <FormControl variant="standard" sx={{ m: 1, minWidth: 100 }}>
          <InputLabel id="demo-simple-select-standard-label">Branch</InputLabel>
          <Select
            id="demo-simple-select"
            value={dataSearch.brand}
            onChange={(e) => setDataSearch({
              ...dataSearch,
              brand: +e.target.value
            })}
          >
            <MenuItem value={-1}>All</MenuItem>
            <MenuItem value={1}>Ha Noi 1</MenuItem>
            <MenuItem value={2}>1</MenuItem>

          </Select>
        </FormControl>


        <FormControl variant="standard" sx={{ m: 1, minWidth: 100 }}>
          <InputLabel id="demo-simple-select-standard-label">Type</InputLabel>
          <Select
            id="demo-simple-select"
            value={dataSearch.type}
            onChange={(e) => setDataSearch({
              ...dataSearch,
              type: + e.target.value
            })}
          >
            <MenuItem value={-1}>All</MenuItem>
            <MenuItem value={0}>Staff</MenuItem>
            <MenuItem value={1}>Internship</MenuItem>
            <MenuItem value={2}>Collaborator</MenuItem>
          </Select>
        </FormControl>

        <TextField
          id="Search"
          value={dataSearch.search}
          onChange={(e) => setDataSearch({
            ...dataSearch,
            search: e.target.value
          })}
          style={{ width: "270px" }}
          label="Search by name"
          variant="standard"
        />
      </div>
      <div className='team-item'>
        <List
          width={1400}
          height={340}
          itemCount={usersFilter.length}
          itemSize={80}>
          {Row}
        </List>
      </div>

    </div>


  )
}

export default ListUsers
