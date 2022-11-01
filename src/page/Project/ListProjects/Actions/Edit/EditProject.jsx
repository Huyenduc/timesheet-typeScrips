import React, { useEffect, useState } from 'react'
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import General from '../Edit/Tab/General';
import Team from './Tab/Team/Team';
import Tasks from '../Edit/Tab/Task';
import { Button} from '@mui/material';
import { useForm, FormProvider, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { createProject} from '../../../../../redux/action/Projects'
import { useSnackbar } from 'notistack';
import { getProject2, resetSelectedMembers } from '../../../../../redux/reducer/projectReducer';

// import {ListItemButton} from '@mui/material'; 


const EditProject = ({ openModal, setOpen }) => {
    const [tab, setTap] = useState("1");
    const dispatch = useDispatch();
    
    const { enqueueSnackbar } = useSnackbar();
    const projectGet = useSelector(getProject2);

    //Member
    const getUser = useSelector((state) => state.project.users);
    let selectMember = useSelector((state) => state.project.selectedMembers);
    let listMember = useSelector((state) => state.project.listMembers);
    // console.log("1",selectMember)
    const ArrayUser = projectGet.users;
    const IdUser = ArrayUser.map((item) => item.userId)
    selectMember = getUser.filter((e) => IdUser.includes(e.id));

    const IdMember = selectMember.map((item) => item.id);
    listMember = getUser.filter((e) => !IdMember.includes(e.id))

    // console.log(listMember)
    //Tasks 
    const ArrayTask = projectGet.tasks; //Lấy ra Array chứa Tasks trong Array Project
    const IdTasks = ArrayTask.map((item) => item.taskId) // Lấy idTask
    // const billables = ArrayTask.map((item) => item.billable);

    const getTask = useSelector((state) => state.project.tasks); // Lấy Array tasks trong reducer
    let selectedTask = useSelector((state) => state.project.selectedTasks); // Lấy Array selectedTask trong reducer
    selectedTask = getTask.filter((item) => IdTasks.includes(item.id));
    //   console.log("Members", projectGet.tasks);
    // console.log("2", selectedTask)
    // console.log("1", projectGet.tasks)
    let listTasks = useSelector((state) => state.project.listTasks);
    listTasks = getTask.filter((item) => !IdTasks.includes(item.id))

    // console.log(selectMember)

    // const defaultValues = {
    //     name: projectGet.name,
    //     code: projectGet?.code,
    //     status: projectGet?.status,
    //     timeStart: projectGet?.timeStart,
    //     timeEnd: projectGet?.timeEnd,
    //     note: projectGet?.note,
    //     projectType: projectGet?.projectType,
    //     customerId: projectGet?.customerId,
    //     // tasks: selectedTasks,
    //     // users: selectedMembers,
    //     projectTargetUsers: projectGet?.projectTargetUsers,
    //     isAllUserBelongTo: projectGet?.isAllUserBelongTo,

    // };

    const methods = useForm();

    const { register, handleSubmit, reset, formState: { errors }, getValues, setValue, control } = methods;

    const getProgaress = useSelector((state) => state.project.progaress);
    const error = useSelector((state) => state.project.message);

    useEffect(() => {
        if (openModal && getProgaress == "ok") {
            enqueueSnackbar(`Edit Project Success !`, { variant: 'success' });
            dispatch(resetSelectedMembers());
            handleClose();
        } else if (openModal &&  getProgaress == "errors") {
            enqueueSnackbar(error, { variant: 'error' });
        }
    }, [getProgaress], [openModal], [error])
const handleChange = (event, newValue) => {
    setTap(newValue);
};


const handleClose = () => {
    setOpen(false);
    setTap("1");
    reset();
}

let tasks = [];
let members = [];



let SelectMb =selectMember.map((item) =>{
    let reselt;
    projectGet.users.forEach((member) => {
        if(item.id === member.userId){
            reselt = {...item, typeOffice:member.type}
        }
        
    })
    return reselt;
})

SelectMb.forEach((member) => {
    members.push({
        id: 0,
        userId: member.id,
        type: member.typeOffice,
    })

});


projectGet.tasks.forEach((task) => {
    tasks.push({
        taskId: task.taskId,
        billable: typeof task.billable === "undefined" ? true : task.billable,
        id: 0,
    })
})

const onHandSubmit = (data) => {
    console.log(data.projectType)
    const newProject = {
        id: projectGet.id,
        name: data.name,
        code: data.code,
        timeStart: data.timeStart,
        timeEnd: data?.timeEnd,
        note: data.note,
        projectType: data.projectType || 1,
        projectTargetUsers: [],
        customerId: data.customerId,
        status: projectGet.status,
        isAllUserBelongTo: data.isAllUserBelongTo,
        tasks: tasks,
        users: members
    }
    console.log(newProject)
    dispatch(createProject(newProject));
    
}
return (
    <>
        <div >
            <Dialog
                open={openModal}
                maxWidth="lg"
                fullWidth={true}
                onClose={handleClose}
                aria-labelledby="contained-modal-title-vcenter"
            >
                <form
                    onSubmit={handleSubmit(onHandSubmit)}
                >
                    <DialogTitle
                        onClose={handleClose}
                    >
                        <div><h2>Edit Project: {!projectGet ? null : projectGet.name}</h2></div>
                    </DialogTitle>
                    <DialogContent>
                        <FormProvider {...methods} >

                            <Box sx={{ width: '100%', typography: 'body1' }}>
                                <TabContext value={tab}>
                                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                        <TabList onChange={handleChange} aria-label="lab API tabs example">
                                            <Tab label="General" value="1" />
                                            <Tab label="Team" value="2" />
                                            <Tab label="Tasks" value="3" />
                                        </TabList>
                                    </Box>
                                    <TabPanel value="1">
                                        <General
                                            getProject={projectGet}
                                            register={register}
                                            setValue={setValue}
                                            control={control}
                                            getValues={getValues}
                                        />
                                    </TabPanel>
                                    <TabPanel value="2">

                                        <Team selectMember={SelectMb} listMember={listMember} members={members} />
                                    </TabPanel>
                                    <TabPanel value="3">
                                        <Tasks selectedTask={selectedTask} listTasks={listTasks} />
                                    </TabPanel>
                                </TabContext>
                            </Box>
                        </FormProvider>
                    </DialogContent>
                    <DialogActions>
                        <Button style={{
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
                            boxShadow: '0 2px 5px rgb(0 0 0 / 16%), 0 2px 10px rgb(0 0 0 / 12%)',
                        }}
                            onClick={() => { handleClose() }}
                        >
                            cancel
                        </Button>
                        <Button style={{
                            height: "40px",
                            fontSize: "13",
                            background: "#fb483a",
                            color: "#FFF",
                            textTransform: "none",
                            padding: 16,
                            minWidth: 64,
                            textAlign: "center",
                            alignItems: "center"
                        }}
                            type='submit'

                        >
                            save
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>

        </div>

    </>
)
}

export default EditProject