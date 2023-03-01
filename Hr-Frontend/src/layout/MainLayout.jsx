import { Container, CssBaseline } from '@mui/material'
import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import UserContext from '../context/UserContext'



function MainLayout() {

  const [user, setUser] = useState(null)

  return (
    <>
      <UserContext.Provider value={{ user, setUser }}>
        <CssBaseline/>
        <Navbar />
        <Container sx={{width : '90%'}}>
          <Outlet/>
        </Container>
      </UserContext.Provider>
    </>
  )
}

export default MainLayout