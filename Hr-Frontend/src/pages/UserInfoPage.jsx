import React, { useEffect, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Typography from '@mui/material/Typography'
import UserContext from '../context/UserContext';
import { Box, Card, Button, Paper } from '@mui/material';
import { padding } from '@mui/system';


function UserInfoPage() {
    /**
     * Getting the user context
    */
    const { user, updateUser } = useContext(UserContext);
   
    const navigate = useNavigate();
    
    useEffect(() => {
        //check if the user is null
        if (user === null) {
            navigate('/login');
        }
    })

    function handleLogoutClick(event) {
        event.preventDefault();
        updateUser(null);
        navigate('/login');
    }

    return (
        <>
            {user && /* If there is an active user, show their info page */
                <Box sx={
                {
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}>
                    <Paper
                        elevation={6}
                        sx={{
                        padding: 8,
                        width: '100%'
                    }}>
                        <Typography variant="h3" >{`${user.firstName} ${user.lastName}`}</Typography>
                        <Typography variant='body1'>{ `Telephone - ${user.telephoneNumber}` }</Typography>
                        <Typography variant='body1'>{ `Email Address - ${user.emailAddress}` }</Typography>
                        <Typography variant='body1'>{ `Status - ${user.status}` }</Typography>
                        {user.managerId && 
                            <Typography variant='body1'>{ `Manager - ${user.managerName}` }</Typography>
                        }
                        {(user.departments.length > 0) && 
                            user.departments.map((department) =>
                            
                                <Typography key={department.id} variant="h5">{ `${department.id} ${department.departmentName}` }</Typography>
                            )
                        }
                        <Button onClick={handleLogoutClick} variant="contained" >
                            Logout
                        </Button>
                    </Paper>
                </Box>
            }
        </>
    )
}

export default UserInfoPage