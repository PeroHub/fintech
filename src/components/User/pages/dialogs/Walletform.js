import React from 'react'
import { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Close from '@mui/icons-material/Close'
import DialogContent from '@mui/material/DialogContent';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

const Walletform = ({open, close, handleWalletSubmit, currencyValue, walletLoader, handleWalletSuccess, walletValue}) => {

const [currency, setCurrency] = useState('')

    const handleWallet = (event) => {
        setCurrency(event.target.value)
        
    }

    
    const handleSubmit = () => {
        if(currency !== ''){
            
            // //passing user select input to this function to evaluate it
            handleWalletSubmit(currency)
            // //passing user select input to this function to evaluate it

            // // Setting the value of state to back to empty string when add wallet btn is clicked
            setCurrency('')
            // // Setting the value of state to back to empty string when add wallet btn is clicked

            // //For closing modal
            close()
            // //For closing modal

            // //This trigers the success dialog
            handleWalletSuccess()
            
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
             
                </DialogContent>
                <Close onClick={close} sx={{position: "relative", left: "90%", color: '#FF8A24'}}/>
                    <Box  sx={{p:4}}>
                        <Typography sx={{textAlign: "center", mb:2, color: "#67665E"}}>Please complete the details below to add a new wallet.</Typography>
                     <Grid container spacing={2}>
                       
                         <Grid item xs={12} sm={6} md={6}>
                                <FormControl fullWidth sx={{mt:2}}>
                                    <InputLabel id="demo-multiple-chip-label">Wallet Type</InputLabel>
                                    <Select  onChange={handleWallet}>
                                        { currencyValue.map((item, index) => (
                                            <MenuItem key={index}  value={item._id}>{item.name}</MenuItem>
                                        )) }
                                       
                                    </Select>
                                </FormControl>       
                         </Grid>
                         
                       
                        <Grid item xs={12} sm={6} md={6}>
                            <Button onClick={handleSubmit} variant="contained" sx={{width: "100%", mt: 2, p:2}}>Add Wallet</Button>
                         </Grid>
                         

                     </Grid>
                    </Box>
               
        </Dialog>
        </div>
    )
}

export default  Walletform;
