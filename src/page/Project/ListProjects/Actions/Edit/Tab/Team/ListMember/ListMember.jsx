import React, { useState } from 'react'
import { List, ListItem, ListItemButton, Avatar, Select, MenuItem, FormControl } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { removeMembers, updateMemberType } from '../../../../../../../../redux/reducer/projectReducer'
import { useDispatch } from 'react-redux';


const ListMember = ({ member }) => { 

    const [memberType, setMemberType] = useState("0");
    const dispatch = useDispatch();

    const handleChangeMemberType = (e) => {
        setMemberType(e.target.value);
        dispatch(updateMemberType({ ...member, type: parseInt(e.target.value) }))
    }
    const handleRemoveMenbers = (user) => {
        dispatch(removeMembers(user));
    }
    return (
        <div className='team-member' >
            <List >
                <ListItem divider sx={{ display: "flex", alignItems: 'center', justifyContent: 'space-between', width: '90%' }}>
                    <div style={{ display: 'flex', gap: 30 }}>
                        <Avatar
                        // src={`http://do78x13wq0td.cloudfront.net/${user.avatarPath}`} 
                        />
                        <div className='list-item'>
                            <p>{member.name}</p>
                            <span>{member.emailAddress}</span>

                        </div>
                    </div>

                    <div style={{ display: 'flex', gap: 70 }}>
                        <FormControl variant="standard" sx={{ m: 1, minWidth: 100 }}>
                            <Select
                                id="demo-simple-select"
                                value={member.typeOffice}
                                onChange={handleChangeMemberType}
                            >
                                <MenuItem value={0}>Member</MenuItem>
                                <MenuItem value={1}>PM</MenuItem>
                                <MenuItem value={2}>Shadow</MenuItem>
                                <MenuItem value={3}>Deactive</MenuItem>
                            </Select>
                        </FormControl>

                        <ListItemButton
                            onClick={() => handleRemoveMenbers(member)}
                        >
                            <ArrowForwardIosIcon />
                        </ListItemButton>
                    </div>
                </ListItem>
            </List>
        </div>

    )
}

export default ListMember
