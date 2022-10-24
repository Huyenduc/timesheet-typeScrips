import React from 'react'
import EditTask from '../EditTask/EditTask';
import DeleteTask from '../DeleteTask/DeleteTask';
import {
    TableHead,
    TableBody,
    TableCell,
    Table,
    TableContainer,
    TableRow,
} from "@mui/material";

import {  useSelector } from "react-redux";
import {getOtherTaskSelector} from "../../../redux/reducer/reducerTask";
import { RootState } from '../../../redux/store';

const OtherTask = () => {
    const otherTasks = useSelector(getOtherTaskSelector);
    const search = useSelector((state:RootState) => state.task.searchName)

    return (

        <div className='ListTasks'>
            <div className='ListTasks-Title'>
                <h4>Other Task ({otherTasks.filter((item) => item.name.includes(search)).length})</h4>
                <p>These task must be manually added to projects</p>
            </div>
            <div className='ListTasks-Table'>
                <TableContainer >
                    <Table aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 700 }}>Name</TableCell>
                                <TableCell ></TableCell>
                                <TableCell ></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {!otherTasks ? null : otherTasks.filter((item) => item.name.includes(search)).map((item, index) => (
                                <TableRow sx={ index % 2? { background : "#e9e9e9" }:{ background : "white" }}
                                    key={item.id}
                                >
                                    <TableCell>
                                        <EditTask task={item}/>
                                    </TableCell>
                                    <TableCell style={{left:-500}}>
                                        {item.name}
                                    </TableCell>

                                    <TableCell align="right">
                                        <DeleteTask task={item} />
                                    </TableCell>

                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    )
}

export default OtherTask