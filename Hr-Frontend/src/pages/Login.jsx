import React, { useContext, useEffect } from 'react'
import { Container, Box, Paper } from '@mui/material'
import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import {CssBaseline} from '@mui/material';
import Typography from '@mui/material/Typography';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import { useMutation } from 'react-query';
import apiClient from '../api/http';
import UserContext from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

function Login() {
    
    //data to be used in the login function
    let loginData = null;

    //using context to allow the user to be accessed throughout the app
    const {user, updateUser} = useContext(UserContext);
    const navigate = useNavigate();

    //runs on form submit
    function handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        /* console.log({
            email: data.get('Username'),
            password: data.get('Password')
        }); */
        loginData = data;
        loginMutation.mutate();
    }
    
    //React Query Mutation - Used for the login function
    const loginMutation = useMutation({
        mutationKey: ['login-user'],
        mutationFn: loginUser,
        onSuccess: ({data}) => {
            updateUser(data);
            navigate('/');
        },
        onError: ({ data }) => {
            console.log(data);
        }
    })

    //api login function
    async function loginUser() {
        return await apiClient.post('/auth/login', loginData);
    }

    useEffect(() => {
        //console.log('use effect called');
        //console.log(user);
        if (user !== null) {//redirect if the user is logged in. I wasted 6 hours, because of this
            navigate(`/`);
        }
    }, [user]);

    return (
      <>
        <CssBaseline/>  
        <Container sx={{width: '90%'}}>
            <Box
            sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}>
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
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="Username"
                            label="Email Address"
                            name="Username"
                            autoComplete="email"
                            autoFocus 
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="Password"
                            label="Password"
                            type="Password"
                            id="Password"
                            autoComplete="current-password"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                    </Box>
                </Paper>
            </Box>
        </Container>
      </>
  )
}

export default Login