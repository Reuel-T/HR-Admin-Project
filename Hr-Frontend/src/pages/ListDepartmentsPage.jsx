import { Button, LinearProgress, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useContext, useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { Link, useNavigate } from 'react-router-dom';
import apiClient from '../api/http';
import UserContext from '../context/UserContext';
import { DataGrid } from '@mui/x-data-grid';

function ListDepartmentsPage() {

  //gets the user from the context 
  const { user } = useContext(UserContext)
  
  //state object to hold the departments from the API
  const [departments, updateDepartments] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    //check if the user is not logged in, redirect to login
    if (user === null || user === undefined) {
        navigate('/login');
    }
    //if not a super user, redirect to the main page
    if (user.role !== 0 || user.role === undefined) {
        navigate('/');
    }
  })

  //React Query Object to get departments
  const getDepartmentsQuery = useQuery({
    queryKey: ['get-departments'],
    queryFn: getDepartments,
    onSuccess: (response) => {
      //converts the data from the api response to be used as data grid rows
      function convertDepartments(d) {
        return {
          id: d.departmentID,
          departmentName: d.departmentName,
          status: d.departmentStatus
        }
      }
      let departmentResponse = response.data.map(convertDepartments);
      updateDepartments(departmentResponse);
    }
  })

  async function getDepartments() {
    return await apiClient.get('api/department')
  }

  //column definitions for the department
  const tableColumns = [
    {field: 'id', headerName: 'ID', width: 70},
    {field: 'departmentName', headerName: 'Department', width: 260},
    { field: 'status', headerName: 'Status', width: 70, type: 'boolean' },
    {
      field: 'action',
      headerName: 'Actions',
      sortable: false,
      width: 210,
      renderCell: (params) => {
          return (<>
              <Link to={`/department/${params.row.id}`}><Button>View</Button></Link>
              {(user.role === 0 && user.role !== undefined) && <Link to={`/department/edit/${params.row.id}`}><Button>Edit</Button></Link>}
          </>)
      }
  }
  ]

  return (
    <>
      <Typography variant='h3' sx={{marginTop: 8}}>Departments</Typography>
      {
        getDepartmentsQuery.isLoading &&
        <LinearProgress sx={{width: '100%', marginTop: 4}}/>
      }
      <Box sx={{height: '50vh', width: '100%', marginTop: 4}}>
      {departments.length > 0 &&
          <DataGrid
          sx={{marginTop : 4}}
          columns={tableColumns}
          rows={departments}
          />
      }
      </Box>
      { (user.role === 0 && user !== undefined) &&
        <Box sx={{ marginTop: 4 }}>
          <Link to='/add-department'>
              <Button variant='contained'>Add Department</Button>
          </Link>
        </Box>
      }
    </>
  )
}

export default ListDepartmentsPage