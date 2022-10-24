import React, { } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const PublicRoute = () => {
    const accessToken = localStorage.getItem('userToken');

    return !accessToken ? <Outlet /> : <Navigate to="/app" />;
}
export default PublicRoute