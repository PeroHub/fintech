import React from 'react'
import { icons } from '../assets'   
import { Link } from 'react-router-dom'
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import DialogContent from '@mui/material/DialogContent';
import CircularProgress from '@mui/material/CircularProgress';

export default function Alert(props) {
    let errorMessage
    if(props.loader){
        errorMessage = <CircularProgress color="inherit" />
    }else if(!props.pageError){
        errorMessage = <div style={{display: 'flex', flexDirection:'column', justifyContent: 'center', alignItems: 'center'}}> <img src={icons.alertSec} alt="alert" />
        <Typography sx={{mt: 2, mb: 2, color: "#FF842B"}}>Your payment has been received and is under review. Once verified, we'll notify you with payment details</Typography>
        <Link to="/user/transaction" style={{display: 'flex',justifyContent: 'center', alignItems: 'center'}}>
            <Button variant="contained">Ok</Button>
        </Link></div>
    }else  {
        errorMessage = <Typography sx={{textAlign:'center'}}> <span style={{fontWeight:600}}> Error </span> <br /> { props.pageError ?? "An error occur please try again"}</Typography>
        
    }

    
    return (
        <Dialog open={props.open} onClose={props.close}>
            <DialogContent sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', background: "#FFFCE1"}}>
            {errorMessage}
           
            </DialogContent>
        </Dialog>
     
    )
}