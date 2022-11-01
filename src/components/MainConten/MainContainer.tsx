import React from 'react'
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate
} from "react-router-dom";
import Login from '../../page/Login/Login';
import Tasks from '../../page/tasks/Tasks';
import Project from '../../page/Project/Project';

const MainContainer = () => {
    return (
        <div>
            <Routes>
                {/* <Route path="home" element={<Login />} /> */}
                <Route path="app/task" element={<Tasks />} />
                <Route path="app/project" element={<Project />} />
            </Routes>
        </div>
    )
}

export default MainContainer
