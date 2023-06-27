import React from 'react'
import { useState} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box'
import { icons } from "../../../../assets/index"

import MenuItem from '@mui/material/MenuItem';


const initialState = {
  email: '', 
  description: '', 
  amount: null, 
  currency: '',
  country: '',
  bankName: '',
  accountName: '',
}

export const PayToUserOutside = (props) => {

  const [ controlValue, setControlValue ] = useState(initialState)
  console.log(controlValue)
    const [ value, setValue ] = useState('');

  const handleChange = (event) => {
    setValue(event.target.value);
    setControlValue(prev => ({...prev, [event.target.name] : event.target.value }))
  };

  const [countrySelected, setCountrySelected] = useState('')
 

  const handleCountry = (event) => {
    setCountrySelected(event.target.value)
  }
    return (
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
                <p style={{fontWeight: "bold", color: "#818181", fontSize: "14px"}}>Please provide the details below to pay to<br/>user outside the country</p>
              

                                
                <Box  
                  component="form"
                  sx={{padding: {xs: "10px", md: "40px"}, background: "#EFEFEF80"}}
                  noValidate
                  autoComplete="off"
                >
                  <Grid container spacing={4}>
                    <Grid item xs={12} md={6}>
                      <Box>
                        <TextField 
                          fullWidth 
                          id="email" 
                          type="email" 
                          name="email"
                          value={controlValue.email} 
                          onChange={handleChange} 
                          required 
                          label="Email Address" 
                          variant="standard" 
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Box >
                        <TextField 
                          fullWidth 
                          id="amount" 
                          type="amount" 
                          name="amount"
                          value={controlValue.amount} 
                          onChange={handleChange} 
                          required 
                          label="Amount" 
                          variant="standard" 
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Box>
                        <TextField fullWidth id="charges" label="Charges" variant="standard" />
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Box>
                        <TextField
                                id="outlined-select-currency"
                                select
                                label="Country"
                                name="country"
                                required
                                value={controlValue.country}
                                onChange={handleChange}
                                variant="standard"
                                fullWidth
                              >
                                {props.country.map((option) => (
                                  <MenuItem key={option} value={option} >
                                    {option}
                                  </MenuItem>
                                ))}
                              </TextField>
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Box>
                        <TextField
                                id="outlined-select-currency"
                                select
                                label="Currency"
                                name='currency'
                                required
                                value={value}
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
                    <Grid item xs={12} md={6}>
                      <Box>
                        <TextField 
                          fullWidth 
                          id="description" 
                          type="text" 
                          name='description' 
                          onChange={handleChange}
                          value={controlValue.description} 
                          label="Description" 
                          variant="standard" 
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Box>
                        <TextField 
                          fullWidth 
                          id="Bank Name" 
                          type="text" 
                          name="bankName"
                          value={controlValue.bankName} 
                          onChange={handleChange} 
                          required label="Bank Name" 
                          variant="standard" 
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Box>
                        <TextField 
                          fullWidth 
                          id="account name" 
                          type="text" 
                          name='accountName' 
                          onChange={handleChange} 
                          required 
                          label="Account Name" 
                          variant="standard" 
                        />
                      </Box>
                    </Grid>
                  </Grid>
                
                </Box>
                
                  <Box  style={{color: "#818181", fontSize: "14px"}}  sx={{ textAlign: 'center', mt: 2 }}>   
                    <p style={{color: "#E45757", fontSize: "12px"}}> Payment to user's outside the country<br/>attract charges </p>
                    <Button onClick={props.close} sx={{px: 10}} variant="contained">
                      PAY 
                    </Button>
                  </Box>
                
            </CardContent>
              
          </Card>
      </Dialog>
      </div>
    )
}
