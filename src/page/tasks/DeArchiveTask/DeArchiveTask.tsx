import React, { useEffect } from 'react'
import { Button } from '@mui/material'
import { useDispatch } from 'react-redux'
import { deArchiveTask } from '../../../redux/action/Task'
import { dialogActions } from '../../../Notify/DialogActions'

import { IGetAllTask } from '../../../interfaces/tasksType'
import { AppDispatch } from '../../../redux/store'

const DeArchiveTask: React.FC<{ task: IGetAllTask }> = ({ task }) => {

  const dispatch = useDispatch<AppDispatch> ();

  const handleOnDeAchiveTask = (id: number) => {
    const callback = () => { dispatch(deArchiveTask(id)) };
    dialogActions(
      callback,
      `Unarchive task: "${task.name}" ?`);

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
        onClick={() => { handleOnDeAchiveTask(task.id) }}
        variant="contained">Unarchive</Button>
    </div>
  )
}

export default DeArchiveTask