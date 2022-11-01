import React, { useEffect, useState } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Button } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import EditIcon from '@mui/icons-material/Edit';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import ClearIcon from '@mui/icons-material/Clear';
import DeleteIcon from '@mui/icons-material/Delete';
import EditProject from './Edit/EditProject';
import { useDispatch, useSelector } from 'react-redux';
import { getItemProject, getUser, deleteProject, inactiveProject, activeProject } from '../../../../redux/action/Projects';
import { getTask } from '../../../../redux/action/Tasks';

import { dialogActions } from '../../../../Notify/DialogActions';


const Actions = ({ project }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openModal, setOpen] = useState(false);

  const dispatch = useDispatch();
 
  const open = Boolean(anchorEl);
  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
    dispatch(getItemProject({ id: project.id }));
    dispatch(getUser());
    dispatch(getTask());
  };
  const handleClose = () => {
    setAnchorEl(null);
    setOpen(true);
  };


  const handleDeactive = (id) => {
    setAnchorEl(null);
    // console.log(id)
    const callback = () => { dispatch(inactiveProject({id:id})) };
    dialogActions(
      callback,
      `Deactive Prject: "${project.name}"  ?`)
  };

  const handleActive = (id) => {
    setAnchorEl(null);
    // console.log(id)
    const callback = () => { dispatch(activeProject({id:id})) };
    dialogActions(
      callback,
      `Active Prject: "${project.name}"  ?`)
  };



  const handleDelete = (id) => {
    setAnchorEl(null);
    // console.log(id)
    const callback = () => { dispatch(deleteProject(id)) };
    dialogActions(
      callback,
      `Delete Prject: "${project.name}"  ?`);

  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        style={{
          height: "40px",
          fontSize: "14px",
          background: "#FFFFFF",
          color: "#000000DE",
          textTransform: "none",
        }}
        variant="contained">Actions <ArrowDropDownIcon />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem className='icon' onClick={handleClose} sx={{ fontSize: 13 }}  > <EditIcon sx={{ color: '#555' }} /> Edit </MenuItem>
        <MenuItem className='icon' onClick={handleDelete} sx={{ fontSize: 13 }}><RemoveRedEyeIcon sx={{ color: '#555' }} /> View</MenuItem>
        {
          project.status == 0 ?
            <MenuItem className='icon' onClick={() => handleDeactive(project.id)} sx={{ fontSize: 13 }}><ClearIcon sx={{ color: '#555' }} /> Deactive </MenuItem>
            :
            <MenuItem className='icon' onClick={() => handleActive(project.id)} sx={{ fontSize: 13 }}><ClearIcon sx={{ color: '#555' }} /> Active </MenuItem>
        }

        <MenuItem className='icon' onClick={() => handleDelete(project.id)} sx={{ fontSize: 13 }}><DeleteIcon sx={{ color: '#555' }} /> Delete</MenuItem>
      </Menu>
      <EditProject openModal={openModal} setOpen={setOpen} />

    </div >
  )
}

export default Actions;