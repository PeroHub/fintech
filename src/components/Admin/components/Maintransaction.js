import React, { useEffect, useState } from "react";
import Asidedashboard from "./Asidedashboard";
import { AppBar, IconButton, Typography, Toolbar, Avatar, Container } from "@mui/material";
import Pages from '../pages/index'
import MenuIcon from '@mui/icons-material/Menu';
import { adminRoutes } from '../../../router/admin'
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';



function Maintransaction(props) {

  const [drawerState, setDrawerState] = useState(false)
  const [title, setTitle] = useState('Dashboard')

  useEffect(() => {
    const path = props?.location.pathname.split('/').pop()
    const current = adminRoutes.find((item) => item.path === path)
    setTitle(current?.title ?? 'Dashboard')
  }, [props.location])


  return (
    <Container maxWidth={false} style={{ minHeight: '100vh', backgroundColor: '#e5e5e5' }}>

      <AppBar sx={{ bgcolor: 'transparent' }} enableColorOnDark elevation={0} position='relative'>
        <Toolbar>

          <IconButton onClick={() => setDrawerState(!drawerState)} edge="start" color="primary" aria-label="menu" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h4" color="black" sx={{ flexGrow: 1 }} component="div">
            {title}
          </Typography>
          <IconButton>
            <NotificationsIcon />
          </IconButton>
          <IconButton>
            <SettingsIcon />
          </IconButton>
          <Avatar >
            <AccountCircleIcon />
          </Avatar>
        </Toolbar> 
      </AppBar>

      <Asidedashboard open={drawerState} close={() => setDrawerState(!drawerState)} />
      <Container maxWidth={false} sx={{ py: '60px',  width: "100%"}}>
        <Pages />

      </Container>

    </Container>
  );
}

export default Maintransaction;
