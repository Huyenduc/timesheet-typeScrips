import React from 'react'
import Header from '../header/Header'
import MainContainer from '../MainConten/MainContainer'
import SideBar from '../Sidebar/Sidebar';

const MainApp = () => {
  const [open, setOpen] = React.useState(false);
  const handleShowSidebar = () => {
    setOpen(!open)
  }
  return (
    <div style={{background: '#e9e9e9'}}>
      <div>

      <Header handleShowSidebar={handleShowSidebar} />
      <SideBar
        open={open}
      />
      </div>

      <div className='Container-conten' >

        <MainContainer />
      </div>
    </div>
  )
}

export default MainApp
