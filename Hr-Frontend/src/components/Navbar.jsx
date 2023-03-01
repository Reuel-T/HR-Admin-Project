import { React } from 'react'
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

function Navbar() {

  const { user, setUser } = useContext(UserContext);

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
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </Box>
    </>
  );
}
    
export default Navbar