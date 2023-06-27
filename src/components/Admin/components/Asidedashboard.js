import React from "react";
import "../styles/transaction.css";
import { NavLink } from "react-router-dom";
import { Drawer, Toolbar, Divider, ListItem, ListItemText, ListItemAvatar, List, Box } from "@mui/material";
import { adminRoutes } from "../../../router/admin";



function Asidedashboard(props) {

  return (
    <Drawer variant="temporary" PaperProps={{sx:{background:'black'}}}  color='primary' open={props.open} onClose={props.close} >
      <Toolbar>

      </Toolbar>
      <Divider />
      <Box sx={{ width: '250px', p: '20px'}}>
        <List>
          {
            adminRoutes.map((item,index) => {
              return (
                <NavLink to={`/cash/${item.path}`} exact key={index}>
                  <ListItem key={item.path}>
                    <ListItemAvatar>
                      <img src={item.icon} alt={`${item.title}_icon`} />
                    </ListItemAvatar>
                    <ListItemText sx={{color:'#818181'}}> {item.title} </ListItemText>
                  </ListItem>
                </NavLink>
              )
            })
          }

        </List>
      </Box>
    </Drawer>
  );
}

export default Asidedashboard;
