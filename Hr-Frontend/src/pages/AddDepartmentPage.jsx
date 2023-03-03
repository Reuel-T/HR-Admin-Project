import { CssBaseline, Container, Box, Paper, Avatar, Typography, Button, Collapse, Alert, IconButton, TextField } from '@mui/material';
import React from 'react'
import { useState } from 'react';
import { useMutation } from 'react-query';
import apiClient from '../api/http';
import CasesRoundedIcon from '@mui/icons-material/CasesRounded';
import CloseIcon from '@mui/icons-material/Close';

function AddDepartmentPage() {
    let createDepartmentData = null;

    const [createdDepartmentName, updateCreatedDepartmentName] = useState(null);

    const [showAlertSuccess, updateShowAlertSuccess] = useState(false);
    const [showAlertFail, updateShowAlertFail] = useState(false);

    function handleSubmit(event) {
        event.preventDefault();
        updateShowAlertSuccess(false);

        const data = new FormData(event.currentTarget);
        createDepartmentData = {
            departmentName: data.get('departmentName')
        }
        updateCreatedDepartmentName(data.get('departmentName'));
        try {
            createDepartment();
        } catch (error) {
            console.log(error);
            updateShowAlertFail(true);
        }

    }

    const { isLoading: isCreatingDepartment, mutate: createDepartment } = useMutation(
        async () => {
            console.log(createDepartmentData);
            return await apiClient.post('/api/Department', createDepartmentData);
        },
        {
            onSuccess: ({ data }) => {
                let response = data;
                updateShowAlertSuccess(true);
                console.log(response);
            },
            onError: (res) => {
                console.log(res);
                updateShowAlertFail(true);
            }
        }
    )
    
    return (
        <>
            <CssBaseline />
            <Container width={{width: '90%'}}>
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