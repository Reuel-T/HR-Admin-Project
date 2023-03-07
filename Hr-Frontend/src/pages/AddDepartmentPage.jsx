import { CssBaseline, Container, Box, Paper, Avatar, Typography, Button, Collapse, Alert, IconButton, TextField } from '@mui/material';
import React, { useContext } from 'react'
import { useState } from 'react';
import { useMutation } from 'react-query';
import { Link, useNavigate } from 'react-router-dom'
import apiClient from '../api/http';
import CasesRoundedIcon from '@mui/icons-material/CasesRounded';
import CloseIcon from '@mui/icons-material/Close';
import UserContext from '../context/UserContext';
import { useEffect } from 'react';

function AddDepartmentPage() {
    //data to be used to create a department
    let createDepartmentData = null;

    //state object used in the component
    const [createdDepartmentName, updateCreatedDepartmentName] = useState(null);

    //state objects to show alerts depending on api calls
    const [showAlertSuccess, updateShowAlertSuccess] = useState(false);
    const [showAlertFail, updateShowAlertFail] = useState(false);

    /**
     * Getting the user context
    */
    const { user, updateUser } = useContext(UserContext);
   
    //navigate used to change pages if needed
    const navigate = useNavigate();

    //handles the submission of the form
    function handleSubmit(event) {
        event.preventDefault();
        updateShowAlertSuccess(false);

        //gets the data from the form
        const data = new FormData(event.currentTarget);
        createDepartmentData = {
            departmentName: data.get('departmentName')
        }
        //updates the state variable for the UI
        updateCreatedDepartmentName(data.get('departmentName'));
        try {
            //runs the mutation function
            createDepartmentMutation.mutate();
        } catch (error) {
            console.log(error);
            updateShowAlertFail(true);
        }
    }

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

    //mutation function for adding the department to the backend
    const createDepartmentMutation = useMutation({
        mutationKey: ['create-department'],
        mutationFn: createDepartment,
        onSuccess: ({ data }) => {
            let response = data;
            updateShowAlertSuccess(true);
            console.log(response);
        },
        onError: (res) => {
            console.log(res);
            updateShowAlertFail(true);
        }
    })

    //post request function for the API
    async function createDepartment() {
        console.log(createDepartmentData);
        return await apiClient.post('/api/Department', createDepartmentData);
    }
    
    return (
        <>
            <CssBaseline />
            <Container sx={{width: '90%'}}>
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
                            alignItems: 'center'
                        }}>
                        <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                            <CasesRoundedIcon />
                        </Avatar>
                        <Typography component='h1' variant='h5'>
                            Add Department
                        </Typography>
                        <Box component='form' onSubmit={handleSubmit}>
                            <TextField
                                margin='normal'
                                required
                                fullWidth
                                id='departmentName'
                                label='Department Name'
                                name='departmentName'
                            />
                            <Button
                                type='submit'
                                fullWidth
                                variant='contained'
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Create Department
                            </Button>
                        </Box>
                    </Paper>
                </Box>
                <Box sx={{ width: '100%', marginTop: 8 }}>
                    <Collapse in={showAlertSuccess}>
                        <Alert
                            severity='success'
                            action=
                            {
                                <IconButton
                                    aria-label='close'
                                    color='inherit'
                                    size='small'
                                    onClick={() => {
                                        updateShowAlertSuccess(false);
                                    }}
                                >
                                    <CloseIcon fontSize='inherit'/>
                                </IconButton>
                            }
                            sx={{ mb: 2 }}
                        >
                            {`Department with Name ${createdDepartmentName} successfully created`}
                        </Alert>
                    </Collapse>
                    <Box sx={{ width: '100%', marginTop : 8 }}>
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
                        {`Unable to create Department with name ${createdDepartmentName}`}
                        </Alert>
                    </Collapse>
                </Box>
                </Box>
            </Container>
        </>
    )
}

export default AddDepartmentPage