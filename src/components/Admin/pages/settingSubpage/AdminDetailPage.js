import React from 'react'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import { CardContent,  TextField, Stack, Box, Button } from '@mui/material'
import { useState } from "react";


const AdminDetailPage = () => {
  const [inputs, setInputs] = useState({});

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}))
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(inputs);
  }

  return (
    <Grid  container justifyContent= "center"   >
                <Grid    item md={6}  xs={12} sm={12}>
                    <Card >
                    <CardContent sx={{ textAlign: 'center', m: 3}}>
                      <p style={{fontWeight: "bold", fontSize: "16px"}}><p style={{fontWeight: "bold", fontSize: "16px"}}>Please complete the details below to <br/>
add a new Admin</p></p>
                    <Grid container spacing={10}>
  <Grid item md={6}  xs={12} sm={12} >
  <form onSubmit={handleSubmit}>
  <Box  
      component="form"
      sx={{
        '& .MuiTextField-root': { p: 2 },
      }}
      noValidate
      autoComplete="off"
    >
<TextField  InputProps={{ style: { fontSize: 13 } }}
        InputLabelProps={{ style: { fontSize: 20, color: '#3A3A3A',
         margin: '10px',fontWeight: 'bold'} }}  label="First Name" 
          id="standard-size-normal"  defaultValue="hazard" variant="standard"
          type="text" 
        name="username" 
        value={inputs.username || ""} 
        onChange={handleChange}  />
  <TextField  InputProps={{ style: { fontSize: 13 } }}
       InputLabelProps={{ style: { fontSize: 20, color: '#3A3A3A', margin: '10px',fontWeight: 'bold'} }}  label="Email Address "  id="standard-size-normal"  defaultValue="johnp@gmail.com" variant="standard"  />
  <TextField  InputProps={{ style: { fontSize: 13 } }}
        InputLabelProps={{ style: { fontSize: 20, color: '#3A3A3A', margin: '10px',fontWeight: 'bold'} }}  label="Contact Address "  id="standard-size-normal"  defaultValue="usd" variant="standard"  />
       
    </Box>
  
  </form>
  
  </Grid>
  <Grid item md={6}  xs={12} sm={12}>
  <Box  
    component="form"
    
      sx={{
        '& .MuiTextField-root': { p: 2, },      
      }}
      noValidate
      autoComplete="off"
    >
<TextField InputProps={{ style: { fontSize: 13 } }}  InputLabelProps={{ style: { fontSize: 20, color: '#3A3A3A', margin: '10px',fontWeight: 'bold'} }}
  label=" Last Name"  id="standard-size-normal"  defaultValue="peter" variant="standard"  />

  <TextField InputProps={{ style: { fontSize: 13 } }}  InputLabelProps={{ style: { fontSize: 20, color: '#3A3A3A', margin: '10px',fontWeight: 'bold' } }}
    label=" Phone Number"  id="standard-size-normal"  defaultValue="2744567" variant="standard"  />

  <TextField   InputProps={{ style: { fontSize: 13 } }}  InputLabelProps={{ style: { fontSize: 20, color: '#3A3A3A', margin: '10px',fontWeight: 'bold' } }}
        label=" Username"  id="standard-size-normal"  defaultValue=" john" variant="standard"   />
  
  <Stack direction="row" spacing={2}>
  <Button variant="outlined">Cancel</Button>
  <Button  style={{background: "#FF842B", margin: "5px"}} variant=""
  type="submit"> Save</Button>
       </Stack>

 
 
          
           
    </Box>
  
                   
  </Grid>
  
</Grid>
                  
                        </CardContent>
                    </Card>
                </Grid>
                   
               
            </Grid>
  )
}

export default AdminDetailPage