import React from 'react';
import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Close from '@mui/icons-material/Close'
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import CircularProgress from '@mui/material/CircularProgress'


import AddCard from '../../cards/AddCard'

import { AccountManager } from '../../../../services/users';
import { WalletManager } from '../../../../services/wallet'
import { useAuth } from "../../../../contexts/AuthContext"


const accountManager = new AccountManager();
const walletManager = new WalletManager();


function Modal ({openWithdraw, closeWithdraw, Errorloader, loader}) {
    console.log(openWithdraw)
        // const [ withdrawDialog, setWithdrawDialog ] = useState(false);

        let content;
        // if there is no error run the second block of code
        if(!Errorloader){
            
            // if loading is not true show text
            if(!loader){
                content = 
                    <div style={{display: "flex", padding: "20px", justifyContent: "center", alignItems: "center", flexDirection: "column"}}>
                        <Typography >Your request has been sent, and is currently been processed.</Typography>
                        <Button sx={{mt: 2,  width: "50%"}} variant="contained" fullWidth onClick={closeWithdraw}>Ok</Button>
                    </div>
                
            }else {
                content = <div style={{textAlign: "center"}}><CircularProgress /></div>
            }
        }else {
            content =  <div style={{display: "flex", padding: "20px", justifyContent: "center", alignItems: "center", flexDirection: "column"}}>
            <Typography>Opps! an error occured please check your internet and try again</Typography>
            <Button sx={{mt: 2, width: "50%"}} variant="contained"  onClick={closeWithdraw}>Ok</Button>
        </div>
        }

        return (

            <div>
                <Dialog
                open={openWithdraw}
                onClose={closeWithdraw}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                >
                    <DialogContent>
                        {content}
                    </DialogContent>
                </Dialog>
            </div>
        )
}

const Walletwithdraw = ({close, open, WalletId}) => {

    const { currentUser } = useAuth();
    accountManager.init(currentUser);
    walletManager.init(currentUser);

    useEffect(() => {
        console.log("me")
        async function getAccount() {
            try{
                await accountManager.getAccounts((data) => {
                    setAccount(data)
                    
                })
                
            }catch(err) {
                console.log(err)
            }
        }

        getAccount()
    }, [])

   
    const [ account, setAccount ] = useState([])


    
    //withdrawal state and fuction
    const [ withdrawDialog, setWithdrawDialog ] = useState(false);
    const handleWithdrawDialog = () => {
        setWithdrawDialog(true)
    }

    //withdrawal loader state

    const [ loader, setLoader ] = useState(false)
    const [ Errorloader, setErrorLoader ] = useState(false)

    //amount inputed state and function
       const [ inputAmount, setInputAmount ] = useState(null)
       const handleInputAmount = (e) => {
           setInputAmount(e.target.value)
       }

   //smount selected to pass
       const [ accountSelected, setAccountSelected ] = useState(null)
      const handleAccountSelected = (e) => {
       setAccountSelected(e.target.value)
      }
   

    const [ card, setCard ] = useState(false)
    
    const handleCard = () => {
        setCard(true)
    }


    async function withdraw() {
        console.log("All good")
        const withdrawObject = {amount: inputAmount, wallet: WalletId, account: accountSelected}
        try {
            setLoader(true)
            await walletManager.withdrawFromWallet(withdrawObject).then(res => {
                // console.log(res)
               
            })
            setLoader(false)
            setErrorLoader(false)
            console.log("me")
        }catch(err) {
            console.log(err)
            setLoader(false)
            setErrorLoader(true)
            
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
        <Close onClick={close} sx={{position: "relative", left: "90%", top: "-10px", color: '#FF8A24'}}/>
        { account ? <Box  sx={{p:4}}>
                <Typography sx={{textAlign: "center", mb:4, color: "#67665E"}}>Please fill in your details to withdraw</Typography>
             <Grid container spacing={2} alignItem="center" justifyContent="center">
               
                 <Grid item xs={12} sm={12} md={12}>
                 <Typography sx={{color: "#67665E", mb: 2}}>Amount</Typography>
                    <TextField fullWidth onChange={handleInputAmount} type="number" id="outlined-basic"  variant="outlined" />      
                 </Grid>
                 
                <Grid item xs={12} sm={12} md={12}>
                    <Typography sx={{color: "#67665E"}}>Select Account to withdraw to</Typography>
                    <FormControl fullWidth sx={{mt:2}}>
                        <InputLabel id="demo-multiple-chip-label">Select account</InputLabel>
                        <Select onChange={handleAccountSelected} >
                            <MenuItem value="Deposit" onClick={handleCard} sx={{color: "#FF8A24"}}>Added Account</MenuItem>

                            { account.map((item, index) => (
                                <MenuItem key={index} value={item._id} >{item.recipientBank} -- {item.bankNumber}</MenuItem>
                            )) }
                            
                        </Select>
                    </FormControl>  
                 </Grid>
                 
                 <Grid item xs={12} sm={12} md={12}>
                    <Button 
                        fullWidth 
                        variant="contained" 
                        onClick={() => {
                            withdraw()
                            close()
                            handleWithdrawDialog()
                        }} 
                        >WIthdraw</Button>     
                 </Grid>
             </Grid>
            </Box> :  <div style={{textAlign: "center"}}><CircularProgress /></div>}
            
        </DialogContent>
        
       
    </Dialog >
        
    <Dialog open={card} onClose={() => setCard(false)}>
    <DialogContent>
            <AddCard />
        </DialogContent>
    </Dialog>

    <Modal 
        openWithdraw={withdrawDialog}
        closeWithdraw={() => setWithdrawDialog(false)}
        loader={loader}
        Errorloader={Errorloader}
    />


</div>
  );
};

export default Walletwithdraw;
