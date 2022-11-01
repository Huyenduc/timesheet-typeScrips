import React, { useState } from 'react'
import { Checkbox, Button, FormControlLabel, FormControl, InputLabel, Select, InputAdornment, MenuItem, TextField, Collapse } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ListUsers from './ListUsers/ListUsers'
import { useSelector } from 'react-redux';
import ListMember from './ListMember/ListMember';
import useDebounced from '../../../../Notify/useDebounced';

const Team = () => {
  const [openListView, setOpenListView] = useState(false);
  const [branch, setBranch] = useState("All");
  const [type, setType] = useState("All");
  const [searchUser, setSearchUser] = useState("");
  const [searchMember, setSearchMember] = useState("");

  const getUser = useSelector((state) => state.project.listMembers);
  const getMember = useSelector((state) => state.project.selectedMembers);

  const handleChangeBranch = (e) => {
    setBranch(e.target.value)
  };

  const handleChangeType = (e) => {
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
              onChange={(e)=>setSearchMember(e.target.value)}
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
              getMember.filter((i)=> i.name.includes(debouncedSearch)).map((item) => (
                <ListMember key={item.id} member={item} />
              ))
            }
          </div>

          {/* </Collapse> */}

        </div>
      </div>
      <div >

        <Collapse in={openListView} timeout="auto" unmountOnExit>
          <div className='list-User'>
            <p>Select team member</p>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <FormControl variant="standard" sx={{ m: 1, minWidth: 100 }}>
                <InputLabel id="demo-simple-select-standard-label">Branch</InputLabel>
                <Select
                  id="demo-simple-select"
                  value={branch}
                  onChange={handleChangeBranch}
                >
                  <MenuItem value={"All"}>All</MenuItem>
                  <MenuItem value={1}>Ha Noi 1</MenuItem>
                  <MenuItem value={2}>1</MenuItem>

                </Select>
              </FormControl>


              <FormControl variant="standard" sx={{ m: 1, minWidth: 100 }}>
                <InputLabel id="demo-simple-select-standard-label">Type</InputLabel>
                <Select
                  id="demo-simple-select"
                  value={type}
                  onChange={handleChangeType}
                >
                  <MenuItem value={"All"}>All</MenuItem>
                  <MenuItem value={0}>Staff</MenuItem>
                  <MenuItem value={1}>Internship</MenuItem>
                  <MenuItem value={2}>Collaborator</MenuItem>
                </Select>
              </FormControl>

              <TextField
                id="Search"
                value={searchUser}
                onChange={(e)=>setSearchUser(e.target.value)}
                style={{ width: "270px" }}
                label="Search by name"
                variant="standard"
              />
            </div>
            <div className='user-id'>
              {

                branch === "All" ? getUser.filter((i)=> i.name.includes(searchUser)).map((item) => (
                  <ListUsers key={item.id} user={item} />
                )) :

                  getUser.filter((i) => (i.branchId == branch)).map((item) => (
                    <ListUsers key={item.id} user={item} />
                  ))


              }
              
            </div>

          </div>

        </Collapse>
      </div>
    </div>


  )
}

export default Team
