import { React, useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import { Avatar, CssBaseline, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { useContext } from 'react';
import UserContext from '../context/UserContext';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SupervisedUserCircleRoundedIcon from '@mui/icons-material/SupervisedUserCircleRounded';
import CasesRoundedIcon from '@mui/icons-material/CasesRounded';
import { Link, useNavigate, NavLink } from 'react-router-dom';
import SupervisedUserCircleRounded from '@mui/icons-material/SupervisedUserCircleRounded';
import LogoutIcon from '@mui/icons-material/Logout';
import Logout from '@mui/icons-material/Logout';
import TokenUserContext from '../context/TokenUserContext';

function Navbar(props) {

  const { window } = props;
  
  const { user, updateUser } = useContext(TokenUserContext);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate()

  //set the dependency on user, so that the nav updates depending on the user
  useEffect(() => { }, [user]);
  
  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
  }

  function stringToColor(string) {
    let hash = 0;
    let i;
  
    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
  
    let color = '#';
  
    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */
  
    return color;
  }

  const drawerWidth = 240;

  //open/close the drawer
  function handleDrawerToggle() {
    setDrawerOpen(!drawerOpen);
  }

  function handleLogoutClick(event) {
    event.preventDefault();
        updateUser(null);
        navigate('/login');
  }

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center', width: drawerWidth }}>
      <Typography variant='h6' sx={{ my: 2 }}>
        HR ADMIN
      </Typography>
      <Divider />
      <List sx={{height : '100%'}}>
        <ListItem disablePadding>
          <NavLink to='/' style={{flexGrow : 1}}>
            <ListItemButton>
              <ListItemIcon>
                <AccountCircleIcon sx={{mx : 2}} />
                <ListItemText primary={"My Info"}/>
              </ListItemIcon>
            </ListItemButton>
          </NavLink>
        </ListItem>
        {
          (user !== null && user !== undefined) &&
          <>
            {
              user.role === 0 && 
              <>
                <ListItem disablePadding>
                  <NavLink to='/employees' style={{flexGrow : 1}}>
                    <ListItemButton>
                      <ListItemIcon>
                        <SupervisedUserCircleRounded sx={{mx : 2}}/>
                        <ListItemText primary={"Employees"}/>
                      </ListItemIcon>
                    </ListItemButton>
                  </NavLink>
                </ListItem>
                <ListItem disablePadding style={{flexGrow: 1}}>
                  <NavLink to='/departments' style={{flexGrow : 1}}>
                    <ListItemButton>
                      <ListItemIcon>
                        <CasesRoundedIcon sx={{mx : 2}}/>
                        <ListItemText primary={"Departments"}/>
                      </ListItemIcon>
                    </ListItemButton>
                  </NavLink>
              </ListItem>
              </>
            }
          </>
        }
        <ListItem disablePadding>
            <ListItemButton onClick={handleLogoutClick}>
              <ListItemIcon>
              <Logout sx={{mx:2}} />
                <ListItemText primary={"Log Out"}/>
              </ListItemIcon>
            </ListItemButton>
        </ListItem>
      </List>
    </Box>
  )

  const container = window !== undefined ? () => window().document.body : undefined;
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position='static' component="nav">
        <Toolbar>
          {
            user &&
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
          }
          
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
          >
            HR Administration
          </Typography>
          {
            user && 
            (<div>
              <Avatar {...stringAvatar(`${user.firstName} ${user.lastName}`)} />
            </div>)
          }
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={drawerOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>)

}

export default Navbar