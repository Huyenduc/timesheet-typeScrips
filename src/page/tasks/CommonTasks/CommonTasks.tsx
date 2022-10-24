import React, { useEffect, useState } from 'react'
import EditTask from '../EditTask/EditTask';
import DeleteTask from '../DeleteTask/DeleteTask';
import ArchiveTask from '../ArchiveTask/ArchiveTask';
import DeArchiveTask from '../DeArchiveTask/DeArchiveTask';

import { useSnackbar } from 'notistack';
import {
    TableHead,
    TableBody,
    TableCell,
    Table,
    TableContainer,
    TableRow,
    Button,
} from "@mui/material";

import { useSelector } from "react-redux";
import { getCommonTaskSelector } from "../../../redux/reducer/reducerTask"
import { RootState } from '../../../redux/store';

const CommonTasks = () => {
    const commonTasks = useSelector(getCommonTaskSelector);
    const searchName = useSelector((state:RootState) => state.task.searchName);
    return (
        <div className='ListTasks'>
           
            <div className='ListTasks-Title'>
                <h4>Common Task ({commonTasks.filter((item) => item.name.includes(searchName)).length})</h4>
                <p>These tasks are automatically added to all new projects</p>
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
                        <TableBody  >
                            { commonTasks.filter((item) => item.name.includes(searchName)).map((item, index) => (
                                <TableRow
                                    key={item.id}
                                    sx={ index % 2? { background : "#e9e9e9" }:{ background : "white" }}
                                >
                                    <TableCell >
                                        <EditTask task={item} />
                                    </TableCell>
                                    <TableCell>
                                        {item.name}
                                    </TableCell>
                                    <TableCell align="right"
                                    // onClick={handleClick}
                                    >
                                        {!item.isDeleted ? (
                                            <div style={{ display: "flex", gap: "50px", justifyContent: "flex-end" }}>
                                                <ArchiveTask task={item} />
                                                <Button
                                                    variant="outlined"
                                                    style={{
                                                        height: "40px",
                                                        fontSize: "14px",
                                                        background: "#d43f3a",
                                                        textTransform: "none",
                                                    }}
                                                    disabled>
                                                    Delete
                                                </Button>
                                            </div>
                                        ) : (
                                            <div style={{ display: "flex", gap: "50px", justifyContent: "flex-end" }} >
                                                <DeArchiveTask task={item} />
                                                <DeleteTask task={item} />
                                            </div>
                                        )
                                        }
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

export default CommonTasks