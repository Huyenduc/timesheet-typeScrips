import React from 'react'
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate
} from "react-router-dom";
import Login from '../../page/Login/Login';
import Tasks from '../../page/Login/Tasks/Tasks';

const MainContainer = () => {
    return (
        <div>
            <Routes>
                {/* <Route path="home" element={<Login />} /> */}
                <Route path="task" element={<Tasks />} />
                {/* <Route path="project" element={<Project />} /> */}
            </Routes>
        </div>
    )
}

export default MainContainer
