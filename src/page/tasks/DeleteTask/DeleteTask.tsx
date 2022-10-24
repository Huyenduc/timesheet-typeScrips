import React from 'react'
import { Button } from '@mui/material'
import { dialogActions } from '../../../Notify/DialogActions'
import { useDispatch } from 'react-redux'
import { deletetask } from "../../../redux/action/Task"
import { IGetAllTask } from '../../../interfaces/tasksType'
import { AppDispatch } from '../../../redux/store'


const DeleteTask: React.FC<{task:IGetAllTask}> = ({task}) => {

  const dispatch = useDispatch <AppDispatch>();

  const handleDeleteTask = (id: number) => {
    const callback = () => { dispatch(deletetask(id)) };
    dialogActions(
      callback,
      `Delete task: "${task.name}"  ?`)
  }
  return (
    <div>
      <Button
        style={{
          height: "40px",
          fontSize: "14",
          background: "#fb483a",
          color: "#FFF",
          textTransform: "none",
          padding: 16,
          minWidth: 64,
          textAlign: "center",
          alignItems: "center"
        }}
        onClick={() =>handleDeleteTask(task.id)}
        variant="contained">Delete</Button>
    </div>
  )
}

export default DeleteTask
