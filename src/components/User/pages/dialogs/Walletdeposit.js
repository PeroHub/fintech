import React from 'react';
import { useState } from 'react';
// import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Close from '@mui/icons-material/Close'
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';

import { useAuth} from '../../../../contexts/AuthContext'
import FluterWaveWalletPayment from '../../components/FluterWaveWalletPayment'

const Walletdeposit = ({open, close, currencyType, currencyId, WalletId, item}) => {


    const { currentUser } = useAuth();

    let email = currentUser?.email
    let fullName = currentUser?.fullname

    const [ depositAmount, setDepositAmount] = useState()
    let handleDeposit = (e) => {
        setDepositAmount(e.target.value)
    }

    console.log(depositAmount)
   

  
    

  return (
    <div>
    <Dialog
    open={open}
    onClose={close}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
    >
        <DialogContent>
     
        </DialogContent>
        <Close onClick={close} sx={{position: "relative", left: "90%", top: "-10px", color: '#FF8A24'}}/>
            <Box  sx={{p:4}}>
                <Typography sx={{textAlign: "center", mb:4, color: "#67665E"}}>Please fill in the amount to deposit</Typography>
             <Grid container spacing={2} alignItem="center" justifyContent="center">
               
                 <Grid item xs={12} sm={6} md={6} >
                 <TextField fullWidth type="number"  id="outlined-basic" onChange={handleDeposit} variant="outlined" />
                        
                 </Grid>
                 
               
                <Grid item xs={12} sm={6} md={6}>
                    {/* f */}
                    <FluterWaveWalletPayment userEmail={email} UserName={fullName} WalletId={WalletId} currencyId={currencyId} amount={depositAmount} fromCurrency={currencyType} text={"Deposit"} close={close} />
                 </Grid>
                 

             </Grid>
            </Box>
       
</Dialog>
</div>
  );
};

export default Walletdeposit;
