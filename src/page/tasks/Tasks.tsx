import React, { useState } from 'react'
import { useEffect } from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import "../tasks/Tasks.css"
import NewTasks from './NewTask/NewTasks';
import SearchTask from './SearchTask/SearchTask';
import CommonTasks from './CommonTasks/CommonTasks';
import OtherTask from './OtherTask/OtherTask';
import { useDispatch, useSelector } from "react-redux";
import { getTask } from "./../../redux/action/Task";
import { setSearchName, resetProgress, getAllTaskSelector } from "../../redux/reducer/reducerTask";
import { useSnackbar } from 'notistack';
import Loading from "../../Notify/Loading";
import { AppDispatch, RootState } from '../../redux/store';

const Tasks = () => {
    const [searchItem, setSearchItem] = useState("");
    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        dispatch(getTask());
    }, []);
    const { enqueueSnackbar } = useSnackbar();
    const getAll = useSelector(getAllTaskSelector);
    const progress = useSelector((state: RootState) => state.task.progress);
    const error = useSelector((state: RootState) => state.task.error);

    useEffect(() => {
        if (progress == "Ardone") {
            enqueueSnackbar(`Archive Task Success !!`, { variant: 'success' });
            dispatch(resetProgress());
        }  else if (progress == "Dedone"){
            enqueueSnackbar(`Unarchive Task Success !!`, { variant: 'success' });
            dispatch(resetProgress());
        }
        else if (progress == "Deletedone"){
            enqueueSnackbar(`Delete Task Success !!`, { variant: 'success' });
            dispatch(resetProgress());
        }
        
        else if (progress === "error") {
            enqueueSnackbar(error, { variant: 'error' })
            dispatch(resetProgress());
        }

    }, [progress])

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