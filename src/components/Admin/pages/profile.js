import React from 'react'
import '../styles/transaction.css'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
// import Box from '@mui/material/Box';


function Profile() {
    return (
        <Grid container justifyContent= "center">
          
            <Grid   item md={6}  xs={11} sm={8}>
                    <Card  >
                    <CardContent sx={{ textAlign: 'center', m: 1}}>
                    <Grid  container spacing={2} >
                    <Grid     sx={{
          display: 'flex'}}   item md={6}  xs={12} sm={12}>
                        <img  style={{marginLeft: "2.9rem", padding: "2rem"}} src="https://res.cloudinary.com/dekbvdqnb/image/upload/v1644313910/Ellipse_14_cwf2ye.png"
                         alt="moon"/>
  <div sx={{ textAlign: 'center'}}>
      
 <h3 style={{fontSize: "16px"}}>John Peters</h3>
                       <p style={{fontSize: "13px"}}>johnp@gmail.com</p>
          </div>

                      
          
                    
                   </Grid>
                   <Grid    item md={6}  xs={12} sm={12}>
                       <h5 style={{ color: "blue", cursor: "pointer"}}>Edit Profile</h5>
                     
                      
                   </Grid>              
                   </Grid>

                   <Grid  container spacing={2}   >
                    <Grid    item md={6}  xs={12} sm={12}>
                     

                       <h4 style={{fontSize: "16px" ,fontWeight: "bold"}}>Mobile Number</h4>
                       <p style={{fontSize: "14px"}}>08054337851</p>
                        <h4 style={{fontSize: "16px", fontWeight: "bold"}}> Location</h4>
                       <p style={{fontSize: "14px"}}>uyo,Nigeria</p>
                    
                   </Grid>
                   <Grid    item md={6}  xs={12} sm={12}>
                     
                       <h4 style={{fontSize: "16px", fontWeight: "bold"}}> Transactions</h4>
                       <p style={{fontSize: "14px"}}>13</p>
                       <h4 style={{fontSize: "16px", fontWeight: "bold"}}> Title</h4>
                       <p style={{fontSize: "14px"}}>Administrator</p>
                      
                   </Grid>
                   </Grid>

    
                   
                        </CardContent>
                    </Card>
                </Grid>
               
        </Grid>
    )
}

export default Profile
