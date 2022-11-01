import React, { useEffect, useState } from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import '../Project/project.css'
// import NewProject from './NewProject/NewProject';
import SelectProjects from './SelectProjects/SelectProjects';
import SearchProject from './SearchProject/SearchProject';
import ListProject from './ListProjects/ListProject';
import { getProjects } from "../../redux/action/Project";
import { useDispatch, useSelector } from 'react-redux';
import { getAllProjectSelector } from '../../redux/reducer/reducerProject';
import Loading from "../../Notify/Loading";
import useDebounced from '../../hooks/useDebounced';
import { AppDispatch, RootState } from '../../redux/store';


const Project = () => {
    const [status, setStatus] = useState<number>();
    const [search, setSearch] = useState<any>("");
    const [sidebar, setSidebar] = useState(false);
    const dispatch = useDispatch<AppDispatch>();
    const getAllProject = useSelector(getAllProjectSelector)
    const getProgaress = useSelector((state: RootState) => state.project.progaress);
    const showSidebar = () => {
        setSidebar(!sidebar)
    }
    const debouncedSearch = useDebounced(search, 500);
    // console.log(debouncedSearch)

    useEffect(() => {
        dispatch(getProjects({ status: status, search: debouncedSearch }));
        // dispatch(getCustome());
    }, [status]);

    useEffect(() => {
        if (debouncedSearch) {
            dispatch(getProjects({ status: status, search: debouncedSearch }));
        } else {
            setSearch([]);
        }
    }, [debouncedSearch]);

    useEffect(() => {
        if (getProgaress === "ok") {
            dispatch(getProjects({ status: status, search: debouncedSearch }));
        }
    }, [getProgaress]);

    return (
        <div className='HomeProject'>

            <div className='Project'>
                <div className='Project-Title'>
                    <h4>Manage Projects</h4  >
                    <MoreVertIcon className='icon' />
                </div>

                <div className='Project-Top'>
                    {/* <NewProject status={status} debouncedSearch={debouncedSearch} /> */}
                    <SelectProjects
                        setStatus={setStatus}
                    // getAllProject={getAllProject}
                    // status={status}

                    />
                    <SearchProject setSearch={setSearch} />
                </div>

                <div >
                    {
                        getAllProject.length == 0 ? <Loading /> : <ListProject />
                    }

                </div>

            </div>
        </div>

    )
}

export default Project
