import { LinearProgress, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useContext, useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import apiClient from '../api/http';
import UserContext from '../context/UserContext';
import { DataGrid } from '@mui/x-data-grid';

function ListDepartmentsPage() {

  const {user} = useContext(UserContext)
  const [departments, updateDepartments] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    //check if the user is null, and redirect to login page
    if (user === null || undefined) {
        navigate('/login');
    }
    console.log(user)
  },[user])

  const { isLoading: isLoadingDepartments, refecth: getDepartments } = useQuery('get-departments',
    async () => {
      return await apiClient.get('api/department')
    },
    {
      onSuccess: (response) => {
        function convertDepartments(d) {
          return {
            id: d.departmentID,
            departmentName: d.departmentName,
            status: d.departmentStatus
          }
        }

        let departmentResponse = response.data.map(convertDepartments);
        updateDepartments(departmentResponse);
        console.log(departmentResponse);
      }
    }
  )

  const tableColumns = [
    {field: 'id', headerName: 'ID', width: 70},
    {field: 'departmentName', headerName: 'Department', width: 130},
    {field: 'status', headerName: 'Status', width: 70, type: 'boolean'}
  ]

  return (
    <>
      <Typography variant='h3' sx={{marginTop: 8}}>Departments</Typography>
      {
        isLoadingDepartments &&
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
    </>
  )
}

export default ListDepartmentsPage