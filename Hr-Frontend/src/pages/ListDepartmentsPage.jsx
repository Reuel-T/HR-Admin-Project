import { LinearProgress } from '@mui/material';
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

  useEffect((user) => {
    if (user === null) {
      navigate('login');
    }
  })

  return (
    <>
      {
        isLoadingDepartments &&
        <LinearProgress sx={{width: '100%', marginTop: 8}}/>
      }
      <Box sx={{height: '65vh', width: '100%', marginTop: 8}}>
      {departments.length > 0 &&
          <DataGrid
          sx={{marginTop : 8}}
          columns={tableColumns}
          rows={departments}
          />
      }
      </Box>
    </>
  )
}

export default ListDepartmentsPage