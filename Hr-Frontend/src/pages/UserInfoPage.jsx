import React, { useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import Typography from '@mui/material/Typography'
import UserContext from '../context/UserContext';
import { Box, Card } from '@mui/material';
import { padding } from '@mui/system';


function UserInfoPage() {
    /**
     * Getting the user context
    */
    const { user } = useContext(UserContext);
   
    const navigate = useNavigate();
    
    useEffect(() => {
        //check if the user is null
        if (user === null) {
            navigate('/login');
        }
    })

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
                    <Card sx={{
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
                            
                                <Typography key={department.departmentID} variant="h5">{ `${department.departmentID} ${department.departmentName}` }</Typography>
                            )
                        }
                    </Card>
                </Box>
            }
        </>
    )
}

export default UserInfoPage