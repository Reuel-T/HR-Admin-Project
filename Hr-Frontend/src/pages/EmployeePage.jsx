import { Container, Box, Paper, Typography, Avatar, Divider, Stack } from '@mui/material';
import React, { useState } from 'react'
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom'
import apiClient from '../api/http';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

function EmployeePage() {

    const { id } = useParams();

    const [employee, updateEmployee] = useState();

    const { isLoading: isLoadingEmployee, refetch: getEmployee } = useQuery('get-employee',

        async () => {
            return await apiClient.get(`/api/employee/${id}`)
        },
        {
            onSuccess: (response) => {
                updateEmployee(response.data);
                console.log(response.data);
            },
            onError: (response) => {
                console.log(error);
            }
        }
    )

    function stringAvatar(name) {
        return {
            sx: {
                bgcolor: stringToColor(name),
            },
            children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
        };
    }

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

    function formatPhone(phoneNumber) {
        let phone = phoneNumber;
        phone.replace(/(\d{3})(\d{3})(\d{4})/, "($1)$2-$3"); // (012)345-6789

        return phone
    }

    return (
        <>
            {
                employee &&
                <Container sx={{ width: '90%', marginTop: 8 }}>
                    <Box >
                        <Paper elevation={3}
                            sx={{ p: 4 }}
                        >
                            <Box
                                sx={{ display: 'flex' }}>
                                <Typography sx={{ flexGrow: 1 }} variant='h4'>{`${employee.firstName} ${employee.lastName}`}</Typography>
                                <Avatar
                                    {...stringAvatar(`${employee.firstName} ${employee.lastName}`)} />
                            </Box>
                            <Typography sx={{ mt: 2 }} variant="h5" >Personal Information</Typography>
                            <Divider />
                            <Box sx={{ py: 3, px: 2 }}>
                                <Box>
                                    <Typography variant='body2'>First Name</Typography>
                                    <Typography variant='body'><strong>{employee.firstName}</strong></Typography>
                                </Box>
                                <Box sx={{ py: 1 }}>
                                    <Typography variant='body2'>Last Name</Typography>
                                    <Typography variant='body'><strong>{employee.lastName}</strong></Typography>
                                </Box>
                                <Box sx={{ py: 1 }}>
                                    <Typography variant='body2'>Phone Number</Typography>
                                    <Typography variant='body'>{employee.telephoneNumber && <strong>{formatPhone(employee.telephoneNumber)}</strong>}</Typography>
                                </Box>
                                <Box sx={{ py: 1 }}>
                                    <Typography variant='body2'>Email Address</Typography>
                                    <Typography variant='body'><strong>{employee.emailAddress}</strong> </Typography>
                                </Box>
                            </Box>
                            <Typography variant="h5" >Organisational Information</Typography>
                            <Divider />
                            <Box sx={{py: 3, px: 2}}>
                                <Box sx={{ py: 1 }}>
                                    <Typography variant='body2'>Manager</Typography>
                                    {
                                            employee.managerID ? <Typography variant='body1'><strong>{ employee.managerName }</strong></Typography> : <Typography variant='body1'><strong>Employee does not currently have a manager</strong></Typography>       
                                    }
                                </Box>
                                <Box sx={{ py: 1 }}>
                                    <Typography variant='body2'>Status</Typography>
                                    {
                                            employee.status ? <Stack direction='row'><CheckRoundedIcon color='success'/><Typography variant='body'><strong>Active</strong></Typography></Stack> : <CloseRoundedIcon color='error'/>      
                                    }
                                </Box>
                                <Box sx={{ py: 1 }}>
                                    <Typography variant='h6' sx={{pb: 1}}>Departments</Typography>
                                    {
                                        employee.departments.length > 0
                                            ?
                                            <>
                                                
                                                <Stack direction='row' spacing={2}>
                                                    {employee.departments.map((department) =>
                                                        <Paper key={department.departmentID} sx={{flexGrow: 1, display:'flex', justifyContent:'center', alignItems:'center', height: 50, minWidth: 100}} >
                                                            <Box>
                                                                <Typography variant="body">{department.departmentName}</Typography>
                                                            </Box>
                                                        </Paper>
                                                    )}
                                                    <Paper sx={{flexGrow: 1, display:'flex', justifyContent:'center', alignItems:'center', height: 50, minWidth: 100}} >
                                                        <Box sx={{p: 0}}>
                                                            <AddRoundedIcon/>
                                                        </Box>
                                                    </Paper>    
                                                </Stack>
                                            </>
                                            :
                                            <>
                                                <Typography variant='body'>Employee Does not Belong to any departments</Typography>
                                                <Paper sx={{flexGrow: 1, display:'flex', justifyContent:'center', alignItems:'center', height: 50, minWidth: 100}} >
                                                    <Box sx={{p: 0}}>
                                                        <AddRoundedIcon/>
                                                    </Box>
                                                </Paper>  
                                            </>    
                                    }
                                </Box>    
                            </Box>    
                        </Paper>
                    </Box>
                </Container>
            }
        </>
    )
}

export default EmployeePage