import React, { useEffect } from 'react'
import { TextField } from "@mui/material";
import { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from "react-redux"
import { createTask } from "../../../redux/action/Task"
import { useSnackbar } from 'notistack';
import { AppDispatch, RootState } from '../../../redux/store';


import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
const NewTasks = () => {

  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [option, setOption] = useState(0);
  const { enqueueSnackbar } = useSnackbar();

  const handleClose = () => {
    setOpen(false);
    setOption(0);
    setName("");
  };

  const dispatch = useDispatch<AppDispatch>();
  const progress = useSelector((state: RootState) => state.task.progress);


  useEffect(() => {
    if (progress === "done" && open) {
      enqueueSnackbar(`New Task Success !!`, { variant: 'success' });
      handleClose();
    }
  }, [progress])


  const handleNewTask = async () => {
    if (name.trim() === "") {
      handleClose();
      enqueueSnackbar('Your request is not valid !', { variant: 'error' });
      return
    }

    dispatch(
      createTask({
        name: name,
        type: option
      })
    );

  }

  const handleOpen = () => {
    setOpen(true);
  };
  return (
    <div className='NewTasks'>
      <button className='button'
        onClick={handleOpen} >+ New Tasks</button>

      <div className='Modal'>

        <Dialog
          open={open}
          fullWidth={true}
          maxWidth='sm'
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            New Task
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <TextField
                id="outlined-basic"
                onChange={(e) => setName(e.target.value)}
                label="Name"
                variant="standard"
                value={name}
                style={{
                  width: "100%",
                }}
              ></TextField>

              <FormControl fullWidth>
                <InputLabel variant="standard" htmlFor="uncontrolled-native" />
                <NativeSelect onChange={(e) => setOption(Number(e.target.value))}>
                  <option value={0}>Common Task</option>
                  <option value={1}>Other Task</option>
                </NativeSelect>
              </FormControl>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button variant="secondary" style={{ background: '#FFFFFF', outline: 0, border: "aliceblue", boxShadow: '0 2px 5px rgb(0 0 0 / 16%), 0 2px 10px rgb(0 0 0 / 12%)', color: '#000' }} onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleNewTask} style={{ background: "#f24b50", outline: 0, border: "aliceblue" }}>
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </div>

    </div>
  )
}

export default NewTasks