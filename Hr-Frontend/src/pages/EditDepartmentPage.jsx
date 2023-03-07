import { Alert, Avatar, Box, Button, Checkbox, Collapse, Container, CssBaseline, FormControlLabel, IconButton, LinearProgress, Paper, TextField, Typography } from '@mui/material';
import React from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { useParams } from 'react-router-dom';
import apiClient from '../api/http';
import CasesRoundedIcon from '@mui/icons-material/CasesRounded';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';


function EditDepartmentPage() {

    const { id } = useParams();
    const queryClient = useQueryClient();

    let updateDepartmentData = null;

    const [showAlertSuccess, updateShowAlertSuccess] = useState(false);
    const [showAlertFail, updateShowAlertFail] = useState(false);

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

    const departmentMutation = useMutation({
        mutationKey: ['update-department', id],
        mutationFn: updateDepartment,
        onSuccess: (response) => {
            updateShowAlertSuccess(true);
            queryClient.invalidateQueries(['get-department', id]);
            console.log(response.data);
        },
        onError: (response) => {
            updateShowAlertFail(true);
            console.log(response.data);
        }
    })

    async function getDepartment() {
        return await apiClient.get(`/api/Department/${id}`);
    }

    async function updateDepartment() {
        console.log(updateDepartmentData);
        return await apiClient.put(`/api/Department/${id}`, updateDepartmentData);
    }

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