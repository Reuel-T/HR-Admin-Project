import { Container, CssBaseline } from '@mui/material'
import React, { useState } from 'react'
import { Outlet, Route, Routes } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { TokenUserProvider } from '../context/TokenUserContext'
import {UserProvider} from '../context/UserContext'
import AddDepartmentPage from '../pages/AddDepartmentPage'
import AddEmployeePage from '../pages/AddEmployeePage'
import DepartmentPage from '../pages/DepartmentPage'
import EditDepartmentPage from '../pages/EditDepartmentPage'
import EditEmployeePage from '../pages/EditEmployeePage'
import EmployeePage from '../pages/EmployeePage'
import ListDepartmentsPage from '../pages/ListDepartmentsPage'
import ListEmployeesPage from '../pages/ListEmployeesPage'
import Login from '../pages/Login'

function MainLayout() {

  return (
    <>
      <TokenUserProvider>
        <CssBaseline/>
        <Navbar />
        <Container sx={{width : '90%'}}>
          <Routes>
            <Route
              path='/'
              element={<EmployeePage/>}
            />
            <Route
              path='/login'
              element={<Login/>}
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
              path='/department/:id'
              element={<DepartmentPage/>}
            />
            <Route
              path='/department/edit/:id'
              element={<EditDepartmentPage/>}
            />
            <Route
              path='/add-employee'
              element={<AddEmployeePage/>}
            />
            <Route
              path='/add-department'
              element={<AddDepartmentPage/>}
            />
            <Route
              path='/employee/:id'
              element={<EmployeePage />} />
            <Route
              path='/employee/edit/:id'
              element={<EditEmployeePage />} />
          </Routes>
        </Container>
      </TokenUserProvider>
    </>
  )
}

export default MainLayout