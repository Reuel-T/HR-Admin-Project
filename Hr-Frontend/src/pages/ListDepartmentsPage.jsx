import { Button, LinearProgress, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useContext, useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { Link, useNavigate } from 'react-router-dom';
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
    { field: 'status', headerName: 'Status', width: 70, type: 'boolean' },
    {
      field: 'action',
      headerName: 'Actions',
      sortable: false,
      width: 210,
      renderCell: (params) => {
          const thisRow = {};
          const api = params.api; 
          api
              .getAllColumns()
              .filter((c) => c.field !== "__check__" && !!c)
              .forEach(
              (c) => (thisRow[c.field] = params.getValue(params.id, c.field))
              );
              //return alert(JSON.stringify(thisRow, null, 4));
          const onClick = (e) => {
              e.stopPropagation(); // don't select this row after clicking
          };
          return (<>
              <Link to={`/department/${thisRow.id}`}><Button>View</Button></Link>
              <Link to={`/department/edit/${thisRow.id}`}><Button>Edit</Button></Link>
          </>)
      }
  }
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
      <Box sx={{ marginTop: 4 }}>
          <Link to='/add-department'>
              <Button variant='contained'>Add Department</Button>
          </Link>
      </Box>
    </>
  )
}

export default ListDepartmentsPage