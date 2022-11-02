import React, { useEffect, useState } from 'react'
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import CloseIcon from '@mui/icons-material/Close';
import dayjs from 'dayjs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import General from './General/General';
import Team from './Team/Team';
import Tasks from './Task/Tasks';
import { Button } from '@mui/material';
import { useForm, FormProvider } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { createProject, getUser, getProjects } from '../../../redux/action/Project';
import { getTask } from '../../../redux/action/Task'
import { resetSelectedMembers } from '../../../redux/reducer/reducerProject';
import { useSnackbar } from 'notistack';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { AppDispatch, RootState } from '../../../redux/store';
import { ICreateProject } from '../../../interfaces/projectType';




const NewProject = () => {
  const [open, setOpen] = useState(false);
  const [tab, setTap] = useState<string>("1");
  const [check, setCheck] = useState(true);
  const [activate, setActivate] = useState("Fixed Frice");
  const dispatch = useDispatch<AppDispatch>();
  const methods = useForm();
  const { enqueueSnackbar } = useSnackbar();

  let schema = yup.object().shape({
    customerId: yup.string().required(),
    name: yup.string().required(),
    code: yup.string().required(),

  });


  const { register, handleSubmit, reset, formState: { errors, isDirty, isValid }, setValue, control, trigger } = useForm<ICreateProject>({
    defaultValues: {
      timeStart: null,
      timeEnd: null,
      customerId: "",
      isAllUserBelongTo: false,

    },
    resolver: yupResolver(schema)
  });

  const getSelectMember = useSelector((state:RootState) => state.project.selectedMembers);

  const getSelectTask = useSelector((state: RootState) => state.project.selectedTasks);

  const getProgaress = useSelector((state: RootState) => state.project.progaress);
  const error = useSelector((state: RootState) => state.project.message);

  // console.log(getSelectTask)
  const handleOpen = () => {
    setOpen(true);
    dispatch(getUser());
    dispatch(getTask())
  };

  const handleClose = () => {
    setOpen(false);
    reset();
    dispatch(resetSelectedMembers());
    setTap("1");
    setActivate("Fixed Frice");
  }


  useEffect(() => {
    if (getProgaress === 'ok' && open) {
      enqueueSnackbar(`Create Project Success !`, { variant: 'success' });
      handleClose();
    } else if (getProgaress === "errors" && open) {
      enqueueSnackbar(error, { variant: 'error' });
    }

  }, [getProgaress])



  let tasks: Array<[]> = [];
  let members: Array<[]> = [];


  // getSelectMember.forEach((member) => {
  //   members.push({
  //     id: 0,
  //     userId: member.id,
  //     type: typeof member.projectType === "undefined" ? 1 : member.projectType,
  //   })

  // });
  // console.log("Members", getSelectMember);

  // getSelectTask.forEach((task) => {
  //   tasks.push({
  //     taskId: task.id,
  //     billable: typeof task.billable === "undefined" ? true : task.billable,
  //     id: 0,
  //   })
  // });

  const onHandSubmit = (data: ICreateProject) => {
    const startDateFormat = dayjs(data.timeStart).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]')
    const endDateFormat = dayjs(data.timeEnd).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]')

    const newProject = {
      name: data.name,
      code: data.code,
      timeStart: startDateFormat,
      timeEnd: endDateFormat === "Invalid Date" ? null : endDateFormat,
      note: data.note,
      projectType: typeof data.projectType === "undefined" ? 1 : data.projectType,
      projectTargetUsers: [],
      customerId: data.customerId,
      isAllUserBelongTo: data.isAllUserBelongTo,
      tasks: tasks,
      users: members
    }
    console.log(newProject)
    // dispatch(createProject(newProject));


  }
  const handleChange = (event: any, newValue: string) => {
    setTap(newValue);
  };

  return (
    <div >
      <button className='Button-Project'
        onClick={handleOpen}
      >
        + New Project
      </button>

      <Dialog
        open={open}
        maxWidth="lg"
        fullWidth={true}
        aria-labelledby="contained-modal-title-vcenter"

      >
        <form onSubmit={handleSubmit(onHandSubmit)}>
          <DialogTitle
          // onClose={handleClose}
          >
            <div><h2>Create Project</h2></div>
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
                      register={register}
                      control={control}
                      setValue={setValue}
                      activate={activate}
                      setActivate={setActivate}
                      errors={errors}
                      trigger={trigger}
                    />
                  </TabPanel>
                  <TabPanel value="2">
                    <Team />
                  </TabPanel>
                  <TabPanel value="3">
                    <Tasks />
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
              color: !isDirty && !isValid ? "rgba(0,0,0,.26)" : "#FFF",
              textTransform: "none",
              padding: 16,
              minWidth: 64,
              textAlign: "center",
              alignItems: "center"
            }}
              type='submit'
              disabled={!isDirty && !isValid}
            // onClick={()=>handleSubmit(onHandSubmit)}
            >
              save
            </Button>
          </DialogActions>
        </form>
      </Dialog>

    </div>
  )
}

export default NewProject
