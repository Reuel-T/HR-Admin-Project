import React, { useContext, useEffect, useState } from 'react';
import UserContext from '../context/UserContext';
import apiClient from '../api/http';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import { LinearProgress } from '@mui/material';
import { Box, width } from '@mui/system';

function ListEmployeesPage(){

    const [employees, updateEmployees] = useState([]);

    /**
     * Getting the user context
    */
    const { user } = useContext(UserContext);
   
    const navigate = useNavigate();

    const { isLoading: isLoadingEmployees, refetch: getEmployees } = useQuery('get-employees',

         () => {
            return apiClient.get('/api/employee')
        },
        {
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
                console.log(employeeResponse);
                console.log(response.data);
                console.log(employees);
            },
            onError: (response) => {
                console.log(error);
            }
        }
    )

    const tableColumns = [
        {field: 'id', headerName: 'ID', width: 70},
        {field: 'firstName', headerName: 'First Name', width: 130},
        {field: 'lastName', headerName: 'Last Name', width: 130},
        {field: 'emailAddress', headerName: 'Email Address', width: 130},
        {field: 'managerName', headerName: 'Manager Name', width: 130},
        {field: 'status', headerName: 'Status', width: 70, type:'boolean'},
    ]
        
    useEffect((user) => {
        //check if the user is null, and redirect to login page
        if (user === null) {
            navigate('/login');
        }
    })

    return (
        <>
            {
                isLoadingEmployees && 
                <LinearProgress sx={{width: '100%', marginTop: 8}}/>
            }
            
            <Box sx={{height: '65vh', width: '100%', marginTop: 8}}>
            {employees.length > 0 &&
                <DataGrid
                sx={{marginTop : 8}}
                columns={tableColumns}
                rows={employees}
                />
            }
            </Box>
        </>
    )
}

export default ListEmployeesPage