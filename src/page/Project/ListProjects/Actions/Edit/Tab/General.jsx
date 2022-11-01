import React from 'react'
import { TextField, MenuItem, FormGroup, Button, Checkbox, FormControlLabel } from "@mui/material";
import Stack from '@mui/material/Stack';
import Form from 'react-bootstrap/Form';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import dayjs from 'dayjs'
import { useState } from 'react';
import { getAllCustomeSelector, getProject2 } from '../../../../../../redux/reducer/projectReducer'
import { useDispatch, useSelector } from 'react-redux';
import { Controller, useFormContext } from 'react-hook-form'


const General = ({ register, setValue, getProject}) => {

    const [open, setOpen] = useState(false);
    const [timeStart, setTimeStart] = useState(getProject.timeStart);
    const [timeEnd, setTimeEnd] = useState(getProject.timeEnd);
    const [activate, setActivate] = useState(getProject.projectType);
    // const [projectType,  ] = useState(1);
    // const projectGet = useSelector(getProject2);
    console.log(getProject)
    const dispatch = useDispatch();

    const getAllCustomes = useSelector(getAllCustomeSelector);
    const dataGeneral = useSelector((state) => state.project.general);


    const startDateFormat = dayjs(timeStart).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]')
    const endDateFormat = dayjs(timeEnd).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]')


    return (
        <div className='General' style={{ height: 440, display: 'flex', flexDirection: 'column', overflowY: 'scroll' }}>

            <div className='row-general' style={{ marginTop: 10 }} >
                <p >Client*</p>
                <FormGroup sx={{ width: "55%" }} noValidate autoComplete="off">
                    <TextField
                        id="outlined-select-gender"
                        select
                        label="Custome"
                        defaultValue={getProject.customerId}
                        // value={getProject.customerName}
                        // InputLabelProps={{ shrink: false }}
                        {...register("customerId", { required: true })}

                        variant="outlined"
                    >
                        {
                            getAllCustomes.map((item, index) => (
                                <MenuItem
                                    key={index}
                                    value={item.id}
                                >{item.name}</MenuItem>
                            ))
                        }
                    </TextField>

                </FormGroup>


                <Button className='new-client'
                    style={{
                        marginLeft: "20px",
                        height: "40px",
                        fontSize: "14",
                        background: "#fb483a",
                        color: "#FFF",
                        textTransform: "none",
                        padding: 16,
                        minWidth: 64,
                        marginTop: 10,
                        textAlign: "center",
                        alignItems: "center"
                    }}
                    onClick={() => setOpen(true)}
                >+ New client
                </Button>
                {/* <NewClient open={open} setOpen={setOpen} /> */}

            </div>
            <div className='row-general' >
                <p >Project Name*</p>
                <FormGroup sx={{ width: "55%" }} noValidate autoComplete="off">
                    <TextField
                        defaultValue={getProject.name}
                        id="outlined-select-gender"
                        label={"Name"}
                        // value={getProject.name}
                        {...register("name", { required: true })}
                        variant="outlined"
                    >
                    </TextField>
                </FormGroup>
            </div>
            <div className='row-general' >
                <p >Project Code*</p>
                <FormGroup sx={{ width: "20%" }} noValidate autoComplete="off">
                    <TextField
                        id="outlined-select-gender"
                        label={!getProject.code ? "code" : "code"}
                        // value={getProject.code}
                        defaultValue={getProject.code}
                        {...register("code", { required: true })}
                        variant="outlined"
                    >
                    </TextField>
                </FormGroup>
            </div>

            <div className='row-general'>
                <p >Dates*</p>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Stack spacing={4} sx={{ width: "27%" }}>
                        <DesktopDatePicker
                            label="Time Start"
                            inputFormat="DD/MM/YYYY"
                            inputVariant="outlined"
                            value={timeStart}
                            onChange={(e) => (setTimeStart(e))}
                            onClick={setValue("timeStart", startDateFormat, { register: true })}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </Stack>
                </LocalizationProvider>
                <span>to</span>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Stack spacing={4} sx={{ width: "27%" }}>
                        <DesktopDatePicker
                            label="Time End"
                            inputFormat="DD/MM/YYYY"
                            inputVariant="outlined"
                            value={timeEnd}
                            onChange={(e) => setTimeEnd(e)}
                            onClick={setValue("timeEnd", endDateFormat)}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </Stack>
                </LocalizationProvider>

            </div>

            <div className='row-general-node'>
                <p >Note</p>
                <FormGroup sx={{ width: "80%" }} noValidate autoComplete="off">
                    <Form.Control
                        defaultValue={getProject.note === "" ? "" : getProject.note}
                        as="textarea"
                        rows={2.5}
                        {...register("note")}
                    />
                </FormGroup>
            </div>

            <div className='row-general' style={{ alignItems: 'center' }}>
                <p style={{ marginBottom: 0 }} >All User</p>
                <FormGroup sx={{ width: "80%" }} noValidate autoComplete="off">
                    <FormControlLabel
                        control={<Checkbox
                            name='isAllUserBelongTo'
                            defaultChecked={getProject.isAllUserBelongTo}
                            {...register("isAllUserBelongTo")}
                        />}
                        label="Auto add user as a member of this project when creating new user" />
                </FormGroup>
            </div>

            <div className='row-general' >
                <p style={{ marginBottom: 0 }} >Project Type*</p>
                <div style={{ display: "inline", gap: 20, width: "80%" }}>
                    <div className='A'>
                        <button
                            style={{
                                marginRight: "20px",
                                width: "100%",
                                height: "42px",
                                color: activate == 0 ? "#fff" : "black",
                                fontWeight: 600,
                                fontSize: 15,
                                borderRadius: "8px",
                                textTransform: "none",
                                border: "1px solid #c1c1c1",
                                backgroundColor: activate == 0 ? "#f36c00" : "#ffffff",
                            }}
                            type='button'
                            onClick={() => (setActivate(0),
                                setValue("projectType", 0)
                                )
                            }>
                            T&M
                        </button>

                        <button
                            style={{
                                marginRight: "20px",
                                width: "100%",
                                height: "42px",
                                color: activate == "1" ? "#fff" : "black",
                                fontWeight: 600,
                                fontSize: 15,
                                borderRadius: "8px",
                                textTransform: "none",
                                border: "1px solid #c1c1c1",
                                backgroundColor: activate == "1" ? "#f36c00" : "#ffffff",
                            }}
                            type='button'

                            onClick={() => (setActivate(1),
                                setValue("projectType", 1)
                               
                            )}
                        >
                            Fixed Frice
                        </button>
                        <button
                            style={{
                                marginRight: "20px",
                                width: "100%",
                                height: "42px",
                                color: activate == 2 ? "#fff" : "black",
                                fontWeight: 600,
                                fontSize: 15,
                                borderRadius: "8px",
                                textTransform: "none",
                                border: "1px solid #c1c1c1",
                                backgroundColor: activate == 2 ? "#f36c00" : "#ffffff",
                            }}
                            type='button'
                            onClick={() => (setActivate(2),
                                setValue("projectType", 2)
                            )}
                        >
                            Non-Bill
                        </button>
                        <button
                            style={{
                                marginRight: "20px",
                                width: "100%",
                                height: "42px",
                                color: activate == 3 ? "#fff" : "black",
                                fontWeight: 600,
                                fontSize: 15,
                                borderRadius: "8px",
                                textTransform: "none",
                                border: "1px solid #c1c1c1",
                                backgroundColor: activate == 3 ? "#f36c00" : "#ffffff",
                            }}
                            type='button'
                            onClick={() => (setActivate(3),
                                setValue("projectType", 3)
                            )}
                        >
                            ODC
                        </button>

                    </div>

                    <div className='B'>
                        <button
                            style={{
                                marginRight: "20px",
                                width: "100%",
                                height: "42px",
                                color: activate == 4 ? "#fff" : "black",
                                fontWeight: 600,
                                fontSize: 15,
                                borderRadius: "8px",
                                textTransform: "none",
                                border: "1px solid #c1c1c1",
                                backgroundColor: activate == 4 ? "#f36c00" : "#ffffff",
                            }}
                            type='button'
                            onClick={() => (setActivate(4),
                                setValue("projectType", 4)
                            )}
                        >
                            Product
                        </button>
                        <button
                            style={{
                                marginRight: "20px",
                                width: "100%",
                                height: "42px",
                                color: activate == 5 ? "#fff" : "black",
                                fontWeight: 600,
                                fontSize: 15,
                                borderRadius: "8px",
                                textTransform: "none",
                                border: "1px solid #c1c1c1",
                                backgroundColor: activate == 5 ? "#f36c00" : "#ffffff",
                            }}
                            type='button'
                            onClick={() => (setActivate(5),
                                setValue("projectType", 5)
                            )}
                        >
                            Training
                        </button>
                        <button
                            style={{
                                marginRight: "20px",
                                width: "100%",
                                height: "42px",
                                color: activate == 6 ? "#fff" : "black",
                                fontWeight: 600,
                                fontSize: 15,
                                borderRadius: "8px",
                                textTransform: "none",
                                border: "1px solid #c1c1c1",
                                backgroundColor: activate == 6 ? "#f36c00" : "#ffffff",
                            }}
                            type='button'
                            onClick={() => (setActivate(6),
                                setValue("projectType", 6)
                            )}
                        >
                            NoSalary
                        </button>
                    </div>
                </div>



            </div>


        </div>
    )
}

export default General
