import React, { useEffect } from 'react'
import { Button } from '@mui/material'
import { useDispatch } from 'react-redux'
import { archiveTask } from '../../../redux/action/Task'
import { dialogActions } from '../../../Notify/DialogActions'
import { withSnackbar, useSnackbar } from 'notistack';
import { useSelector } from 'react-redux';
import { IGetAllTask } from '../../../interfaces/tasksType'
import { AppDispatch } from '../../../redux/store'


const ArchiveTask: React.FC<{ task: IGetAllTask }> = ({ task }) => {

  const dispatch = useDispatch<AppDispatch>();

  const handleOnAchiveTask = (id: number) => {
    const callback = () => { dispatch(archiveTask(id)) };
    dialogActions(
      callback,
      `Archive task: "${task.name}" ?`);
  }
  return (
    <div>
      <Button
        style={{
          height: "40px",
          fontSize: "14px",
          background: "#FFFFFF",
          color: "#000000DE",
          textTransform: "none",
        }}
        onClick={() => { handleOnAchiveTask(task.id) }}
        variant="contained">Archive</Button>
    </div>
  )
}

export default ArchiveTask