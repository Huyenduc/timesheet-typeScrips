import React from 'react'
import Navbar from '../header/Header'
import MainContainer from '../MainConten/MainContainer'
import SideBar from '../SideBar/SideBar'

const MainApp = () => {
  return (
    <div>
     
      <Navbar/>
      <div>
        <SideBar/>
        <MainContainer/>
      </div>
    </div>
  )
}

export default MainApp
