import React from 'react'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import { CardContent,  TextField, Box, Button } from '@mui/material'




const WebsiteDetailPage = () => {
  return (
    <Grid  container justifyContent= "center"   >
                <Grid    item md={7}  xs={12} sm={12}>
                    <Card >
                    <CardContent sx={{ textAlign: 'center', m: 3}}>
                    <Grid container spacing={20}>
  <Grid item md={6}  xs={12} sm={12} >
  <Box  
      component="form"
      sx={{
        '& .MuiTextField-root': { p: 3 },
      }}
      noValidate
      autoComplete="off"
    >
      
<TextField  InputProps={{ style: { fontSize: 13 } }}
        InputLabelProps={{ style: { fontSize: 20, color: '#3A3A3A', margin: '20px',fontWeight: 'bold'} }}  label="Website Tiltle"  id="standard-size-normal"  defaultValue="Futurepay" variant="standard"  />
  <TextField  InputProps={{ style: { fontSize: 13 } }}
       InputLabelProps={{ style: { fontSize: 20, color: '#3A3A3A', margin: '20px',fontWeight: 'bold'} }}  label="Contact Address"  id="standard-size-normal"  defaultValue="usd" variant="standard"  />
  <TextField  InputProps={{ style: { fontSize: 13 } }}
        InputLabelProps={{ style: { fontSize: 20, color: '#3A3A3A', margin: '20px',fontWeight: 'bold'} }}  label="Default Email"  id="standard-size-normal"  defaultValue="johnp@gmail.com" variant="standard"  />
         <TextField   InputProps={{ style: { fontSize: 13 } }}
       InputLabelProps={{ style: { fontSize: 20, color: '#3A3A3A', margin: '20px',fontWeight: 'bold'} }} label=" Support Email"  id="standard-size-normal"  defaultValue="xxxxxxx" variant="standard"  />
    </Box>
  
  </Grid>
  <Grid item md={6}  xs={12} sm={12}>
  <Box  
      component="form"
      sx={{
        '& .MuiTextField-root': { p: 3 },      
      }}
      noValidate
      autoComplete="off"
    >
<TextField InputProps={{ style: { fontSize: 13 } }}  InputLabelProps={{ style: { fontSize: 20, color: '#3A3A3A', margin: '20px',fontWeight: 'bold'} }}
  label="Default Languge"  id="standard-size-normal"  defaultValue="english" variant="standard"  />

  <TextField InputProps={{ style: { fontSize: 13 } }}  InputLabelProps={{ style: { fontSize: 20, color: '#3A3A3A', margin: '20px',fontWeight: 'bold' } }}
    label="Website Copyright"  id="standard-size-normal"  defaultValue="all right resereved" variant="standard"  />

  <TextField   InputProps={{ style: { fontSize: 13 } }}  InputLabelProps={{ style: { fontSize: 20, color: '#3A3A3A', margin: '20px',fontWeight: 'bold' } }}
        label="Contact Phone Number"  id="standard-size-normal"  defaultValue="08054337851" variant="standard"   />
  <Box sx={{mt: 3}}>
  <Button variant="outlined">Cancel</Button>
  <Button  style={{background: "#FF842B", margin: "5px"}} variant="">Save</Button>
  </Box>
 
           
    </Box>
  
                   
  </Grid>
  
</Grid>
                  
                        </CardContent>
                    </Card>
                </Grid>
                   
               
            </Grid>
  )
}

export default WebsiteDetailPage