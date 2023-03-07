import React, { useContext, useEffect, useReducer, useState } from 'react';
import UserContext from '../context/UserContext';
import apiClient from '../api/http';
import { useQuery } from 'react-query';
import { Link, useNavigate } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import { Button, LinearProgress, Typography } from '@mui/material';
import { Box } from '@mui/system';

function ListEmployeesPage(){

    const [employees, updateEmployees] = useState([]);

    /**
     * Getting the user context
    */
    const { user } = useContext(UserContext);
    
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
   

    //React Query function to get all employees from the database
    const getEmployeesQuery = useQuery({
        queryKey: ['get-employees'],
        queryFn: getEmployees,
        onSuccess: (response) => {

            //Function used to create a list suitable for the data grid
            function convertEmployees(e) {
                return {
                    id: e.employeeID,
                    firstName: e.firstName,
                    lastName: e.lastName,
                    emailAddress: e.emailAddress,
                    managerName: e.managerName,
                    status: e.status
                };
            }

            let employeeResponse = response.data.map(convertEmployees);
            updateEmployees(employeeResponse);
        },
        onError: (response) => {
            console.log(response);
        }
    }
    )

    //function to get employees from API
    async function getEmployees() {
        return await apiClient.get('/api/employee');
    }

    //column definitions for the data grid
    const tableColumns = [
        {field: 'id', headerName: 'ID', width: 70},
        {field: 'firstName', headerName: 'First Name', width: 130},
        {field: 'lastName', headerName: 'Last Name', width: 130},
        {field: 'emailAddress', headerName: 'Email Address', width: 130},
        {field: 'managerName', headerName: 'Manager Name', width: 130},
        { field: 'status', headerName: 'Status', width: 70, type: 'boolean' },
        {
            field: 'action',
            headerName: 'Actions',
            sortable: false,
            width: 210,
            renderCell: (params) => {
                return (<>
                    <Link to={`/employee/${params.row.id}`}><Button>View</Button></Link>
                    <Link to={`/employee/edit/${params.row.id}`}><Button>Edit</Button></Link>
                </>)
            }
        }
    ]
        
    return (
        <>
            <Typography variant='h3' sx={{marginTop: 8}}>Employees</Typography>
            {
                getEmployeesQuery.isLoading && 
                <LinearProgress sx={{width: '100%', marginTop: 8}}/>
            }
            
            <Box sx={{height: '50vh', width: '100%', marginTop: 2}}>
            {employees.length > 0 &&
                <DataGrid
                sx={{marginTop : 8}}
                columns={tableColumns}
                rows={employees}
                />
            }
            </Box>
            <Box sx={{ marginTop: 4 }}>
                <Link to='/add-employee'>
                    <Button variant='contained'>Add Employee</Button>
                </Link>
            </Box>
        </>
    )
}

export default ListEmployeesPage