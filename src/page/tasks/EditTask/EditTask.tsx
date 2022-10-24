import { Button } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { TextField } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";

// import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
// import Modal from "@mui/material/Modal";

import { useDispatch, useSelector } from "react-redux"
import { createTask } from "../../../redux/action/Task"
import { useSnackbar } from 'notistack';
import { RootState } from '../../../redux/store';
import { AppDispatch } from '../../../redux/store';
import { IGetAllTask } from '../../../interfaces/tasksType'

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


interface INewTask {
  id: number;
  name: string;
  type: string;
}
const EditTask: React.FC<{ task: IGetAllTask }> = ({ task }) => {

  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [option, setOption] = useState(0);
  const { enqueueSnackbar } = useSnackbar();

  const dispatch = useDispatch<AppDispatch>();
  const progress = useSelector((state: RootState) => state.task.progress);

  const handleClose = () => {
    setOpen(false);
    setOption(0);
    setName("");
  };

  useEffect(() => {
    if (progress === "done" && open) {
      handleClose();
    } else if (progress == "") {

    }
  }, [progress])

  const handleOpen = (id: number) => {
    setName(task.name)
    setOpen(true)
  }

  const handleEditTask = () => {
    if (name.trim() === "") {
      handleClose();
      enqueueSnackbar('Your request is not valid !', { variant: 'error' });
      return
    }

    dispatch(createTask({
      name: name,
      type: option,
      id: task.id
    }));
  }

  return (

    <div>
      <Button
        style={{
          height: "40px",
          fontSize: "14",
          background: "#1F91F3",
          color: "#FFF",
          textTransform: "none",
          padding: 16,
          minWidth: 64,
          textAlign: "center",
          alignItems: "center"
        }}
        variant="contained"
        onClick={() => handleOpen(task.id)}
      >
        Edit</Button>

      <Dialog
        open={open}
        fullWidth={true}
        maxWidth='sm'
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Edit Task:{name}
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
          <Button onClick={() => handleClose()}>
            Cancel
          </Button>
          <Button onClick={handleEditTask} style={{ background: "#f24b50", outline: 0, border: "aliceblue" }}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default EditTask
