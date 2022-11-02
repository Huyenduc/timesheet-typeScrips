import React, { useState } from 'react'
import { List, ListItem, ListItemButton, Avatar, Select, MenuItem, FormControl } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { removeMembers, updateMemberType } from '../../../../../redux/reducer/reducerProject'
import { useDispatch } from 'react-redux';
import Chip from '@mui/material/Chip';
import { IGetUserNotPagging } from '../../../../../interfaces/projectType';


const ListMember:React.FC<{member:IGetUserNotPagging}> = ({ member }) => {

    const [memberType, setMemberType] = useState("0");
    const dispatch = useDispatch();

    const handleChangeMemberType = (e:any) => {
        setMemberType(e.target.value);
        dispatch(updateMemberType({ ...member, type: parseInt(e.target.value) }))
    }
    const handleRemoveMenbers = (user:IGetUserNotPagging) => {
        dispatch(removeMembers(user));
    }
    return (
        <div className='team-member' >
            <List >
                <ListItem divider sx={{ display: "flex", alignItems: 'center', justifyContent: 'space-between', width: '90%' }}>
                    <div style={{ display: 'flex', gap: 30 }}>
                        <Avatar
                            src={member.avatarPath === "" ? `http://dev-timesheet.nccsoft.vn/assets/images/men.png` : `http://do78x13wq0td.cloudfront.net/${member.avatarPath}`}

                        />
                        <div className='list-item'>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <p>{member.name}</p>
                                {
                                    member.branchId === 1 ? <Chip label="Hà Nội 1" size="small" sx={{ size: "10px", backgroundColor: "red", color: "#ffffff", marginLeft: 1 }} /> : null

                                }
                                {
                                    member.type === 0 ? <Chip label="Staff" size="small" sx={{ size: "10px", backgroundColor: "#f44336", color: "#ffffff", marginLeft: 1 }} /> :
                                        member.type === 1 ? <Chip label="Internship" size="small" sx={{ size: "10px", backgroundColor: "#4caf50", color: "#ffffff", marginLeft: 1 }} /> :
                                            <Chip label="Collaborator" size="small" sx={{ size: "10px", backgroundColor: "#2196f3", color: "#ffffff", marginLeft: 1 }} />
                                }
                                {
                                    member.level === 8 ? <Chip label="Junior" size="small" sx={{ size: "10px", backgroundColor: "rgb(165, 113, 100)", color: "#ffffff", marginLeft: 1 }} /> :
                                        member.level === 5 ? <Chip label="Fresher" size="small" sx={{ size: "10px", backgroundColor: "rgb(137, 207, 240)", color: "#ffffff", marginLeft: 1 }} /> :
                                            member.level === 6 ? <Chip label="Fresher+" size="small" sx={{ size: "10px", backgroundColor: "rgb(49, 140, 231)", color: "#ffffff", marginLeft: 1 }} /> :
                                                member.level === 15 ? <Chip label="Senior+" size="small" sx={{ size: "10px", backgroundColor: "rgb(229, 43, 80)", color: "#ffffff", marginLeft: 1 }} /> :
                                                    member.level === 12 ? <Chip label="Middle+" size="small" sx={{ size: "10px", backgroundColor: "rgb(0, 128, 0)", color: "#ffffff", marginLeft: 1 }} /> :
                                                        member.level === 3 ? <Chip label="Intern_3" size="small" sx={{ size: "10px", backgroundColor: "rgb(119, 119, 119)", color: "#ffffff", marginLeft: 1 }} /> : ""
                                }
                            </div>

                            <p>{member.emailAddress}</p>

                        </div>
                    </div>

                    <div style={{ display: 'flex', gap: 70 }}>
                        <FormControl variant="standard" sx={{ m: 1, minWidth: 100 }}>
                            <Select
                                id="demo-simple-select"
                                value={memberType}
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
