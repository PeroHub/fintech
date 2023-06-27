import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress'
import DialogContent from '@mui/material/DialogContent';

const WalletCreatedSuccess = ({open, close, walletLoader, walletError, walletExist }) => {

    let error;

    //checking that wallet has exit already
    if(walletExist) {
        error = <div>
        <p style={{marginBottom: "20px", color: "red"}}>This wallet type exit already.</p>
        <Button onClick={close} variant="contained" sx={{width: "100%", mt: 2, p:2}}>Ok</Button>
    </div>

    //This line of code runs if wallet does not exit
    }else {

        if(walletError !== null && walletLoader === false){
            error = <div>
                <p style={{marginBottom: "20px"}}>An error occured Please check your internet connection and try again.</p>
                <Button onClick={close} variant="contained" sx={{width: "100%", mt: 2, p:2}}>Ok</Button>
            </div>
        }else if(walletError == null && walletLoader === true) {
            error = <div style={{textAlign: "center"}}><CircularProgress  /></div>
        }else if(walletError == null && walletLoader === false){
            error = <div>
                <Typography sx={{textAlign: "center", mb:2, color: "#67665E"}}>Your wallet has been created successfully.</Typography>
                <Button onClick={close} variant="contained" sx={{width: "100%", mt: 2, p:2}}>Ok</Button>
            </div>
        }
    
    }
    
  return (
    <div>
        <Dialog
            open={open}
            onClose={close}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            >
                <DialogContent>
                    {error}
                </DialogContent>
                    
               
        </Dialog>
    </div>
  )
};

export default WalletCreatedSuccess;
