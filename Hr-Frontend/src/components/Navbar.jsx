import { React, useEffect } from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Button from '@mui/material/Button';
import { CssBaseline } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { useContext } from 'react';
import UserContext from '../context/UserContext';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {

  const { user, updateUser } = useContext(UserContext);
  const navigate = useNavigate()

  function logoutClickHandler(event) {
    event.preventDefault();
    updateUser(null);
    navigate('/login');
  }

  useEffect(() => {
    if (!user) {
      navigate('login');
    }
  },[user])

  return (
    <>
    <CssBaseline/>
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton> 
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {user && user.firstName}
            {!user && <>HR Adminstration</>}
          </Typography>  

          {user && <Link to='employees'><Button color="primary" variant='contained' >Employees</Button></Link>}
          {user && <Button color="primary" variant='contained' onClick={logoutClickHandler}>Log Out</Button>}  
          
        </Toolbar>
      </AppBar>
    </Box>
    </>
  );
}
    
export default Navbar