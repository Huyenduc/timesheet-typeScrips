import React, { useEffect } from 'react'
import { TextField } from "@mui/material";
import Button from '@mui/material/Button';
import { useSnackbar } from 'notistack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useForm } from 'react-hook-form'
import { createClient } from '../../../../redux/action/Projects';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

import { useDispatch, useSelector } from "react-redux"

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '36%',
    height: '45%',
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: '5px',
    p: 4,
};

const NewClient = ({ openClient, setOpenClient }) => {

    const schema = yup.object({
        name: yup.string().required(),
        code: yup.string().required(),
    }).required();

    const { register, handleSubmit, reset, formState: { errors, isDirty, isValid } } = useForm({ resolver: yupResolver(schema) });
    const dispatch = useDispatch();
    const handleClose = () => {
        setOpenClient(false)
        reset()
    };
    const { enqueueSnackbar } = useSnackbar();

    const getProgaress = useSelector((state) => state.project.progaress);
    const error = useSelector((state) => state.project.message);

    useEffect(() => {
        if (getProgaress === "done" && openClient) {
            enqueueSnackbar(`Create Client Success !`, { variant: 'success' });
            reset();
            setOpenClient(false);
        } else if (getProgaress === "error" && openClient) {
            enqueueSnackbar(`${error} !`, { variant: 'error' });
        }

    }, [getProgaress], [error])

    const onSubmit = (data) => {
        console.log(data)
        dispatch(createClient(data));
    }

    return (

        <Modal
            open={openClient}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"


        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    <div>New Client</div>
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    <TextField
                        id="outlined"
                        label="Name*"
                        variant="standard"
                        style={{
                            width: "100%",
                            marginBottom: "10px"
                        }}
                        {...register("name", { required: true })}
                        error={errors.name ? true : false}
                    ></TextField>
                    {errors.name && (
                        <small className="text-danger">Client {errors.name.message}!</small>
                    )}
                    <TextField
                        id="outlined"
                        label="Code*"
                        error={errors.code ? true : false}
                        variant="standard"
                        style={{
                            width: "100%",
                            marginBottom: "10px"
                        }}
                        {...register("code", { required: true })}

                    ></TextField>
                    {errors.code && (
                        <small className="text-danger">Client {errors.code.message}!</small>
                    )}
                    <TextField
                        id="outlined-basic"
                        // onChange={(e) => setName(e.target.value)}
                        label="Address"
                        variant="standard"
                        style={{
                            width: "100%",
                        }}
                        {...register("address")}

                    ></TextField>
                </Typography>

                <Typography sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 3 }}>
                    <Button
                        style={{
                            height: "40px",
                            fontSize: "13",
                            background: "#ffffff",
                            color: "#000000",
                            textTransform: "none",
                            padding: 16,
                            minWidth: 64,
                            textAlign: "center",
                            alignItems: "center",
                            marginRight: "10px",
                            boxShadow: '0 2px 5px rgb(0 0 0 / 16%), 0 2px 10px rgb(0 0 0 / 12%)'
                        }}
                        onClick={handleClose}
                    >
                        Cancel
                    </Button>
                    <Button
                        id='djj'
                        style={{
                            height: "40px",
                            fontSize: "13",
                            background: "#fb483a",
                            color: !isDirty && !isValid ? "rgba(0,0,0,.26)" : "#FFF",
                            textTransform: "none",
                            padding: 16,
                            minWidth: 64,
                            textAlign: "center",
                            alignItems: "center"
                        }}
                        onClick={handleSubmit(onSubmit)}
                        disabled ={!isDirty && !isValid}
                    >
                        Save
                    </Button>
                </Typography>


            </Box>
        </Modal>

    )
}

export default NewClient