import { Container, Box, Paper, Typography, Avatar, Divider, Stack, Button } from '@mui/material';
import React, { useContext, useState } from 'react'
import { useQuery } from 'react-query';
import { Link, useNavigate, useParams } from 'react-router-dom'
import apiClient from '../api/http';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { useEffect } from 'react';
import UserContext from '../context/UserContext';
import SupervisorAccountRoundedIcon from '@mui/icons-material/SupervisorAccountRounded';

function EmployeePage() {

    /**
     * The ID from the route
     */
    const { id } = useParams();

    /**
     * Getting the user context
    */
    const { user } = useContext(UserContext);

    //navigation object
    const navigate = useNavigate();

    //employee query object
    const getEmployeeQuery = useQuery({
        queryKey: ['get-employee'],
        queryFn: getEmployee,
        onSuccess: (response) => {
            console.log(response.data);
        },
        onError: (response) => {
            console.log(response);
        },

    })

    //function to get the employee
    async function getEmployee() {
        if (id !== undefined) {
            return await apiClient.get(`/api/employee/${id}`);
        } else {
            return await apiClient.get(`/api/employee/${user.employeeID}`);
        }
    }

    //function to generate a user avatar
    function stringAvatar(name) {
        return {
            sx: {
                bgcolor: stringToColor(name),
            },
            children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
        };
    }

    //function to get the color of the avatar - UI Function
    function stringToColor(string) {
        let hash = 0;
        let i;

        /* eslint-disable no-bitwise */
        for (i = 0; i < string.length; i += 1) {
            hash = string.charCodeAt(i) + ((hash << 5) - hash);
        }

        let color = '#';

        for (i = 0; i < 3; i += 1) {
            const value = (hash >> (i * 8)) & 0xff;
            color += `00${value.toString(16)}`.slice(-2);
        }
        /* eslint-enable no-bitwise */

        return color;
    }

    //function to format a phone number, annoyingly doesnt seem to work properly
    function formatPhone(phoneNumber) {
        let phone = phoneNumber;
        phone.replace(/(\d{3})(\d{3})(\d{4})/, "($1)$2-$3"); // (012)345-6789

        return phone
    }

    useEffect(() => {
      //if user not logged in  
      if (user === null || user === undefined) {
        navigate('/login');
      } else {
        console.log(user);
      } 
    })
    
    return (
        <>
            {
                getEmployeeQuery.isSuccess &&
                <Container sx={{ width: '90%', marginTop: 8 }}>
                    <Box >
                        <Paper elevation={3}
                            sx={{ p: 4 }}
                        >
                            <Box
                                sx={{ display: 'flex' }}>
                                <Typography sx={{ flexGrow: 1 }} variant='h4'>{`${getEmployeeQuery.data.data.firstName} ${getEmployeeQuery.data.data.lastName}`}</Typography>
                                <Avatar
                                    {...stringAvatar(`${getEmployeeQuery.data.data.firstName} ${getEmployeeQuery.data.data.lastName}`)} />
                            </Box>
                            <Typography sx={{ mt: 2 }} variant="h5" >Personal Information</Typography>
                            <Divider />
                            <Box sx={{ py: 3, px: 2 }}>
                                <Box>
                                    <Typography variant='body2'>First Name</Typography>
                                    <Typography variant='body'><strong>{getEmployeeQuery.data.data.firstName}</strong></Typography>
                                </Box>
                                <Box sx={{ py: 1 }}>
                                    <Typography variant='body2'>Last Name</Typography>
                                    <Typography variant='body'><strong>{getEmployeeQuery.data.data.lastName}</strong></Typography>
                                </Box>
                                <Box sx={{ py: 1 }}>
                                    <Typography variant='body2'>Phone Number</Typography>
                                    <Typography variant='body'>{getEmployeeQuery.data.data.telephoneNumber && <strong>{formatPhone(getEmployeeQuery.data.data.telephoneNumber)}</strong>}</Typography>
                                </Box>
                                <Box sx={{ py: 1 }}>
                                    <Typography variant='body2'>Email Address</Typography>
                                    <Typography variant='body'><strong>{getEmployeeQuery.data.data.emailAddress}</strong> </Typography>
                                </Box>
                            </Box>
                            <Typography variant="h5" >Organisational Information</Typography>
                            <Divider />
                            <Box sx={{py: 3, px: 2}}>
                                <Box sx={{ py: 1 }}>
                                    <Typography variant='body2'>Manager</Typography>
                                    {
                                            getEmployeeQuery.data.data.managerID ? <Typography variant='body1'><strong>{ getEmployeeQuery.data.data.managerName }</strong></Typography> : <Typography variant='body1'><strong>Employee does not currently have a manager</strong></Typography>       
                                    }
                                </Box>
                                <Box sx={{ py: 1 }}>
                                    <Typography variant='body2'>Status</Typography>
                                    {
                                            getEmployeeQuery.data.data.status ? <Stack direction='row'><CheckRoundedIcon color='success'/><Typography variant='body'><strong>Active</strong></Typography></Stack> : <CloseRoundedIcon color='error'/>      
                                    }
                                </Box>
                                <Box sx={{ py: 1 }}>
                                    <Typography variant='h6' sx={{pb: 1}}>Departments</Typography>
                                    {
                                        getEmployeeQuery.data.data.departments.length > 0
                                            ?
                                            <>
                                                <Stack direction='row' spacing={2} maxWidth={'100%'}>
                                                    {getEmployeeQuery.data.data.departments.map((department) =>
                                                        (user.role === 0 || department.isManager === true) ?    
                                                        <Link key={department.id} to={`/department/${department.id}`}>
                                                            <Paper elevation={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 50, minWidth: 100 }} >
                                                                <Box sx={{display: 'flex', flexDirection: 'row'}}>
                                                                    <Typography variant="body">{`${department.departmentName}`}</Typography>
                                                                    <SupervisorAccountRoundedIcon/>    
                                                                </Box>
                                                            </Paper>
                                                        </Link> : <Paper key={department.id} elevation={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 50, minWidth: 100 }} >
                                                                <Box>
                                                                    <Typography variant="body">{department.departmentName}</Typography>
                                                                </Box>
                                                            </Paper>
                                                    )}  
                                                </Stack>
                                            </>
                                            :
                                            <>
                                                <Typography variant='body'>Employee Does not Belong to any departments</Typography>
                                            </>    
                                    }
                                </Box>    
                            </Box>
                            {
                                    (id !== undefined)
                                        ? 
                                            (user.role === 0 || user.employeeID === Number(id)) && 
                                            <Link to={`/employee/edit/${id}`}>
                                                <Button variant='contained'>Edit Employee</Button>
                                            </Link>
                                        : (user.role === 0) &&  
                                            <Link to={`/employee/edit/${user.employeeID}`}>
                                                <Button variant='contained'>Edit Employee</Button>
                                            </Link>
                            }      
                        </Paper>
                    </Box>
                </Container>
            }
        </>
    )
}

export default EmployeePage