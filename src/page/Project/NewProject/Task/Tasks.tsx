import React, { useState } from 'react';
import {
  TableHead,
  TableBody,
  TableCell,
  Table,
  TableContainer,
  TableRow,
  FormControlLabel,
  Checkbox,
  Collapse,
  ListItemButton
} from "@mui/material";
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { pushTasks, removeTask, updateBillable } from '../../../../redux/reducer/reducerProject'
import { AppDispatch, RootState } from '../../../../redux/store';
import { IGetAllTask } from '../../../../interfaces/tasksType';



const Tasks = () => {
  const [check, setCheck] = useState(true);
  const getTasks = useSelector((state: RootState) => state.project.listTasks);
  const selectTasks = useSelector((state: RootState) => state.project.selectedTasks);

  const disPatch = useDispatch<AppDispatch>();

  const handleAddTask = (item: IGetAllTask) => {
    disPatch(pushTasks(item));
  }

  const handleRemoveTask = (item: IGetAllTask) => {
    disPatch(removeTask(item));
  }

  return (
    <div style={{ height: 440, overflowY: "scroll" }}>
      <div>
        <TableContainer >
          <Table aria-label="customized table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 700 }}>Name</TableCell>
                <TableCell ></TableCell>
                <TableCell  >
                  <div style={{ display: 'block', marginBottom: -20, marginTop: -20 }}>
                    <div style={{ marginBottom: -10, marginLeft: -15, fontWeight: 700 }}>
                      Billable
                    </div>
                    <FormControlLabel
                      label=""
                      control={<Checkbox
                        name='isAllUserBelongTo'
                        defaultChecked={true}
                      // {...register("isAllUserBelongTo")}
                      />} />
                  </div>
                </TableCell>
                <TableCell ></TableCell>

              </TableRow>
            </TableHead>
            <TableBody>
              {!selectTasks ? null : selectTasks.map((item, index) => (
                <TableRow sx={index % 2 ? { background: "#e9e9e9" } : { background: "white" }}
                  key={item.id}>
                  <TableCell>
                    <RemoveCircleIcon
                      onClick={() => handleRemoveTask(item)}
                    />
                  </TableCell>
                  <TableCell  >
                    {item.name}
                  </TableCell>
                  <TableCell >
                    <FormControlLabel
                      label=""
                      control={<Checkbox
                        name='isAllUserBelongTo'
                        // value={check}
                        defaultChecked={true}
                        onChange={(e) => {
                          setCheck(e.target.checked);
                          disPatch((updateBillable({ ...item, billable: e.target.checked })));
                        }}
                      // {...register("isAllUserBelongTo")}
                      />}
                    />
                  </TableCell>
                  <TableCell></TableCell>

                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      <Collapse in={true} style={{ marginTop: 30 }}>
        <ListItemButton>
          <p>Select task</p>
        </ListItemButton>
        <TableContainer >
          <Table aria-label="customized table">
            {/* <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 700 }}>Select task</TableCell>
                <TableCell ></TableCell>
                <TableCell  >
                </TableCell>
                <TableCell ></TableCell>

              </TableRow>
            </TableHead> */}
            <TableBody>
              {!getTasks ? null : getTasks.map((item) => (
                <TableRow
                  key={item.id}>
                  <TableCell>
                    <AddCircleOutlinedIcon
                      onClick={() => handleAddTask(item)}

                    />
                  </TableCell>
                  <TableCell >
                    {item.name}
                  </TableCell>

                  {
                    item.type == 0 ? <TableCell>Common Tasks</TableCell> : <TableCell>OtherTask</TableCell>
                  }
                  <TableCell></TableCell>

                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Collapse>

    </div>
  )
}

export default Tasks;
