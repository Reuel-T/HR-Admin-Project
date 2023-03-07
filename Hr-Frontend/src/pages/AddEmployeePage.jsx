import { Avatar, Box, CssBaseline, Paper, TextField, Typography, Button, Alert, IconButton } from '@mui/material'
import React, { useEffect, useState } from 'react'
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import { Container } from '@mui/system';
import { useMutation } from 'react-query';
import apiClient from '../api/http';
import CloseIcon from '@mui/icons-material/Close';
import Collapse from '@mui/material/Collapse';

function AddEmployeePage() {

    let createUserData = null;
    const [createdUsername, updateCreatedUsername] = useState(null);

    const [showAlertSuccess, updateShowAlertSuccess] = useState(false);
    const [showAlertFail, updateShowAlertFail] = useState(false);

    function handleSubmit(event) {
        event.preventDefault();
        updateShowAlertSuccess(false);
        const data = new FormData(event.currentTarget);
        createUserData = {
            firstName: data.get('firstName'),
            lastName: data.get('lastName'),
            emailAddress: data.get('emailAddress'),
            telephoneNumber: data.get('telephoneNumber'),
            managerID: null
        };
        updateCreatedUsername(data.get('emailAddress'));
        try {
            createUserMutation.mutate();
        } catch (error) {
            console.log(error);
            updateShowAlertFail(true);
        }
    }

    const createUserMutation = useMutation({
        mutationKey: ['create-user'],
        mutationFn: createUser,
        onSuccess: () => {
            updateShowAlertSuccess(true);
        },
        onError: () => {
            updateShowAlertFail(true);
        }
    })

    async function createUser() {
        return await apiClient.post('/api/Employee', createUserData);
    }

    return (
        <>
            <CssBaseline />
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
                        <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                            <AccountCircleRoundedIcon />
                        </Avatar>
                        <Typography variant="h5">
                            Add Employee
                        </Typography>
                        <Box component='form' onSubmit={handleSubmit}>
                            <TextField
                                margin='normal'
                                required
                                fullWidth
                                id='firstName'
                                label='First Name'
                                name='firstName'
                                autoFocus
                            />
                            <TextField
                                margin='normal'
                                fullWidth
                                id='lastName'
                                label='Last Name'
                                name='lastName'
                            />
                            <TextField
                                margin='normal'
                                fullWidth
                                id='emailAddress'
                                label='Email Address'
                                name='emailAddress'
                                type='email'
                                required
                            />
                            <TextField
                                margin='normal'
                                fullWidth
                                required
                                id='telephoneNumber'
                                label='Telephone Number'
                                name='telephoneNumber'
                                type='tel'
                            />
                            <Button
                                type='submit'
                                fullWidth
                                variant='contained'
                                sx={{ mt: 3, mb: 2 }}
                            >
                            Create Employee
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
                        {`Employee with Email Address ${createdUsername} successfully created`}
                        </Alert>
                    </Collapse>
                </Box>
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
                        {`Unable to create Employee with Email Address ${createdUsername}`}
                        </Alert>
                    </Collapse>
                </Box>
            </Container>
        </>
    )
}

export default AddEmployeePage