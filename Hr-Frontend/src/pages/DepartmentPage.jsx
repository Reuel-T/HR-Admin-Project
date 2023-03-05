import { Box, Button, LinearProgress, Paper, Typography } from '@mui/material';
import { Container } from '@mui/system';
import { DataGrid } from '@mui/x-data-grid';
import React from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { Link, useParams } from 'react-router-dom'
import apiClient from '../api/http';

function DepartmentPage() {

  //get id from route
  const { id } = useParams();

  const queryClient = useQueryClient();

  //query for department employee info
  const departmentEmployeeQuery = useQuery({
    queryKey: ['get-department-employees', id],
    queryFn: getDepartmentEmployees,
    onSuccess: (response) => {
      console.log(response.data)
    }
  })

  //query for department info
  const departmentQuery = useQuery({
    queryKey: ['get-department', id],
    queryFn: getDepartment,
    onSuccess: (response) => {
      console.log(response.data);
    }
  })

  //get the single department
  async function getDepartment() {
    return await apiClient.get(`api/Department/${id}`);
  }

  //function to get the employees in a single department
  async function getDepartmentEmployees() {
    return await apiClient.get(`/api/DepartmentEmployee?deptID=${id}`);
  }

  const tableColumns = [
    {field: 'id', headerName: 'ID', width: 70},
    {field: 'firstName', headerName: 'First Name', width: 130},
    { field: 'lastName', headerName: 'Last Name', width: 130 },
    { field: 'isEmployeeActive', headerName: 'Status', width: 70, type: 'boolean' },
    { field: 'isEmployeeManager', headerName: 'Manager', width: 100, type: 'boolean' },
    {
      field: 'action',
      headerName: 'Actions',
      sortable: false,
      width: 210,
      renderCell: (params) => {
        
        async function updateManager() {
          return await apiClient.put(`/api/DepartmentEmployee?eID=${params.row.id}&dID=${id}`);  
        }
        
        const updateEmployeeManagerQuery = useMutation({
          mutationKey: ['setManager', params.row.id],
          mutationFn: updateManager,
          onMutate: () => {console.log('mutate called')},
          onSuccess: (response) => {
            console.log(response.data)
            queryClient.invalidateQueries(['get-department-employees', id]);
          },
          onError: (response) => {
            console.log(response.data);
          }
        })

        function handleToggleClick() {
          updateEmployeeManagerQuery.mutate();
          
        }
        
        return (<>
          <Link to={`/employee/${params.row.id}`}><Button>View</Button></Link>
          <Button onClick={handleToggleClick}>Toggle Manager</Button>
        </>)
      }
    }
  ]

  function getRows() {
    function convertRows(r) {
      return {
        id: r.employeeId,
        firstName: r.firstName,
        lastName: r.lastName,
        isEmployeeActive: r.isEmployeeActive,
        isEmployeeManager: r.isEmployeeManager
      }
    }

    return departmentEmployeeQuery.data.data.map(convertRows);
  }

  return (
    <>
      <Container sx={{ width: '90%', marginTop: 8 }}>
        {
          departmentQuery.isLoading &&
          <LinearProgress />
        }
        {
          departmentQuery.isSuccess &&
          <Paper elevation={3} sx={{p: 4}}>
            <Typography variant="h3">{departmentQuery.data.data.departmentName}</Typography>
            {
              departmentQuery.data.data.departmentStatus
              ? <Typography variant="h6">Active</Typography>
              : <Typography variant="h6">Inactive</Typography> 
            }
          </Paper>
        }
        {
          departmentEmployeeQuery.isLoading &&
          <LinearProgress/>
        }
        {
          (departmentEmployeeQuery.isSuccess && departmentEmployeeQuery.data.data.length > 0) &&
          <Box sx={{height: '40vh', width: '100%', marginTop: 2}}>
              <DataGrid
                columns={tableColumns}
                rows={getRows()}
              />
          </Box>
        }
        {
          (departmentEmployeeQuery.isSuccess && departmentEmployeeQuery.data.data.length < 1) &&
          <Typography variant='h5'>No Employees in this department</Typography>
        }
      </Container>
    </>
  )
}

export default DepartmentPage