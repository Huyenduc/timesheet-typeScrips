import React from 'react'
import Chip from '@mui/material/Chip';
import { List, ListItem, ListItemButton, Avatar } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { pushMembers } from '../../../../../redux/reducer/projectReducer'
import { useDispatch } from 'react-redux';


const ListUsers = ({ user }) => {
  const dispatch = useDispatch();

  const handleAddMenbers = (user) => {
    dispatch(pushMembers(user));
  }
  return (
    <div className='team-item'>
      <List >
        <ListItem divider>
          <ListItemButton sx={{ display: "flex", gap: 2 }}
            onClick={() => handleAddMenbers(user)}
          >
            <ArrowBackIosNewIcon />
            <Avatar
              src={user.avatarPath === "" ? `http://dev-timesheet.nccsoft.vn/assets/images/men.png` : null }
            />
            <div className='list-item'>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <p>{user.name}</p>
                {
                  user.branchId === 1 ? <Chip label="Hà Nội 1" size="small" sx={{ size: "10px", backgroundColor: "red", color: "#ffffff", marginLeft: 1 }} /> : null

                }
                {
                  user.type === 0 ? <Chip label="Staff" size="small" sx={{ size: "10px", backgroundColor: "#f44336", color: "#ffffff", marginLeft: 1 }} /> :
                    user.type === 1 ? <Chip label="Internship" size="small" sx={{ size: "10px", backgroundColor: "#4caf50", color: "#ffffff", marginLeft: 1 }} /> :
                      <Chip label="Collaborator" size="small" sx={{ size: "10px", backgroundColor: "#2196f3", color: "#ffffff", marginLeft: 1 }} />
                }
                {
                  user.level === 8 ? <Chip label="Junior" size="small" sx={{ size: "10px", backgroundColor: "rgb(165, 113, 100)", color: "#ffffff", marginLeft: 1 }} /> :
                    user.level === 5 ? <Chip label="Fresher" size="small" sx={{ size: "10px", backgroundColor: "rgb(137, 207, 240)", color: "#ffffff", marginLeft: 1 }} /> :
                      user.level === 6 ? <Chip label="Fresher+" size="small" sx={{ size: "10px", backgroundColor: "rgb(49, 140, 231)", color: "#ffffff", marginLeft: 1 }} /> :
                        user.level === 15 ? <Chip label="Senior+" size="small" sx={{ size: "10px", backgroundColor: "rgb(229, 43, 80)", color: "#ffffff", marginLeft: 1 }} /> :
                          user.level === 12 ? <Chip label="Middle+" size="small" sx={{ size: "10px", backgroundColor: "rgb(0, 128, 0)", color: "#ffffff", marginLeft: 1 }} /> :
                            user.level === 3 ? <Chip label="Intern_3" size="small" sx={{ size: "10px", backgroundColor: "rgb(119, 119, 119)", color: "#ffffff", marginLeft: 1 }} /> : ""
                }
              </div>
              <span>{user.emailAddress}</span>
            </div>
          </ListItemButton>
        </ListItem>
      </List>
    </div>

  )
}

export default ListUsers
