import React, { useState, useEffect, useContext} from 'react'
import { AccountPageForm } from "./AccountPageForm";
import { Box, Grid, Card, CardContent, Dialog, DialogTitle, DialogContent } from "@mui/material";
// import InputResultCard from './InputResultCard'

//date
// import NigeriaBankData from "../cards/nigerianbanks"

// auth & APi
import { useAuth } from "../../../contexts/AuthContext"
import { AccountManager } from '../../../services/users';
import { CurrencyManager } from '../../../services/currency';

//component
import AccountLoader from '../cards/AccountLoader';
import { AccountAddedDetails } from '../cards/AccountAddedDetails';
import { DeleteAccountDetails } from '../cards/DeleteAccountDetails';
import { userInfoContext } from '../../App';

const accountManager = new AccountManager()
const currencyManager = new CurrencyManager()

export default function Accountpage() {
  const context = useContext(userInfoContext)
const [contextState, setContextState ] = useState('')
// context.currencies.then(res => {
//  setContextState(res)
// })
  // const [ bankData] = useState(NigeriaBankData)
  const [ createdAccount, setCreatedAccount ] = useState('')
  // const [ currencies, setCurrencies ] = useState('')
  const [ addAccountLoader, setAddAccountLoader ] = useState(false)
  const [ deletedAccountLoader ,setDeletedAccountLoader ] = useState(false)
  const [ loaderHomeAcct, setLoaderHomeAcct ] = useState(false)
  const [ accountAddedModal, setAccountAddedModal ] = useState(false)
  const [ deletAccount, setDeleAccount ] = useState(false)
  const [ accountDeleteModal, setAccountDeleteModal ] = useState(false)
  //getting index of account details clicked to delete
  const [ getIndex, setGetIndex ] = useState('')
   //getting index of account details clicked to delete
  const handleAccountAddedModal = () => {
    setAccountAddedModal(true)
  }

  const handleDeleteAcoount = () => {
    setDeleAccount(true)
  }

  useEffect(() => {
    const getCurrency = async () => {
      try {
        setLoaderHomeAcct(true)
     
       await accountManager.getAccounts(data => {
        setCreatedAccount(data)
        setLoaderHomeAcct(false)
       }) 
        
      } catch (error) {
        console.error(error)

        setLoaderHomeAcct(false)
      }
    }
 
    getCurrency()
  }, [])
 
  const createAccount = async (accountDetails) => {
     try {
       setAddAccountLoader(true)
       await accountManager.addAccount(accountDetails)
       .then((res) => {
         console.log(res)
         setCreatedAccount([...createdAccount, res])
         setAddAccountLoader(false)
       })
       
     } catch (error) {
       console.error(error)
       setAddAccountLoader(false)
     }
  }

  const  deleteCard = (index) => {
        setDeletedAccountLoader(true)
        accountManager.removeAccount(createdAccount[index]).catch((e)=>{
        console.log('account remove error:-->', e.message)
        setDeletedAccountLoader(false)
    }).then(()=>{
        const accounts = [...createdAccount]
        accounts.splice(index,1)
        setDeletedAccountLoader(false)
        setCreatedAccount(accounts)
       
    }) // handle error and loader ??await
}

  const [ show, setShow ] = useState(false)
  const handleShow = () => {
    setShow(!show)
  }

  const handleClose = () => {
    setShow(false)
  }



  const { currentUser }  = useAuth()
  accountManager.init(currentUser)

  return (
    <div >
       <Grid item justifyContent="center" container xs={12}>
                <Card sx={{ width: { xs: '100%', sm: "300px" }, height: '200px' }}>
                    <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }} onClick={handleShow}>
                        <svg width="24" height="24" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6 13h-5v5h-2v-5h-5v-2h5v-5h2v5h5v2z" /></svg>
                    </CardContent>

                    <Dialog open={show} onClose={handleClose}>
                        <DialogTitle closeButton>
                                <h3>Add a recipient </h3>
                                <p style={{ fontSize: '10px' }}>Kindly add a recipient account details</p>
                        </DialogTitle>
                        <DialogContent>
                          <AccountPageForm 
                            handleClose={handleClose} 
                            // bankData={context.bankName} 
                            addAccountLoader={addAccountLoader}
                            // currencies={contextState}
                            createAccount={createAccount}
                            setShow={setShow} 
                            from={"account"} 
                            handleAccountAddedModal={handleAccountAddedModal}/>
                        </DialogContent>
                    </Dialog>
                </Card>

            </Grid>
     
     <AccountAddedDetails
     createdAccount={createdAccount} 
     loaderHomeAcct={loaderHomeAcct}
     setGetIndex={setGetIndex}
     handleDeleteAcoount={handleDeleteAcoount}
     />


     <AccountLoader 
      open={accountAddedModal} 
      close={() => setAccountAddedModal(false)} 
      text={"Account Added Successfully"}
      added={true}
      addAccountLoader={addAccountLoader}
      />

      <DeleteAccountDetails 
        open={deletAccount}
        deleteCard={deleteCard}
        getIndex={getIndex}
        setAccountDeleteModal={setAccountDeleteModal}
        close={() => setDeleAccount(false)}
      />

{/* Acoount deleted modal */}
      <AccountLoader 
      open={accountDeleteModal} 
      close={() => setAccountDeleteModal(false)} 
      text={"Account Deleted Successfully"}
      addAccountLoader={deletedAccountLoader}
      />


{/* Acoount deleted modal */}
    </div>
  );
}
