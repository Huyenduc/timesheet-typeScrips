import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { TextField, MenuItem, FormGroup, Button, Checkbox, FormControlLabel, FormControl, InputLabel, Select } from "@mui/material";
import Stack from '@mui/material/Stack';
import Form from 'react-bootstrap/Form';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import dayjs from 'dayjs';
import { useState } from 'react';
import { getAllCustomeSelector } from '../../../../redux/reducer/reducerProject'
import { useDispatch, useSelector } from 'react-redux';
import { Controller, useFormContext } from 'react-hook-form';
import NewClient from './NewClient';

interface myProps {

  register: any;
  control: any;
  activate: string;
  setActivate: any;
  errors: any;
  setValue: any;
  trigger: any;
}

const General = ({ register, setValue, control, activate, setActivate, errors, trigger }: myProps) => {
  // const [custome, setcustome] = useState("");


  const [openClient, setOpenClient] = useState(false);

  // const [projectType,  ] = useState(1);

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250
      }
    }
  };


  const getAllCustomes = useSelector(getAllCustomeSelector);
  // console.log(dataGeneral)


  return (
    <div className='General' style={{ height: 440, display: 'flex', flexDirection: 'column', overflowY: 'scroll' }}>

      <div className='row-general' style={{ marginTop: 10 }} >
        <p >Client*</p>
        <div style={{ width: "55%", display: 'block' }}>
          <Controller name="customerId"
            render={({ field }) => (
              <>
                <FormControl sx={{ width: '100%' }}>
                  <InputLabel id="select-label" error={errors.customerId ? true : false} >Choose a client...</InputLabel>
                  <Select labelId="select-label" label="Choose a client..." error={errors.customerId ? true : false}  {...field}
                    MenuProps={MenuProps}
                  >
                    {
                      getAllCustomes.map((customer) => {
                        return (
                          <MenuItem value={customer.id} key={customer.id}>{customer.name}</MenuItem>
                        )
                      })
                    }
                  </Select>
                </FormControl>
              </>
            )}
            control={control}
            defaultValue=" "

          ></Controller>
          {errors.customerId && (
            <small className="text-danger">Project {errors.customerId.message}!</small>
          )}
        </div>
        <div>
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
            onClick={() => setOpenClient(true)}
          >+ New client
          </Button>
          <NewClient openClient={openClient} setOpenClient={setOpenClient} />
        </div>


      </div>


      <div className='row-general' >
        <p >Project Name*</p>
        <FormGroup sx={{ width: "55%" }}>
          <TextField
            id="outlined-select-gender"
            label={"Name"}

            {...register("name", { required: true })}
            variant="outlined"
            error={errors.name ? true : false}
            onKeyUp={() => {
              trigger("Name");
            }}
          >
          </TextField>
          {errors.name && (
            <small className="text-danger">Project {errors.name.message}!</small>
          )}
        </FormGroup>
      </div>
      <div className='row-general' >
        <p >Project Code*</p>
        <FormGroup sx={{ width: "20%" }} >
          <TextField
            id="outlined"
            label={"code"}
            {...register("code", { required: true })}
            variant="outlined"
            onKeyUp={() => {
              trigger("code");
            }}
            error={errors.code ? true : false}
          >
          </TextField>
          {errors.code && (
            <small className="text-danger">Project {errors.code.message}!</small>
          )}
        </FormGroup>
      </div>

      <div className='row-general'>
        <p >Dates*</p>
        <Controller
          control={control}
          name="timeStart"
          render={({ field: { onChange, value } }) => (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Stack spacing={4} sx={{ width: "27%" }}>
                <DesktopDatePicker
                  label="Time Start"
                  inputFormat="DD/MM/YYYY"
                  // inputVariant="outlined"
                  value={value}
                  onChange={onChange}
                  renderInput={(params) => <TextField {...params} />}
                />
              </Stack>
            </LocalizationProvider>
          )}
        />

        <span>to</span>
        <Controller
          control={control}
          name="timeEnd"
          render={({ field: { onChange, value } }) => (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Stack spacing={4} sx={{ width: "27%" }}>
                <DesktopDatePicker
                  label="Time End"
                  inputFormat="DD/MM/YYYY"
                  // inputVariant="outlined"
                  value={value}
                  onChange={onChange}
                  renderInput={(params) => <TextField {...params} />}
                />
              </Stack>
            </LocalizationProvider>
          )}
        />
      </div>

      <div className='row-general-node'>
        <p >Note</p>
        <FormGroup sx={{ width: "80%" }} >
          <Form.Control
            as="textarea"
            rows={2.5}
            {...register("note")}
          />
        </FormGroup>
      </div>

      <div className='row-general' style={{ alignItems: 'center' }}>
        <p style={{ marginBottom: 0 }} >All User</p>
        <FormGroup sx={{ width: "80%" }} >
          <FormControlLabel
            control={
              <Controller
                name='isAllUserBelongTo'
                control={control}
                render={({ field: props }) => (
                  <Checkbox
                    {...props}
                    checked={props.value}
                    onChange={(e) => props.onChange(e.target.checked)}
                  />
                )}
              />
            }
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
                color: activate == "T&M" ? "#fff" : "black",
                fontWeight: 600,
                fontSize: 15,
                borderRadius: "8px",
                textTransform: "none",
                border: "1px solid #c1c1c1",
                backgroundColor: activate == "T&M" ? "#f36c00" : "#ffffff",
              }}
              type='button'
              onClick={() => (setActivate("T&M"),
                setValue("projectType", 0))
              }>
              T&M
            </button>

            <button
              style={{
                marginRight: "20px",
                width: "100%",
                height: "42px",
                color: activate == "Fixed Frice" ? "#fff" : "black",
                fontWeight: 600,
                fontSize: 15,
                borderRadius: "8px",
                textTransform: "none",
                border: "1px solid #c1c1c1",
                backgroundColor: activate == "Fixed Frice" ? "#f36c00" : "#ffffff",
              }}
              type='button'

              onClick={() => (setActivate("Fixed Frice"),
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
                color: activate == "Non-Bill" ? "#fff" : "black",
                fontWeight: 600,
                fontSize: 15,
                borderRadius: "8px",
                textTransform: "none",
                border: "1px solid #c1c1c1",
                backgroundColor: activate == "Non-Bill" ? "#f36c00" : "#ffffff",
              }}
              type='button'
              onClick={() => (setActivate("Non-Bill"),
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
                color: activate == "ODC" ? "#fff" : "black",
                fontWeight: 600,
                fontSize: 15,
                borderRadius: "8px",
                textTransform: "none",
                border: "1px solid #c1c1c1",
                backgroundColor: activate == "ODC" ? "#f36c00" : "#ffffff",
              }}
              type='button'
              onClick={() => (setActivate("ODC"),
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
                color: activate == "Product" ? "#fff" : "black",
                fontWeight: 600,
                fontSize: 15,
                borderRadius: "8px",
                textTransform: "none",
                border: "1px solid #c1c1c1",
                backgroundColor: activate == "Product" ? "#f36c00" : "#ffffff",
              }}
              type='button'
              onClick={() => (setActivate("Product"),
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
                color: activate == "Training" ? "#fff" : "black",
                fontWeight: 600,
                fontSize: 15,
                borderRadius: "8px",
                textTransform: "none",
                border: "1px solid #c1c1c1",
                backgroundColor: activate == "Training" ? "#f36c00" : "#ffffff",
              }}
              type='button'
              onClick={() => (setActivate("Training"),
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
                color: activate == "NoSalary" ? "#fff" : "black",
                fontWeight: 600,
                fontSize: 15,
                borderRadius: "8px",
                textTransform: "none",
                border: "1px solid #c1c1c1",
                backgroundColor: activate == "NoSalary" ? "#f36c00" : "#ffffff",
              }}
              type='button'
              onClick={() => (setActivate("NoSalary"),
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
