import React from "react";
// import HeaderAll from "../components/HeaderAll";
import { icons } from "../../../assets"
import { useState } from "react";
// import { useHistory } from "react-router-dom";
import PopUpload from "./PopUpload";
// import { Spinner } from 'react-bootstrap'
import CircularProgress from '@mui/material/CircularProgress'
// import { FaBars, } from "react-icons/fa";
import { AccountManager } from "../../../services/users";
import { useEffect } from "react";
//import { exchangeValue } from "../../../services/transactions";
import { useAuth } from "../../../contexts/AuthContext";
import { TransactionManager } from "../../../services/transactions";
// import { Link } from "react-router-dom";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import DialogContent from '@mui/material/DialogContent';
import Dialog from '@mui/material/Dialog';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
// import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
// import { Dialog, DialogTitle, DialogContent } from '@mui/material'


// import AddCard from '../cards/AddCard'
// import AccountaddedLoader from '../cards/AccountaddedLoader'
// import FluterwavePayment from '../components/FluterwavePayment'

import { CurrencyManager } from "../../../services/currency";
import PaymentConfirmationDialog from "../components/PaymentConfirmation";
import PayToAccountPage from "../components/PayToAccount";
import { AccountPageForm } from "./AccountPageForm";
import { GetBankCode, GetPayoneerCode } from "../../../api/confirmationCode"
// import AddCard from "../cards/AddCard";

import Alert from "../../../services/Alert"
// import { userInfoContext } from "../../App";


// const upload = {
//   position: "absolute",
//   left: "35%",
//   transition: "500ms",
// };

// const uploadStick = {
//   position: "absolute",
//   right: "-40%",
// };



const accountManager = new AccountManager();
const transactionManager = new TransactionManager();
const currencyManager = new CurrencyManager();

export default function Convertpage() {
  //initializing context and updating the state
// const context = useContext(userInfoContext)
// const [contextState, setContextState ] = useState('')
// context.currencies.then(res => {
//  setContextState(res)
// })

  const { currentUser } = useAuth();

  accountManager.init(currentUser);
  transactionManager.init(currentUser);

  //Directing a user to the account section on account clicked
  // const history = useHistory()

  // function handleClick() {
  //   history.push("/user/account");
  // }
  //Directing a user to the account section on account clicked

  const [account, setAccount] = useState([]);
  const [payAccount, setPayAccount] = useState({});
  // console.log(payAccount.type)
  const [currencies, setCurrencies] = useState([]);
  // const [accountDialog, setAccountDialog] = useState(false)
  const [confirmationDialog, setConfirmationDialog] = useState(false)

  let confirmationText
  const handleConfirmationDialog = () => {
    if(accountData && payment && amount >= miniAmount && amount <= maxAmount){
      setConfirmationDialog(true)
    }
    
  }

  const handleRequireFields = () => {
    if(amount === 0 && payment === null && accountData === null){
      confirmationText = "This field is empty"
    }
  }

  // Confirm payment pop-up logic
  const [PayToAccount, setPayToAccount] = useState(false)

  const handlePayToAccount = () => {
    setPayToAccount(true)
  }

  // Confirm payment pop-up logic

  // Upload payment pop-up logic
  const [uploadFile, setUploadFile] = useState(false)
  // const handleUploadFile = () => {
  //   setUploadFile(true)
  // }
  // Upload payment pop-up logic


  const [baseCurrency, setBaseCurrency] = useState(null);
  const [fromCurrency, setFromCurrency] = useState(null);
  // console.log(fromCurrency.name)
  const [toCurrency, setToCurrency] = useState(null);
  const [exchangeRate, setExchangeRate] = useState(null);

  const [load, setLoad] = useState(false)
  const [paymentAccountLoader, setPaymentAccountLoader] = useState(false)

  useEffect(() => {
    const setDefault = async () => {
      try {
        await accountManager.getAccounts((data) => { setAccount(data); })
        await currencyManager.getCurrencies((data) => {
          setCurrencies(data)
          setFromCurrency(data[0])
        })
        await currencyManager.getBaseCurrency((data) => {
          setBaseCurrency(data)
          setToCurrency(data)
        })
      } catch (e) {
        // console.log(e.message);
      }
      setLoad(true)
    }

    setDefault()
  }, []);


  //Getting confirmation code
  const [ desCode, setDesCode ] = useState([])
  useEffect(() => {
    const getCode = async() => {
  
        await GetBankCode().then(res => {
          // console.log(res.data)
          setDesCode(res.data)
        })
      
    }
    getCode()
  }, [payAccount])
  //Getting confirmation code
 
// This is creating an account when (click to add act button is cliked)
  const createAccount = async (accountDetails) => {
    try {
      await accountManager.addAccount(accountDetails)
      .then((res) => {
        setAccount([...account, res])
      })
      
    } catch (error) {
      console.error(error)
    }
 }

 // This is creating an account when (click to add act button is cliked)




  // Animation function
  const [object, setObject] = useState([]);

  //Generating confirmation code
  const confirmationCode = Math.floor(1000 + Math.random() * 9000);

  const handleSubmit = async () => {
    //const value = await transactionManager.createTransaction({amount, accountData, payment})
   
    const gross = amount * exchangeRate
    const charge = Number(payAccount?.charge) + Number(payAccount?.futureCharge)
    const amountToReceive = gross - (gross * charge)
    setObject({ amount, toReceive: amountToReceive, account: accountData, from: fromCurrency._id, to: baseCurrency._id, paymentAccount:payAccount._id, payment:payAccount.type, confirmation_code: confirmationCode  });
  };

  // Using form and accountData state to render the continue button

  // Payment mode state and fuctions
  const [payment, setPayment] = useState(null);

  const paymentMode = (event) => {
    setPayment(event.target.value);
  };


  useEffect(() => {
    if (fromCurrency == null) return
    setPaymentAccountLoader(true)
    accountManager.getPaymentAccount(payment, fromCurrency, (data) => {
      setPayAccount(data)
    }).catch((e) => {
      // display error
      // console.log(e)
    }).finally(() => {
      setPaymentAccountLoader(false)
    })
  }, [fromCurrency, payment])
  // Payment mode state and fuctions

  // codes for grabing the dollar value inputed on the convertpage
  const [amount, setAmount] = useState(0);

  // Checking if a user enters a value greater than minimun or maxinum amount
  const maxAmount = 5000;
  const miniAmount = 50;
  let checkAmountEntered;
  if(amount === 0){
    checkAmountEntered = <Typography></Typography>
  }else if (amount > maxAmount) {
    checkAmountEntered = <Typography sx={{ color: '#FF8A24', position: "absolute" }}>Maximum amount to enter is 5000</Typography>
  } else if (amount < miniAmount) {
    checkAmountEntered = <Typography sx={{ color: '#FF8A24', position: "absolute" }}>Minimum amount to enter is 50</Typography>
  }
  // Checking if a user enters a value greater than minimun or maxinum amount

  let inputValue = amount;
  // N/B exchangeValue value is comming from transaction file inside services folder
  //let dollarValue = exchangeValue;
  let dollarValue = exchangeRate;

  let result = (dollarValue * inputValue);

  useEffect(() => {
    const eRate = (baseCurrency?.toBase / toCurrency?.toBase) / (baseCurrency?.toBase / fromCurrency?.toBase)
    setExchangeRate(eRate)
  }, [fromCurrency, toCurrency, baseCurrency])


  // let handleChange = (event) => {
  //     setForm(event.target.value)
  //     btnChange()
  // }
  // codes for grabing the dollar value inputed on the convertpage

  // Grabing and sending event values from option to stage
  const [accountData, setAccountData] = useState(null);
  const updateAccount = (event) => {
    const index = account.findIndex(
      (element) => element.recipientBank === event.target.value
    );
    const bank = index >= 0 ? account[index] : null;
    setAccountData(bank?._id);
  };


  // const displayAccountDialog = (e) => {
  //   e.preventDefault()
  //   setAccountDialog(true)
  // }

   // notification loader and message state and functions
  //  const [accountLoader, setAccountLoader] = useState(false)
   
  //  const [accountLoaderState, setAccountLoaderState] = useState(false)

   // notification loader and message state and functions

  // const addNewAccount = async (detail) => {
  //   await accountManager.addAccount(detail).catch((e) => {
  //     console.log(e);
  //     setAccountLoaderState(false)
  //   }).then((data) => {
  //     setAccount([...account,data])
  // setAccountLoaderState(true)
  //   })
  //   setState({ details: [...state.details, detail]})
  // }

 
    


  //refactor company's account details

  const [alert, setAlert] = useState(false)

  const handleAlert = () => {
    setAlert(true)
  }
  const handleCloseAlert = () => {

    setAlert(false)
  }

  // Taking user back to account page when account details has not been selected
  // const inputfuc = () => {
  //   window.location.href = "/user/account"
  // }
  // Taking user back to account page when account details has not been selected

  // INTEGRATING FLUTERWAVE PAYMENT GATEWAY
  //  fluter wave required values
  const fluterWave = {
    amount: amount,
    userEmail: currentUser?.email,
    userName: currentUser?.fullName,
    fromCurrency: fromCurrency?.name
  }
  

  const [loading, setLoading] = useState(false)

  const [error, setError] = useState(null)

  // console.log("this is page error" + error)



//Account page state modal and function
const [show, setShow] = useState(false)
const handleAccountClose = () => setShow(false)
const handleAccountShow = () => setShow(true)



  // Grabing and sending event values from option field to state
  return (

    <div className="main-convert">
      {load ? <Box component="form" sx={{ width: { xs: '100%', sm: '100%', md: '80%' }, height: '100%', mx: "auto", mt: 10 }}>
        <Card sx={{ boxShadow: "0px 4px 26px rgba(100, 100, 100, 0.15)", height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            <Grid container spacing={2}>
              <Grid item  xs={12} sm={12} md={5.5}>
                <Box sx={{ boxShadow: "0px 4px 26px rgba(100, 100, 100, 0.15)", p: 2,  width: {xs: '100%'}, mb: 2}}>
                  <Typography sx={{ mb: 2, color: '#C4C4C4' }} className="">What you will send</Typography>

                  <Grid item sx={{ display: 'flex', background: 'rgba(239, 239, 239, 0.5)', p: 2 }}>
                    <TextField
                      required
                      label="Required"
                      placeholder="0.00"
                      onChange={(event) => {
                        setAmount(event.target.value);
                      }}
                      sx={{ background: 'rgba(239, 239, 239, 0.5)', width: '100%' }}
                    />
                    
                      <Select defaultValue={fromCurrency._id} onChange={(e) => { setFromCurrency(currencies.find((item) => item._id === e.target.value)) }} >
                        {
                          Array.from(currencies).map((item, index) => {
                            return (
                              <MenuItem key={index} value={item._id} > {item.name} </MenuItem>
                            )
                          })
                        }
                      </Select>

                    
                  </Grid>
                  {checkAmountEntered}
                  {confirmationText}
                  <Typography sx={{ mt: 4, color: '#C4C4C4' }}>Recipient Bank account</Typography>
                  <FormControl sx={{ width: { xs: '100%' } }}>
                    <Select onChange={updateAccount} variant="standard">
                      {
                        <MenuItem onClick={handleAccountShow} > Click to add account </MenuItem>
                      }
                      {account.map((item, index) => {
                        return (
                          <MenuItem key={index} value={item.recipientBank}>
                            {" "}
                            {item.recipientBank} -- {item.bankNumber}{" "}
                          </MenuItem>
                        )
                      })}

                    </Select>
                  </FormControl>
                </Box>
              </Grid>
              <Grid item sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: {xs: 2} }} xs={12} md={1} >
                <img style={{ width: '70px', height: '70px', marginTop: '-35px' }} src={icons.transfer} alt="transfer" />
              </Grid>
              <Grid item  xs={12} sm={12} md={5.5}>
                <Box sx={{ boxShadow: "0px 4px 26px rgba(100, 100, 100, 0.15)", p: 2 }}>
                  <Typography sx={{ mb: 2, color: '#C4C4C4' }}>What you will get</Typography>
                  <Grid item sx={{ display: 'flex', background: 'rgba(239, 239, 239, 0.5)', p: 2 }}>
                    <TextField
                      id="outlined-textarea"
                      placeholder="0.00"
                      value={result.toLocaleString('en-Us')}
                      sx={{ background: 'rgba(239, 239, 239, 0.5)', width: '100%' }}
                    />
                    
                      <Select defaultValue={baseCurrency._id} >
                        {
                          [baseCurrency].map((item, index) => {
                            return (
                              <MenuItem key={index} value={item._id} > {item.name} </MenuItem>
                            )
                          })
                        }
                      </Select>

                    
                  </Grid>

                  <Typography sx={{ mt: 4, color: '#C4C4C4' }}>Payment Mode</Typography>
                  <FormControl sx={{ width: { xs: '100%' } }}>
                    <Select onChange={paymentMode} variant="standard">
                      <MenuItem value='web'>Payoneer</MenuItem>
                      <MenuItem value='bank'>Bank Transfer</MenuItem>
                      <MenuItem value='card'>
                        Pay with Card
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Grid>

            </Grid>
            <Button   
              variant="contained" 
              onClick={() => {
                handleConfirmationDialog()
                handleRequireFields()
                }}  
              sx={{ p: 2, width: { xs: '100%', sm: '50%', md: '20%' } }}>Continue</Button>
          </CardContent>
        </Card>
      </Box> : <div style={{ textAlign: "center", marginTop: "40px" }}><CircularProgress   /></div>}


      {/* <Dialog open={accountDialog} onClose={() => setAccountDialog(false)}>
        <DialogTitle closeButton>
          <h3>Add a recipient </h3>
          <p style={{ fontSize: '10px' }}>Kindly add a recipient account details</p>
        </DialogTitle>
        <DialogContent>
          <AddCard />
        </DialogContent>
      </Dialog> */}

{/* notification loader and message when account is added */}
      {/* <AccountaddedLoader
        open={accountLoader}
        close={() => setAccountLoader(false)}
        isAccountadded={addNewAccount}
        loaderState={accountLoaderState}
       /> */}

      <PaymentConfirmationDialog
        close={() => setConfirmationDialog(false)}
        loading={paymentAccountLoader}
        open={confirmationDialog}
        fromCurrency={fromCurrency}
        toCurrency={toCurrency}
        eRate={exchangeRate}
        account={payAccount}
        // passing fluter wave required value to the component
        fluterWaveValue={fluterWave}
        // passing fluter wave required value to the component
        amount={amount}
        continue={() => {
          setConfirmationDialog(false)
          handleSubmit()
          handlePayToAccount()
        }}
      />

      {/* <FluterwavePayment {...fluterWave} /> */}

      <PayToAccountPage
        close={() => setPayToAccount(false)}
        amount={amount}
        paymentAccountLoader={paymentAccountLoader}
        fromCurrency={fromCurrency}
        data={object}
        payAccount={payAccount}
        confirmationCode={desCode}
        open={PayToAccount}
        setPayToAccount={setPayToAccount}
        handleSubmit={handleSubmit}
        load={setLoading}
        pageError={setError}
        handleAlert={handleAlert}
        // openAlert={() => setAlert(true)}
        confirmPayment={() => {
          setPayToAccount(false)
          handleSubmit()
          handleAlert()
          // handleUploadFile()
        }}
      />




      <PopUpload
        close={() => setUploadFile(false)}
        data={object}
        open={uploadFile}
        load={setLoading}
        pageError={setError}
        openAlert={() => setAlert(true)}
        upload={() => setUploadFile(false)}
      />

      <Alert
        open={alert}
        pageError={error}
        close={handleCloseAlert}
        loader={loading}
        
      />

      <Dialog open={show} onClose={handleAccountClose}>
                       
        <DialogContent>
        <AccountPageForm handleAccountClose={handleAccountClose}  from={"convert"} createAccount={createAccount} />
        {/* <Account /> */}
        </DialogContent>
    </Dialog>



    </div>



  )

  // return (
  //   <div className="convert">
  //     {/* <HeaderAll header={header} /> */}

  //     {/* Ensuring that the user acct details has been loaded before showing details */}
  //     { load ? <div className="carb">
  //       {/* <FaBars /> */}
  //       <div className="send">
  //         <p>What you send</p>
  //         <div className="middle">
  //           <div className="figure">
  //             <input
  //               onChange={(event) => {
  //                 setForm(event.target.value);
  //               }}
  //               type="text"
  //               placeholder="0.00"
  //               required
  //             ></input>
  //           </div>
  //           <div className="dollar">
  //             <select id="standard-select">
  //               <option value="Option 1">$</option>
  //             </select>
  //           </div>
  //         </div>
  //         <div className="drop">
  //           <p>Recipient Bank Account</p>

  //           <select
  //             onChange={updateAccount}
  //             name="account"
  //             id="standard-select"
  //             required
  //           >

  //             <option value="select">--Select-- </option>
  //             <option onClick={inputfuc} style={{color: "red"}}>Click To Add Account</option>

  //             {account.map((item) => {

  //               return (
  //                 <option value={item.recipientBank}>
  //                   {" "}
  //                   {item.recipientBank} -- {item.bankNumber}{" "}
  //                 </option>

  //               );

  //             })}
  //           </select>
  //         </div>
  //         <hr></hr>
  //       </div>
  //       <img className="transfer" src={icons.transfer} alt="transfer" />
  //       <div className="send">
  //         <p>What you will get</p>
  //         <div className="middle">
  //           <div className="figure">
  //             <input value={result} type="text" placeholder="0.00"></input>
  //           </div>
  //           <div className="dollar">
  //             <select id="standard-select">
  //               <option value="Option 1">N</option>
  //             </select>
  //           </div>
  //         </div>
  //         <div className="drop">
  //           <p>Payment Mode</p>
  //           <select id="standard-select" onChange={paymentMode}>
  //             <option value="null">--Select--</option>
  //             <option value="Bank Transfer">Bank Transfer</option>
  //           </select>
  //         </div>
  //         <hr></hr>
  //         {/* Render button here */}
  //         {renderBtn}
  //         {/* Render button here */}

  //       </div>

  //     </div> : <Spinner style={{position: "relative", top: "50px"}} animation="border" className="spinner"/>}

  //     {/* popup structure field */}
  //     <div className="popup" style={pop ? hide : show}>
  //       <div className="color" style={toggle ? swit : stick}>
  //         <div className="clear-con">
  //           <ClearIcon className="clear" onClick={reverse}></ClearIcon>
  //         <div className="details">
  //           <p>Send the amount shown to the banking details below</p>
  //           <p>Account Number: {bankNumber}</p>
  //         </div>
  //         <div className="amount">
  //         </div>
  //           <p>Payment Amount</p>
  //         <div className="danger">
  //           <p>{amount}</p>
  //             After Initiating a transfer, screenshot the evident and click on
  //         </div>
  //           </p>
  //           <p>Account Name: {accountName}</p>
  //           <p>Bank: {recipientBank}</p>
  //           <div style={cursor} className="button" onClick={ani}>
  //           <p>City: {city}</p>
  //           </div>

  //       </div>
  //           <p>
  //         style={toggle ? upload : uploadStick}
  //             Confirm payment to upload your proof for verification
  //         reverse={reverse}
  //         </div>
  //     </div>
  //         <div className="but">
  //     {/* End popup structure field */}
  //             Confirm payment
  // );
  //         </div>
  //       <PopUpload
  //         data={object}
  //       />

  //   </div>
}