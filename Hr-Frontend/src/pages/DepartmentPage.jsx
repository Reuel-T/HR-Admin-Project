import { Box, Button, FormControl, InputLabel, LinearProgress, MenuItem, Paper, Select, Typography } from '@mui/material';
import { Container } from '@mui/system';
import { DataGrid } from '@mui/x-data-grid';
import React, { useContext, useEffect } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { Link, useNavigate, useParams } from 'react-router-dom'
import apiClient from '../api/http';
import UserContext from '../context/UserContext';

function DepartmentPage() {

  //get id from route
  const { id } = useParams();

  /**
   *  query client - used to invalidate a query and refetch
   */
  const queryClient = useQueryClient();

  /**
   * Value to be used when posting an employee
   */
  let employeeToAdd = null;

  //getting the user context
  const { user } = useContext(UserContext);

  /**
   * useNavigate hook - allows 
   */
  const navigate = useNavigate();

  //use effect code used to navigate to another page if the user should not be here
  useEffect(() => {
    //if user not logged in  
    if (user === null || user === undefined) {
      navigate('/login');
    } else {
      if (user.role !== 0) {
        console.log(user);
        //get the department info object from the user info
        let department = user.departments.find(department => {
          return department.id === Number(id);
        })
        //check if the user is in the department
        if (department !== null && department !== undefined){
          //check if the user is a manager
          if (!department.isManager) {
            navigate(`/employee/${user.employeeID}`); 
          }
        } else {
          navigate(`/employee/${user.employeeID}`); 
        }
      }
    } 
  })

  /**
   * React Query - Gets all the employees in this department
   */
  const departmentEmployeeQuery = useQuery({
    queryKey: ['get-department-employees', id],
    queryFn: getDepartmentEmployees,
    onSuccess: (response) => {
      console.log(response.data)
    }
  })

  /**
   * React Query - Gets current department info
   */
  const departmentQuery = useQuery({
    queryKey: ['get-department', id],
    queryFn: getDepartment,
    onSuccess: (response) => {
      console.log(response.data);
    }
  })

  /**
   * React Query - Gets All Employees for the add to department menu
   */
  const employeesQuery = useQuery({
    queryKey: ['get-employees'],
    queryFn: getEmployees,
    onSuccess: (response) => {
      console.log(response.data);
    },
    onError: (response) => {
      console.log(response.data);
    }
  })

  /**
   * React Query Mutation - Posts an Employee to the current Department
   */
  const employeeDepartmentMutation = useMutation({
    mutationKey: ['post-department-employee'],
    mutationFn: postEmployeeDepartment,
    onSuccess: (response) => {
      console.log(response.data);
      queryClient.invalidateQueries(['get-department-employees', id]);
    },
    onError: (response) => {
      console.log(response.data);
    }
  })

  /**
   * Gets the information related to this department
   * @returns {Promise<AxiosResponse>}
   */
  async function getDepartment() {
    return await apiClient.get(`api/Department/${id}`);
  }

  /**
   * Function to get all the employees in the current department
   * @returns {Promise<AxiosResponse>}
   */
  async function getDepartmentEmployees() {
    return await apiClient.get(`/api/DepartmentEmployee?deptID=${id}`);
  }

  /**
   * Function to get all employees from database
   * @returns {Promise<AxiosResponse>}
   */
  async function getEmployees() {
    return await apiClient.get('/api/employee');
  }

  /**
   * Function to post an employee to the current department
   * @returns {Promise<AxiosResponse>}
   */
  async function postEmployeeDepartment() {
    return await apiClient.post(`/api/emp-to-department?empID=${employeeToAdd}&depID=${id}`);
  }

  /**
   * Handles the Submission of the add user form
   * @param {Event} event 
   */
  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    let employeeId = formData.get('employeeSelect');
    employeeToAdd = employeeId;

    employeeDepartmentMutation.mutate();
  }

  /**
   * Stops the select menu from being way too big
   */
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: 48 * 4.5 + 8,
        width: 250,
      },
    },
  };

  /**
   * Column definitions for the data grid 
   */
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
      width: 350,
      renderCell: (params) => {
        
        //object to be passed when removing an employee from the department
        const removeObject = {
          employeeId: params.row.id,
          departmentId: id
        };

        //function to invert the manager option
        async function updateManager() {
          return await apiClient.put(`/api/DepartmentEmployee?eID=${params.row.id}&dID=${id}`);  
        }
        
        //function to delete the employee from the department
        async function removeEmployee() {
          return await apiClient.post('/api/departmentEmployee/delete', removeObject);
        }

        //muation function to toggle the employee manager status
        const updateEmployeeManagerMutation = useMutation({
          mutationKey: ['setManager', params.row.id],
          mutationFn: updateManager,
          onSuccess: (response) => {
            console.log(response.data)
            queryClient.invalidateQueries(['get-department-employees', id]);
          },
          onError: (response) => {
            console.log(response.data);
          }
        })

        //mutation function to remove the employee from the department
        const deleteEmployeeManagerMutation = useMutation({
          mutationKey: ['delete-employee-manager', params.row.id, id],
          mutationFn: removeEmployee,
          onSuccess: () => {
            queryClient.invalidateQueries(['get-department-employees', id]);
          },
          onError: (response) => {
            console.log(response.data);
          }
        })

        //runs when the user clicks remove
        function handleRemoveClick() {
          deleteEmployeeManagerMutation.mutate();
        }

        //runs when the user clicks the toggle button
        function handleToggleClick() {
          updateEmployeeManagerMutation.mutate(); 
        }
        
        return (<>
          <Link to={`/employee/${params.row.id}`}><Button>View</Button></Link>
          {
            user.role === 0 && 
            <>
              <Button onClick={handleToggleClick}>Toggle Manager</Button>
              <Button onClick={handleRemoveClick}>Remove</Button>
            </>
          }
        </>)
      }
    }
  ]

  //function to convert the department employee query response into a format that can be used in the data grid
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
        { user.role === 0 &&
          <Box sx={{ display: 'flex', width: '100%' }}>
            <Paper elevation={3} sx={{ width: '100%', mt: 2 }}>
              <Typography variant='h6' sx={{pt:2, px:2}}>Add Employee to Department</Typography>
              <Box component='form' sx={{display: 'flex', flexDirection: 'row', p: 2}} onSubmit={handleSubmit}>
                {
                  (employeesQuery.isSuccess && !employeesQuery.isLoading) && 
                  <>
                    <FormControl fullWidth margin='normal'>
                      <InputLabel id="employeeSelectLabel">Employee</InputLabel>
                      <Select
                              labelId="employeeSelectLabel"
                              id="employeeSelect"
                              name="employeeSelect"
                              label="Employee"
                              disabled={!employeesQuery.isSuccess}
                              MenuProps={MenuProps}
                              defaultValue={employeesQuery.data.data[0].employeeID}
                          >
                          {
                              employeesQuery.data.data.map((e) => (
                                  <MenuItem key={e.employeeID} value={e.employeeID}>{`${e.firstName} ${e.lastName}`}</MenuItem>
                              ))                
                          }
                      </Select>
                    </FormControl>
                    <Button type='submit' variant='contained' sx={{ mt: 3, mb: 2, mx:2 }}>
                          Add
                    </Button>
                  </>
                }
              </Box>
            </Paper>
          </Box>
        }
      </Container>
    </>
  )
}

export default DepartmentPage