import { Alert, Avatar, Box, Button, Checkbox, Collapse, Container, CssBaseline, FormControlLabel, IconButton, LinearProgress, Paper, TextField, Typography } from '@mui/material';
import React from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { useParams } from 'react-router-dom';
import apiClient from '../api/http';
import CasesRoundedIcon from '@mui/icons-material/CasesRounded';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';


function EditDepartmentPage() {

    //get the id of the department from the route
    const { id } = useParams();
    //query client to invalidate and update ui 
    const queryClient = useQueryClient();

    //data to be passed when updating the department
    let updateDepartmentData = null;

    //UI alert state, for user feedback
    const [showAlertSuccess, updateShowAlertSuccess] = useState(false);
    const [showAlertFail, updateShowAlertFail] = useState(false);

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

    //react query - gets the info for a single department
    const getDepartmentQuery = useQuery({
        queryKey: ['get-department', id],
        queryFn: getDepartment,
        onSuccess: (response) => {
            console.log(response.data);
        },
        onError: (response) => {
            console.log(response.data);
        }
    })

    //react query mutation - used to update department info
    const departmentMutation = useMutation({
        mutationKey: ['update-department', id],
        mutationFn: updateDepartment,
        onSuccess: (response) => {
            updateShowAlertSuccess(true);
            queryClient.invalidateQueries(['get-department', id]);
        },
        onError: (response) => {
            updateShowAlertFail(true);
            console.log(response.data);
        }
    })

    //api call to get the department info
    async function getDepartment() {
        return await apiClient.get(`/api/Department/${id}`);
    }

    //api call to update the department
    async function updateDepartment() {
        return await apiClient.put(`/api/Department/${id}`, updateDepartmentData);
    }

    //runs on the form submission to update the current department
    function handleFormSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const departmentName = formData.get('departmentName');
        let status = formData.get('status');

        //status check is due to the fact that checkbox returns on or null
        if (status === null) {
            status = false;
        } else {
            status = true;
        }

        const updatedDepartment = {
            id: id,
            departmentName: departmentName,
            status: status
        };

        console.log(updatedDepartment);

        updateDepartmentData = updatedDepartment;

        departmentMutation.mutate();
    }

    return (
        <>
            <CssBaseline />
            {
                getDepartmentQuery.isLoading &&
                <LinearProgress/>
            }
            {
                getDepartmentQuery.isSuccess &&
                
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
                                }}
                        >
                            
                            <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                                <CasesRoundedIcon/>
                            </Avatar>
                            
                            <Typography variant='h5'>
                                Edit {getDepartmentQuery.data.data.departmentName}
                            </Typography>
                            <Box component='form' onSubmit={handleFormSubmit}>
                                <TextField
                                    margin='normal'
                                    required
                                    fullWidth
                                    id='departmentName'
                                    label='Department Name'
                                    name='departmentName'
                                    defaultValue={getDepartmentQuery.data.data.departmentName}    
                                />
                                <FormControlLabel
                                    label="Status"
                                    control={
                                    <Checkbox
                                        id='status'        
                                        name='status'
                                        defaultChecked={getDepartmentQuery.data.data.departmentStatus}
                                    />
                                  }
                                />    
                                <Button
                                    type='submit'
                                    fullWidth
                                    variant='contained'
                                    sx={{mt:3, mb:2}}    
                                >
                                    Update Department
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

export default EditDepartmentPage