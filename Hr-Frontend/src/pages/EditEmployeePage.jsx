import { Avatar, Checkbox, Container, CssBaseline, LinearProgress, Paper, TextField, Typography, FormControlLabel, InputLabel, Select, MenuItem, FormControl, Button, IconButton, Alert, Collapse } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import apiClient from '../api/http';
import { Box } from '@mui/system';
import CloseIcon from '@mui/icons-material/Close';
import UserContext from '../context/UserContext';

function EditEmployeePage() {
    //employee id from the router
    const { id } = useParams();

    //query client, used to invalidate and refetch employee data
    const queryClient = useQueryClient();

    //getting the logged in user
    const { user, updateUser } = useContext(UserContext);

    //UI state, for update feedback
    const [showAlertSuccess, updateShowAlertSuccess] = useState(false);
    const [showAlertFail, updateShowAlertFail] = useState(false);

    const navigate = useNavigate();

    //object to be passed when editing an employee
    let updateEmployeeData = null;

    useEffect(() => {
        //if user not logged in  
        if (user === null || user === undefined) {
          navigate('/login');
        } else {
            //if the user isnt an admin
            if (!(user.role === 0)) {
                //if the user isn't the user to be edited
                if (!(user.employeeID === Number(id))) {
                    navigate('/')
                }
            }
        } 
      })

    //building the employee query object
    const employeeQuery = useQuery({
        queryKey: ['get-employee', id],
        queryFn: getEmployee,
        onSuccess: (response) => {
            console.log('Employee Query Response');
            console.log(response.data);
        },
        onError: (response) => {
            console.log('Employee Query Error Response');
            console.log(response)
        },
    })

    //query to get the managers for an employee
    const managerQuery = useQuery({
        queryKey: ['get-managers', id],
        queryFn: getManagers,
        onSuccess: (response) => {
            console.log('Manager Query Response');
            console.log(response.data);
        },
        onError: (response) => {
            console.log('Manager Query Error Response');
            console.log(response)
        },
    })

    //mutation function to update the current employee
    const employeeMutation = useMutation({
        mutationKey: ['update-employee', id],
        mutationFn: updateEmployee,
        onSuccess: (response) => {
            console.log('Employee Mutation Response');
            console.log(response.data);
            if (id === user.employeeID) {
                updateUser(response.data);
            }
            updateShowAlertSuccess(true);
            queryClient.invalidateQueries(['get-employee', id]);
        },
        onError: (response) => {
            console.log(response.data);
            updateShowAlertFail(true);
        }
    })

    //function to get the possible managers for the employee
    async function getManagers() {
        return await apiClient.get(`/api/employee-managers/${id}`);
    }

    //function to get the employee data from the api
    async function getEmployee() {
        return await apiClient.get(`/api/employee/${id}`);
    }

    async function updateEmployee(){
        return await apiClient.put(`api/employee/${id}`, updateEmployeeData);
    }

    //runs on form submit to update the user
    function handleSubmit(event) {
        event.preventDefault();
        let formData = new FormData(event.currentTarget);
        const firstName = (formData.get('firstName'));
        const lastName = (formData.get('lastName'));
        let password = (formData.get('password'));
        const telephoneNumber = (formData.get('telephoneNumber'));
        let status = (formData.get('status'));
        const managerID = (formData.get('managerSelect'));

        //status check is due to the fact that checkbox returns on or null
        if (status === null) {
            status = false;
        } else {
            status = true;
        }

        //if the user wishes to change their password
        if (password.length < 1) {
            password = null;
        }

        let updatedEmployee = {
            id: id,
            firstName: firstName,
            lastName: lastName,
            password: password,
            telephoneNumber: telephoneNumber,
            status: status,
            managerID: managerID
        };

        updateEmployeeData = updatedEmployee;

        employeeMutation.mutate();
    }

    //UI function
    function stringAvatar(name) {
        return {
            sx: {
                bgcolor: stringToColor(name),
            },
            children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
        };
    }

    //UI function
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

    //Used to stop the select menu from taking up the entire screen
    const MenuProps = {
        PaperProps: {
          style: {
            maxHeight: 48 * 4.5 + 8,
            width: 250,
          },
        },
      };

    return (
        <>
            <CssBaseline/>
            {
                employeeQuery.isLoading && 
                <LinearProgress/>
            }
            {
                employeeQuery.isSuccess &&
                
                <Container sx={{ width: '90%' }}>  
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center'
                        }}    
                    >
                        <Paper elevation={3}
                            sx={{
                                padding: 8,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <Avatar
                                    {...stringAvatar(`${employeeQuery.data.data.firstName} ${employeeQuery.data.data.lastName}`)} />
                            <Typography variant='h5'>Edit Employee</Typography>
                            <Box component='form' onSubmit={handleSubmit}>
                                <TextField
                                    margin='normal'
                                    required
                                    fullWidth
                                    id='firstName'
                                    label='First Name'
                                    name='firstName'
                                    defaultValue={employeeQuery.data.data.firstName}    
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="lastName"
                                    label="Last Name"
                                    id="lastName"
                                    defaultValue={employeeQuery.data.data.lastName}    
                                />
                                <TextField
                                    margin="normal"
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="Password"
                                    id="password"
                                    autoComplete="current-password"
                                    defaultValue={null}    
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="telephoneNumber"
                                    label="Telephone Number"
                                    type="tel"
                                    id="telephoneNumber"
                                    autoComplete=""
                                    defaultValue={employeeQuery.data.data.telephoneNumber}    
                                />
                                <FormControlLabel
                                    label="Status"
                                    disabled={!(user.role === 0)}    
                                    control={
                                    <Checkbox
                                        id='status'        
                                        name='status'
                                        defaultChecked={employeeQuery.data.data.status}
                                        disabled={!(user.role === 0)}    
                                    />
                                  }
                                />
                                {
                                    managerQuery.isSuccess && 
                                        
                                    <FormControl fullWidth margin='normal'>
                                    <InputLabel id="managerSelectLabel">Manager</InputLabel>
                                    <Select
                                            labelId="managerSelectLabel"
                                            id="managerSelect"
                                            name="managerSelect"
                                            label="Manager"
                                            disabled={!(user.role == 0)}
                                            defaultValue={employeeQuery.data.data.managerID === null ? -1 : employeeQuery.data.data.managerID}
                                            MenuProps={MenuProps}        
                                        >
                                        {
                                            managerQuery.data.data.map((m) => (
                                                <MenuItem key={m.id} value={m.id}>{m.name}</MenuItem>
                                            ))                
                                        }
                                    </Select>
                                    </FormControl>        
                                }    
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    Update Employee
                                </Button>
                            </Box>    
                        </Paper>
                    </Box>
                    <Box sx={{ width: '100%', marginTop : 8 }}>
                    <Collapse in={showAlertSuccess}>
                        <Alert
                            severity='success'
                            action=
                            {
                                <IconButton
                                aria-label="close"
                                color="inherit"
                                size="small"
                                onClick={() => {
                                    updateShowAlertSuccess(false);
                                }}
                                >
                                <CloseIcon fontSize="inherit" />
                                </IconButton>
                            }
                            sx={{ mb: 2 }}
                        >
                        {`Update Successful`}
                        </Alert>
                    </Collapse>
                </Box>
                <Box sx={{ width: '100%'}}>
                    <Collapse in={showAlertFail}>
                        <Alert
                            severity='error'
                            action=
                            {
                                <IconButton
                                aria-label="close"
                                color="inherit"
                                size="small"
                                onClick={() => {
                                    updateShowAlertFail(false);
                                }}
                                >
                                <CloseIcon fontSize="inherit" />
                                </IconButton>
                            }
                            sx={{ mb: 2 }}
                        >
                        {`Update Failed`}
                        </Alert>
                    </Collapse>
                </Box>    
                </Container>
            }
        </>
    )
}

export default EditEmployeePage