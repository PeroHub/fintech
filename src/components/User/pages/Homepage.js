import React from "react";
// import HeaderAll from "../components/HeaderAll";
import '../styles/allmiddlepagesdesign.css'

// MUI
import CircularProgress from '@mui/material/CircularProgress'
import Card from '@mui/material/Card';
import { useState, useEffect } from "react";
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
// MUI

//Components
import Walletform from './dialogs/Walletform';
import Walletwithdraw from "./dialogs/Walletwithdraw";
import WalletCreatedSuccess from './dialogs/WalletCreatedSuccess'
import Walletdeposit from "./dialogs/Walletdeposit";
//Components


import { useAuth } from '../../../contexts/AuthContext';
import { WalletManager } from '../../../services/wallet';
import { CurrencyManager } from '../../../services/currency'


const walletManager = new WalletManager()
const currencyManager = new CurrencyManager()

export default function Homepage() {
 
  const [wallet, setWallet] = useState(false)

  const handleWallet = () => {
    setWallet(true)
  }

  //initializing deposit wallet state
  const [ depositToggle, setDepositToggle ] = useState(false)

  const handleDepositToggle = () => {
    setDepositToggle(true)
    
  }

  const [ withdrawToggle, setWithdrawToggle ] = useState(false)

  const handleWithdrawToggle = () => {
    setWithdrawToggle(true)
    
  }

    // Initializing wallet state
    const [ walletValue, setWalletValue ] = useState([])
    const [ walletExist, setWalletExist ] = useState(false)
    const [selectedCurrency, setSelectedCurrency] = useState(null)
    const [selectedCurrencyId, setSelectedCurrencyId] = useState(null)
    const [selectedWalletId, setSelectedWalletId] = useState(null)

    console.log(selectedCurrency)
    console.log(selectedCurrencyId)
    console.log(selectedWalletId)
   

    const [ walletLoader, setWalletLoader ] = useState(false)
    const [ walletError, setWalletError ] = useState(null)

  //   const [ addWallet, setAddWallet ] = useState([])
  // console.log("show" + addWallet)
    const [ currency, setCurrency ] = useState([])
    const [ currencyLoader, setCurrencyLoader ] = useState(false)
    // const [fromCurrency, setFromCurrency] = useState(null);
    // Initializing current user
    const { currentUser } = useAuth()

    
    useEffect(() => {
      const currencyFuc = async () => {
        try {
          setCurrencyLoader(true)
          await currencyManager.getAllCurrencies(data => {
            setCurrency(data)
            setCurrencyLoader(false)
          })
        } catch(e) {
          console.log(e)
        }
      }

      currencyFuc()
    }, [])
    

    // mounting wallet function on top of currentUser
    walletManager.init(currentUser)

    // Creating user wallet
    const handleWalletSubmit = async (data) => {
      setWalletLoader(false)
      setWalletError(null)
        try {
            setWalletLoader(true)
            setWalletError(null)

            //This checks and return a wallet value that has been created already
            let walletFind = walletValue.find((item) => item.currency._id === data)
              
              if(walletFind !== undefined) {

                // setting walletExit to true if walletFind return a value
                setWalletExist(true)
                // setting walletExit to true if walletFind return a value

                //setting loader to false
                setWalletLoader(false)
              }else {

                 // setting walletExit to false  before creating a wallet if a values was not return by walletFind
                setWalletExist(false)

                // Quering the db to create wallet
                  await walletManager.createWallet({currency:data}).then((resp)=>{
                  console.log('succ=?  ',resp)
                  setWalletValue([...walletValue, resp])
                  setWalletLoader(false)
                  setWalletError(null)
                  
                  
                 })
              }

           
        } catch(e) {
          setWalletError("An error occured! Please check your internet connection snd try again")
          setWalletLoader(false)
            console.log(`Couldn't create and account ${e}`)
        }
        
        
    }
    // Creating user wallet

    //Pulling user wallet
    useEffect(() => {
        const getUserAcct = async (data) => {
          console.log("I am working")
            try {
                const response = await walletManager.getUserWallet((data) => {   
                })
                //feeding setWalletValue state with return value
                setWalletValue(response)
                //feeding setWalletValue state with return value

            } catch(e) {
                console.log(`Error! couldn't get your wallet`)
            }

        }

        //invoking function
        getUserAcct()

    }, [])
     //Pulling user wallet


    //This function is handling the dialog when a wallet has been created
    const [ walletSuccess, setWalletSuccess ] = useState(false)

    const handleWalletSuccess = () => {
      setWalletSuccess(true)
    }

    //This function is handling the dialog when a wallet has been created

 
    // console.log(walletValue)
   
   
  return (
    <Box >
      {/* <HeaderAll header={header} /> */}
      <section >
      <Box sx={{width: "100%", m: "0 auto", mt: 4, mb: 4}}>
        <Card sx={{p: {xs: 2, md: 6}}}>
          <CardContent >
          <Box sx={{textAlign: "center"}}>
          <Typography sx={{fontSize: {xs: "18px", md: "20px"}, lineHeight: "20px", color: "#67665E", fontWeight: "bold"}}>Please complete your account verification</Typography>
          <Typography sx={{fontSize: {xs: "14px", md: "16px"}, color: "#67665E", mt: 2}}>You won't be able to perform any transaction on FuturePay without completing your KYC verification</Typography>
        </Box>
        <Box sx={{display: "flex", alignItems: "center", justifyContent: "center"}}>
          <Button variant="contained" sx={{mt: 4, fontSize: {xs: "12px", md: "14px"}}}>Complete Verification</Button>
        </Box>  
          </CardContent>
        </Card>
       
              
      </Box>
            
      </section>
      {currencyLoader ? <div style={{textAlign: "center"}}><CircularProgress  /></div> : <Card sx={{ mt: 2, pt: 2, width: "100%", margin: "0 auto"}}>
       <Box sx={{display: "flex", justifyContent: "center", alignItems: "center", p: 2}} onClick={handleWallet}>
          <Box sx={{p: 8, width: {xs: "100%", sm: "100%", md: "30%"}, display: "flex", flexDirection: "column", alignItems: "center",  justifyContent: "center", background: "#EFEFEF", boxShadow: "0 2px 5px #888888"}}>
              <AddIcon style={{color: "#35342C"}} />
              <Typography sx={{color: "#35342C", fontSize: "20px"}}>Add a wallet</Typography>
          </Box>
       </Box>
        <CardContent>
          
          <Typography sx={{color: "#67665E", mb: 4, fontSize:"20px", fontWeight: "bold"}}>Wallet</Typography>

              <Grid container spacing={2}>
              {walletValue.map((item, index) => (
                <Grid item xs={12} sm={12} md={4} justifyContent="center" key={item._id}>
                <Box sx={{p: "50px 10px", display: "flex", alignItems: "center", justifyContent: "space-between", boxShadow: "0 2px 5px #888888"}}>
                  <Box sx={{ p:2}}>
                  <Typography sx={{color: "#35342C", fontSize: "14px"}} >{item.currency["name"]}</Typography>
                  <Typography sx={{color: "#35342C", fontSize: "34px", fontWeight: "bold"}}>{item.balance}</Typography>
                  </Box>

                  <Box sx={{ p: 2, width: "50%"}}>
                    <FormControl fullWidth sx={{mt:2}}>
                        <InputLabel id="demo-multiple-chip-label">Transact</InputLabel>
                        <Select >
                            <MenuItem 
                              value="Deposit" 
                              onClick={() => {
                                handleDepositToggle()
                                setSelectedCurrency(item.currency["name"])
                                setSelectedCurrencyId(item.currency["_id"])
                                setSelectedWalletId(item["_id"])
                              }}>Deposit {item.currency["name"]}
                            </MenuItem>
                            <MenuItem 
                            value="Withdraw" 
                            onClick={() => {
                              handleWithdrawToggle()
                              setSelectedWalletId(item["_id"])
                            }}>Withdraw {item.currency["name"]}</MenuItem>
                        </Select>
                    </FormControl>   
                  </Box>
                </Box>

                <Walletdeposit 
                  open={depositToggle}
                  close={() => setDepositToggle(false)}
                  currencyType={selectedCurrency}
                  currencyId={selectedCurrencyId}
                  WalletId={selectedWalletId}
                  item={item}
                />

                <Walletwithdraw 
                  open={withdrawToggle}
                  close={() => setWithdrawToggle(false)}
                  WalletId={selectedWalletId}
                />
                </Grid>
                
              ))}
                
              </Grid>
        </CardContent>
      </Card>}
      

      <Walletform 
      open={wallet}
      close={() => setWallet(false)}
      handleWalletSubmit={handleWalletSubmit}
      walletValue={walletValue}
      currencyValue={currency}
      walletLoader={walletLoader}
      handleWalletSuccess={handleWalletSuccess}
      />

      <WalletCreatedSuccess
      open={walletSuccess}
      close={() => setWalletSuccess(false)}
      walletLoader={walletLoader}
      walletError={walletError}
      walletExist={walletExist}
      />

      
    </Box>
  );
}
