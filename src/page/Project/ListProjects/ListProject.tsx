import React from 'react'
import { useEffect } from 'react';
import { useSnackbar } from 'notistack';
import { useSelector } from 'react-redux';
import { getAllProjectSelector } from '../../../redux/reducer/reducerProject';

import {
    TableHead,
    TableBody,
    TableCell,
    Table,
    TableContainer,
    TableRow,
    Button
} from "@mui/material";
// import Actions from './Actions/Actions';
import { RootState } from '../../../redux/store';
import { IProject } from '../../../interfaces/projectType';

const ListProject: React.FC = () => {

    const getProgaress = useSelector((state: RootState) => state.project.progaress);
    const getAllProject = useSelector(getAllProjectSelector)

    // const error = useSelector((state:RootState) => state.project.message);
    const { enqueueSnackbar } = useSnackbar();

    var moment = require('moment')
    const formatDay = (day: string) => moment(day).format("DD/MM/YYYY");

    // useEffect(() => {
    //     if (getProgaress === "active-done") {
    //         enqueueSnackbar(`Active Project Success !`, { variant: 'success' });

    //     } else if(getProgaress === "inactive-done"){
    //         enqueueSnackbar(`Deacttive Project Success !`, { variant: 'success' });
    //     } 
    //     else if(getProgaress === "delete-done"){
    //         enqueueSnackbar(`Delete Project Success !`, { variant: 'success' });
    //     } 
    //     else if (getProgaress === "error" ) {
    //         enqueueSnackbar(`${error} !`, { variant: 'error' });
    //     }

    // }, [getProgaress], [error])

    const groupBy = (objectArray: any, property: any) => {
        return objectArray.reduce((accumulator: any, currentObject: any) => {
            let key = currentObject[property];
            //   console.log(property)
            if (!accumulator[key]) {
                accumulator[key] = [];
            }
            accumulator[key].push(currentObject);
            //   console.log(accumulator)
            return accumulator;
        }, {});
    }

    let groupedProject = groupBy(getAllProject, "customerName");

    return (
        <div className='List-Project'>
            <div>
                {
                    Object.keys(groupedProject).map((post, index) => {
                        return (
                            <TableContainer sx={{ padding: 3 }}
                                key={index}
                            >
                                <Table
                                    className='sdsd'
                                    aria-label="simple table"
                                    sx={{
                                        border: 1,
                                        color: "#e9e9e9",
                                    }}
                                >
                                    <TableHead>
                                        <TableRow>
                                            <TableCell
                                                sx={{
                                                    width: "100%",
                                                    background: "#d3d3d3",
                                                    padding: "10px",
                                                    fontWeight: "bold",
                                                    fontSize: "20px",
                                                }}
                                            >
                                                {post}
                                            </TableCell>

                                        </TableRow>
                                    </TableHead>
                                    {
                                        getAllProject.filter((item) => item.customerName === post).map((item, index) => (
                                            <TableBody
                                                key={item.id}
                                                sx={index % 2 ? { background: "#e9e9e9" } : { background: "white" }}>
                                                <TableRow>
                                                    <TableCell scope="row"
                                                        sx={{
                                                            width: "100%",
                                                            display: "flex",
                                                            padding: 1,
                                                            justifyContent: "space-between"
                                                        }}>
                                                        <div style={{
                                                            display: "flex",
                                                            gap: "15px",
                                                            alignItems: "center",
                                                            width: '80%'
                                                        }}>
                                                            <div>{item.name}</div>
                                                            <div className='pms'>{item.pms.join(", ")}</div>
                                                            <div className='member'>{item.activeMember} members</div>

                                                            {
                                                                item.projectType == 0
                                                                    ? <div className='projectType'>T&M</div>
                                                                    : item.projectType == 1
                                                                        ? <div className='projectType'>FF</div>
                                                                        : item.projectType == 2
                                                                            ? <div className='projectType'>NB</div>
                                                                            : <div className='projectType'>OCD</div>
                                                            }

                                                            {!item.timeEnd ? <div className='time'>{formatDay(item.timeStart)}</div>
                                                                : <div className='time'>{formatDay(item.timeStart)} - {formatDay(item.timeEnd)}</div>
                                                            }
                                                        </div>

                                                        <div style={{ display: 'flex ', gap: 10, alignItems: 'center', justifyContent: 'space-between', fontSize: 12 }}>
                                                            {
                                                                item.status === 0
                                                                    ?
                                                                    <div style={{ color: '#fff', backgroundColor: '#4caf50', padding: '0px 4px', borderRadius: 2 }}>Active</div>
                                                                    :
                                                                    <div style={{ color: '#fff', backgroundColor: '#9e9e9e', padding: '0px 4px', borderRadius: 2 }}>Inactive</div>
                                                            }
                                                            {/* <Actions project={item} /> */}
                                                        </div>

                                                    </TableCell>


                                                </TableRow>
                                            </TableBody>
                                        ))
                                    }

                                </Table>
                            </TableContainer>
                        )
                    })
                }

            </div>
        </div>
    )
}

export default ListProject
