import React from 'react'
import {useHistory} from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';





export  default function AccountLoader ({open, close, addAccountLoader, text, added}) {
  const history = useHistory();
  const redirect = () => {

    history.push('/user')
  }

    return (
      <Dialog
          open={open}
          onClose={close}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent >
              {addAccountLoader ? <CircularProgress /> :  
              <Box>
                <DialogContentText id="alert-dialog-description" sx={{color: "green"}}>
                  {text}
                </DialogContentText> 
                  <Box sx={{ textAlign: "center", padding: "10px"}}>
                    {added ? <Button variant="contained" onClick={redirect}>Continue to conversion</Button>: <Button variant="contained" onClick={close}>Ok</Button>}
                
                </Box>
              </Box>}
           
          </DialogContent>
          
        </Dialog>
    )
  }