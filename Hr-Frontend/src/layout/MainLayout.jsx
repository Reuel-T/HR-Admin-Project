import { Container, CssBaseline } from '@mui/material'
import React, { useState } from 'react'
import { Outlet, Route, Routes } from 'react-router-dom'
import Navbar from '../components/Navbar'
import {UserProvider} from '../context/UserContext'
import AddEmployeePage from '../pages/AddEmployeePage'
import ListDepartmentsPage from '../pages/ListDepartmentsPage'
import ListEmployeesPage from '../pages/ListEmployeesPage'
import Login from '../pages/Login'
import UserInfoPage from '../pages/UserInfoPage'

function MainLayout() {

  return (
    <>
      <UserProvider>
        <CssBaseline/>
        <Navbar />
        <Container sx={{width : '90%'}}>
          <Routes>
            <Route
              path='/'
              element={<UserInfoPage/>}
            />
            <Route
              path='/login'
              element={<Login/>}
            />
            <Route
              path='/user-info'
              element={<UserInfoPage/>}
            />
            <Route
              path='/employees'
              element={<ListEmployeesPage/>}
            />
            <Route
              path='/departments'
              element={<ListDepartmentsPage/>}
            />
            <Route
              path='/add-employee'
              element={<AddEmployeePage/>}
            />
          </Routes>
        </Container>
      </UserProvider>
    </>
  )
}

export default MainLayout