import React, { useState } from 'react'
import { Checkbox, Button, FormControlLabel, FormControl, InputLabel, Select, InputAdornment, MenuItem, TextField, Collapse } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ListUsers from './ListUsers/ListUsers'
import { useSelector } from 'react-redux';
import ListMember from './ListMember/ListMember';
import useDebounced from '../../../../hooks/useDebounced';
import { RootState } from '../../../../redux/store';

const Team = () => {
  const [openListView, setOpenListView] = useState(false);
  const [branch, setBranch] = useState("All");
  const [type, setType] = useState("All");
  const [searchUser, setSearchUser] = useState("");
  const [searchMember, setSearchMember] = useState("");

  const getUser = useSelector((state: RootState) => state.project.listMembers);
  const getMember = useSelector((state: RootState) => state.project.selectedMembers);

  const handleChangeBranch = (e: any) => {
    setBranch(e.target.value)
  };

  const handleChangeType = (e: any) => {
    setType(e.target.value)
  };

  const debouncedSearch = useDebounced(searchMember, 200);

  return (


    <div className='team'>

      <div className='team-top' >
        <div className='team-title'>
          <p>Team</p>
        </div>
        <div className='team-heard'  >
          <div className='team-checkbok'>
            <FormControlLabel
              control={<Checkbox
                name='isAllUserBelongTo'
                defaultChecked={false}
              // {...register("isAllUserBelongTo")}
              />}
              label="Show deactive member" />
            <FormControlLabel
              control={<Checkbox
                name='isAllUserBelongTo'
                defaultChecked={false}
              // {...register("isAllUserBelongTo")}
              />}
              label="Show Inactive user" />
          </div>
          <div className='team-search'>
            <TextField
              sx={{ width: '90%' }}
              label="Search by name, email"
              value={searchMember}
              onChange={(e) => setSearchMember(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                )
              }}
            />
            <Button style={{
              height: "40px",
              fontSize: "13",
              background: "#fb483a",
              color: "#FFF",
              textTransform: "none",
              padding: 16,
              // minWidth: 64,
              marginRight: 10,
              width: "34%",
              textAlign: "center",
              alignItems: "center",
              marginTop: 10
            }}
              // type='submit'
              onClick={() => setOpenListView(!openListView)}
            >
              {!openListView ? "Add user" : "Exit add"}
            </Button>
          </div>
        </div>
        <div >
          {/* <Collapse in={openListView} timeout="auto" unmountOnExit> */}
          <div className='list-member'>
            {
              getMember.filter((i) => i.name.includes(debouncedSearch)).map((item) => (
                <ListMember key={item.id} member={item} />
              ))
            }
          </div>

          {/* </Collapse> */}

        </div>
      </div>
      <div >
      <Collapse in={openListView} timeout="auto" unmountOnExit>
          <ListUsers />
        </Collapse>
      </div>
    </div>


  )
}

export default Team
