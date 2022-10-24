import React from 'react'
import { Link } from 'react-router-dom'
// import Logo from '../../assets/image/logo.png'
// import '../Navbar/Navbar.css'
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import { removeToken } from '../../constants/appConstants';
// import styled from "styled-components";
const Navbar : React.FC = ({ showSidebar }:any) => {

  const hanldeLogout = () => {
    removeToken();
  }

  return (
    <div className='Navbar'>
      <div className='wrapper'>
        <Link to='#' className='Menu-Bar'>
          <MenuIcon className='icon'
        //    onClick={showSidebar} 
           />
        </Link>
        < div className='Logo_navbar'>
          <img src="http://timesheet.nccsoft.vn/assets/images/nccsoft_vietnam_logo.png" alt="aa" />
        </div>
        <h1>TimeSheet</h1>
      </div>
      <Link to="/Login" onClick={hanldeLogout}>
        <LogoutIcon className='icon' />
      </Link>
    </div>
  )
}

export default Navbar