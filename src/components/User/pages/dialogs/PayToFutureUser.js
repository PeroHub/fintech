import * as React from 'react';
import { useState} from 'react';
// import Avatar from '@mui/material/Avatar'
 import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import TextField from '@mui/material/TextField';
// import InputLabel from '@mui/material/InputLabel';
import { icons } from "../../../../assets/index"
import MenuItem from '@mui/material/MenuItem';



      
  
// import Pay from './Pay'     
const initialState = {
  email: '', 
  description: '', 
  amount: null, 
  currency: '',
}

export default function PayToFutureUser(props) {
 

  const [ controlValue, setControlValue ] = useState(initialState);
 
  
  
  console.log(controlValue)
    
  const handleSubmit = (event) => {
    console.log(event.currentTarget.name)
   
  }

  


  const handleChange = (event) => {
    setControlValue(prev => ({...prev, [event.target.name]: event.target.value}))
  };

  
    return(    
        <div>
           <Dialog
        open={props.open}
        onClose={props.close}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Card sx={12}>
            <CardContent sx={{ textAlign: 'center'}}>

                <img style={{marginBottom: "0.4rem"}} src={icons.moon} alt="moon"/>
                <p style={{fontWeight: "bold", color: "#818181", fontSize: "14px"}}>Please provide the details below to pay to<br/>a user with a Future pay account</p>
              

                                
                <Box  
                  component="form"
                  onSubmit={handleSubmit}
                  sx={{padding: {xs: "10px", md: "40px"}, background: "#EFEFEF80"}}
                  noValidate
                  autoComplete="off"
                >
                  <Grid container spacing={4}>
                    <Grid item xs={12} md={6}>
                      <Box>
                        <TextField fullWidth id="email" name='email' value={controlValue.email}  onChange={handleChange} label="Email Address" variant="standard" />
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Box >
                        <TextField fullWidth id="filled-basic" name='description' value={controlValue.description}  onChange={handleChange} label="Description" variant="standard" />
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Box>
                        <TextField fullWidth id="filled-basic" name='amount' value={controlValue.amount} onChange={handleChange} label="Amount" variant="standard" />
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Box>
                        <TextField
                                id="outlined-select-currency"
                                select
                                label="currency"
                                name='currency'
                                value={controlValue.currency}
                                onChange={handleChange}
                                variant="standard"
                                fullWidth
                              >
                                {Array.from(props.currency).map((option) => (
                                  <MenuItem key={option?._id} value={option?._id} >
                                    {option?.name}
                                  </MenuItem>
                                ))}
                              </TextField>
                      </Box>
                    </Grid>
                  </Grid>
                  <Box  style={{color: "#818181", fontSize: "14px"}}  sx={{ textAlign: 'center', mt: 2 }}>   
                    <p style={{color: "#E45757", fontSize: "12px"}}> Payment to a user with a Future pay account<br/>does not attract charges </p>
                    <Button  onSubmit={handleSubmit} sx={{px: 10}} variant="contained">
                      PAY 
                    </Button>
                  </Box>
                </Box>
                
                  
                
            </CardContent>
              
          </Card>
      </Dialog>
      </div>
    )
}  