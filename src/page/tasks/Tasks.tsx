import React, { useState } from 'react'
import axios from '../../api/axios'
import { useEffect } from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import "../tasks/Tasks.css"
import NewTasks from './NewTask/NewTasks';
import SearchTask from './SearchTask/SearchTask';
import CommonTasks from './CommonTasks/CommonTasks';
import OtherTask from './OtherTask/OtherTask';
import { useDispatch, useSelector } from "react-redux";
import { getTask } from "./../../redux/action/Task";
import { setSearchName, resetProgress,  getAllTaskSelector  } from "../../redux/reducer/reducerTask";
import { useSnackbar } from 'notistack';
import Loading from "../../Notify/Loading"
import { AppDispatch } from '../../redux/store';
// import {} from "../../redux/reducer/tasksReducer"

const Tasks = () => {
    const [searchItem, setSearchItem] = useState("");
    const dispatch = useDispatch <AppDispatch>();

    useEffect(() => {
        dispatch(getTask());
    }, []);
    const { enqueueSnackbar } = useSnackbar();
    const getAll = useSelector(getAllTaskSelector);
    // const progress = useSelector((state ) => state.task.progress);
    // const error = useSelector((state) => state.task.error);
    // const idError = useSelector((state) => state.task.idError);

    // useEffect(() => {
    //     if (progress == "done") {
    //         if (idError == "CreateTask") {
    //             enqueueSnackbar(`${idError} Success !`, { variant: 'success' });
    //         } else if (idError == "DeArchiveTask") {
    //             enqueueSnackbar(`${idError} Success !`, { variant: 'success' });
    //         } else if (idError == "DeleteTask") {
    //             enqueueSnackbar(`${idError} Success !`, { variant: 'success' });
    //         } else {
    //             enqueueSnackbar(`${idError} Success !`, { variant: 'success' });
    //         }
    //         dispatch(resetProgress());
    //     } else if (progress == 'error' || idError == 'DeleteTask' && idError == "archive") {
    //         enqueueSnackbar(`This taskId ${error} is in a project ,You can't delete task !`, { variant: 'error' })
    //         dispatch(resetProgress());
    //     }

    // }, [progress])

    useEffect(() => {
        dispatch(
            setSearchName({
                searchName: searchItem,
            })
        );
    }, [searchItem]);

    return (
        <div className='Tasks'>
            <div className='Tasks-Title'>
                <h4>Manage Tasks</h4    >
                <MoreVertIcon className='icon' />
            </div>

            <div className='News'>
                <div style={{ marginRight: 100 }}>
                    <NewTasks />
                </div>
                <div className='Seach'>
                    <SearchTask
                        setSearchItem={setSearchItem}
                    />
                </div>
            </div>
            {
                getAll.length == 0 ? <Loading /> :
                    <div>
                        <div>
                            <CommonTasks />
                        </div>
                        <div>
                            <OtherTask />
                        </div>
                    </div>
            }


        </div>
    )
}

export default Tasks