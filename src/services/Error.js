import React from 'react'
import { icons } from '../assets'
import Box from '@mui/material/Box';
import { Close } from "@mui/icons-material";
import { Link } from "react-router-dom";
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';


function Error() {
    
    return(
        <Box sx={{backgroundColor: 'rgba(5, 5, 5, 1)'}}>
            <Link to="/" style={{color: "white", position: 'absolute', left: '90%', top: '40px'}}>
                <Close />
            </Link>
            <Box sx={{color: "#fff", height: '100vh', display: 'flex', flexDirection: 'column', justifyContent:' center', alignItems: 'center'}}>
                
                <Typography sx={{color: "#FF842B", fontSize: '30px', mb: 4}}>Future Pay <sup>&#8226;</sup></Typography>
                <Box sx={{backgroundColor: "#fff"}}>
                    <Box sx={{display: 'flex', flexDirection: 'column', justifyContent:' center', alignItems: 'center' , p: 2}}>
                        <Box sx={{width: {xs: '200px', md: '500px', height: {xs: '200px', md: '500px'}}}}>
                        <img src={icons.img} alt="404" style={{width: 'inherit', height: 'inherit'}} />
                        </Box>
                        
                        <Typography sx={{color: '#232243', textAlign: 'center'}} variant="h6">Error 404 Page not found</Typography>
                        <Typography sx={{color: '#232243', textAlign: 'center'}}>Opps! The page you were looking for doesn’t exist.</Typography>
                        
                        <Box sx={{padding: 2, display: 'flex', alignItem: 'center', justifyContent: 'center',width: '100%'}}>
                            <Link style={{ textAlign: 'center'}} to="/">
                            <Button variant="contained" sx={{width: {xs: '100%', md: '50%'}}}>Back To Home</Button>
                            </Link>
                            
                        </Box>
                    </Box>
                </Box>
                
            
                {/* <img style={{weight: "500px", height: '500px'}} src={icons.EllipseTop} alt="Ecclise"/> */}
            </Box>
        </Box>
       
        
    )
}

export default Error