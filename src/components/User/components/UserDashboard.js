import React, { useEffect, useState } from "react";
import { Switch, Route, NavLink} from "react-router-dom";
import '../styles/userdash.css'

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { ListItemAvatar, Grid,Container } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import {icons } from "../../../assets"


import { userRoutes } from "../../../router/users";
import Close from "@mui/icons-material/Close";
import { useAuth } from "../../../contexts/AuthContext";


const drawerWidth = 240;

function ResponsiveDrawer(props) {
  
  const { window } = props;
  // console.log(window, 'home')

  const { currentUser } = useAuth()

  const [mobileOpen, setMobileOpen] = React.useState(false)

  const [title, setTitle] = useState('Convert')

  useEffect(() => {
    //On click the array of route is split into array with the first item remove
    const path = props?.location.pathname.split('/').pop()
    //Check that path is equal to userroute returned value
    const current = userRoutes.find((item) => item.path === path)
    //Updating state and setting default route to convert
    setTitle(current?.title ?? 'Convert')
  }, [props.location])


  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // const location = useLocation()
  // const {pathname } = location
  // const splitLocation = pathname.split("/")
  // console.log(splitLocation)
  // console.log(splitLocation[2])

  // const navLinkStyles = ({ isActive }) => {
  //   return {
  //     color: isActive ? "red" : "",
  //     fontWeight: isActive ? 'bold' : ""
  //   }
  // }

  const drawer = (
    <div className="drawer" style={{background: "#000000", outline: "1px solid red", minHeight: "100vh", padding: "0px 10px"}}>
      <Toolbar>
        <NavLink to={`/`} exact >
          <Typography variant="h5" sx={{ color: '#FF842B', flexGrow: 1,  fontWeight: 700 }}>
            FuturePay <sup>&#8226;</sup>
          </Typography>
        </NavLink>

        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { sm: 'none' } }}
        >
          <Close />
        </IconButton>

      </Toolbar>
      {
        userRoutes.map((item, index) => {
          // console.log(item)
          return (
            <>
            <NavLink to={`/user/${item.path}`} exact key={index}
            
            >
              <ListItem sx={{ pl: '30px', my: '10px' }} className=" hov title">
                <ListItemAvatar>
                  <img src={item.icon} alt={`${item.title}_icon`} className="  ima" />
                </ListItemAvatar>
                <ListItemText 
                  disableTypography 
                  
                  style={{fontWeight:'bold'}}
                  className=" titleHover"
                  primary={item.title} sx={{ color: '#ffF', fontWeight: 700 }} />
              </ListItem>
              {index % 3 === 0 && index > 1 ? <Divider component="" /> : null}
            </NavLink>
            </>
          )
        })
      }
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      {/* Top header */}
      <AppBar sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
        background: "#fff", color: "black", borderBottom: '1px solid #f5de06'
      }}
        elevation={0} position="fixed" >

        <Toolbar>
          <IconButton color="primary" aria-label="open drawer" edge="start" onClick={handleDrawerToggle} sx={{ mr: 2, display: { sm: 'none' } }} >
            <MenuIcon />
          </IconButton>

          <Grid alignItems="center" container>
            <Grid item xs={6} sm={6}>
              <Typography variant="h6" > {title} </Typography>
            </Grid>
            <Grid item xs={6} sm={6}>
              <Typography sx={{ textAlign: 'right' }}>{currentUser.email?.split('@', 1)[0]} </Typography>
            </Grid>

          </Grid>

        </Toolbar>
      </AppBar>

      {/* Left Sidebar */}
      <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }} aria-label="mailbox folders" >

        <Drawer
          container={container} variant="temporary" open={mobileOpen} onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true, }}
          sx={{ display: { xs: 'block', sm: 'none' }, '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }}}
          children={drawer} />

        <Drawer
          variant="permanent"
          sx={{ display: {xs: 'none', sm: 'block' }, '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }}}
          open children={drawer} />

      </Box>

      {/* Right Sidebar */}
      <Container maxWidth={false} component="main" sx={{  width: { sm: `calc(100% - ${drawerWidth}px)` } }} >
        <Toolbar />
        <Switch>
          {
            userRoutes.map((item, index) => {
              return <Route
                key={index}
                exact
                path={`/user/${item.path}`}
                render={(props) => {
                  return <>
                  <a
                      className="what-move"
                      href="whatsapp://send?text=Hello World!&phone=+2347083106814"
                    >
                    <img src={icons.correct} className="whatsapp" alt="whatsapp"/>
                  </a>
                  <item.component  {...props} />
                  </>
                }}
              />
            })
          }
        </Switch>
      </Container>
    </Box>
  );
}



export default ResponsiveDrawer;
