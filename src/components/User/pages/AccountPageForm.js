// import { Box, TextField } from '@mui/material'
import React, { useContext } from 'react'
import { Form, Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { userInfoContext } from '../../App';
// import { currency } from '../../currencyFormDb';

//date
// import NigeriaBankData from "../cards/nigerianbanks"

// auth & APi
// import { useAuth } from "../../../contexts/AuthContext"
// import { AccountManager } from '../../../services/users';
// import { CurrencyManager } from '../../../services/currency';

//component
// import AccountaddedLoader from '../cards/AccountaddedLoader';



// const accountManager = new AccountManager()
// const currencyManager = new CurrencyManager()

export const AccountPageForm = (
  { bankData, 
    // currencies,
    addAccountLoader, 
    from, handleClose, 
    handleAccountClose,
    createAccount, 
    handleAccountAddedModal
  }) => {

    const {currencies,bankName} = useContext(userInfoContext)
    console.log(currencies)
    // const {currency}
  // console.log( context.currencies)
  // currencies = []

  
 
   

  // const [ bankData] = useState(NigeriaBankData)
  // const [ currencies, setCurrencies ] = useState('')
  // const [ addAccountLoader, setAddAccountLoader ] = useState('rest')
  // const [ accountAddedModal, setAccountAddedModal ] = useState(false)

 
//  useEffect(() => {
//    const getCurrency = async () => {
//      try {
//       await currencyManager.getAllCurrencies(res => {
//         console.log(res)
//         setCurrencies(res)
//       })
      
       
//      } catch (error) {
//        console.error(error)
//      }
//    }

//    getCurrency()
//  }, [])

//  const createAccount = async (accountDetails) => {
//     try {
//       setAddAccountLoader('loading')
//       await accountManager.addAccount(accountDetails)
//       .then((res) => {
//         console.log(res)
//         setAddAccountLoader('success')
//       })
      
//     } catch (error) {
//       console.error(error)
//       setAddAccountLoader('failed')
//     }
//  }

  const onSubmit = (values) => {
    console.log(values)
    createAccount(values)
    if(from === "convert"){
      //close modal if modal request was from convert page
     
      handleAccountClose()
      
    }else if(from === "account"){
      // close modal if modal request was from acct page
      
      handleClose()
    }

    // show account added modal on success
    handleAccountAddedModal()
    
   
  }

  // const { currentUser }  = useAuth()
  // accountManager.init(currentUser)

  return (
  <>
  <div>
     <h2>Add a recipient</h2>
     <p>Kindly add a recipient account details</p>
    
    <Formik
      initialValues={{ accountCurrency: '', recipientCountry: '', bankNumber: '', accountName: '', city: '', recipientBank: '' }}
      validationSchema={Yup.object({
        accountCurrency: Yup.string()
          .required('Required'),
        recipientCountry: Yup.string()
          .required('Required'),
        bankNumber: Yup.string()
          .min(10, 'Account Number must be 10 digit')
          .max(10, 'Account Number must be 10 digit')
          .required('Required'),
        city: Yup.string()
          .required('Required'),
        recipientBank: Yup.string()
          .required('Required')
      })}
      onSubmit={onSubmit}
    >
      {({values}) => (

      <Form>
      <div style={{display: "flex", flexDirection: "column"}}>
          <label htmlFor="currency">Account Currency</label>
          <Field as="select" name="accountCurrency">
            <option value="">--select currency--</option>
            {Array.from(currencies).map((item, index) => (
              <option value={item.id}>{item.name}</option>
            ))}
           </Field>
          <ErrorMessage name="accountCurrency" component="span" />
        </div>

        <div style={{display: "flex", flexDirection: "column"}}>
          <label htmlFor="country">Recipient Country</label>
          <Field as="select" name="recipientCountry">
             <option value="">--select recipient country---</option>
             <option value="Nigeria">Nigeria</option>
           </Field>
          <ErrorMessage style={{color: "red"}} component="span" name="recipientCountry" />
        </div>

       {values.accountCurrency !== '' && values.recipientCountry !== '' && (
         <div>
            <div style={{display: "flex", flexDirection: "column"}}>
            <label htmlFor="bankNumber">Bank Account Number</label>
            <Field name="bankNumber" type="number" style={{width: "100%"}} />
            <ErrorMessage style={{color: "red"}} component="span" name="bankNumber" />
          </div>

          <div style={{display: "flex", flexDirection: "column"}}>
            <label htmlFor="accountName">Account Name</label>
            <Field name="accountName" type="text" style={{width: "100%"}} />
            <ErrorMessage style={{color: "red"}} component="span" name="accountName" />
          </div>

          <div style={{display: "flex", flexDirection: "column"}}>
            <label htmlFor="city">Fill in your City</label>
            <Field name="city" type="text"style={{width: "100%"}}  />
            <ErrorMessage style={{color: "red"}} component="span" name="city" />
          </div>

          <div style={{display: "flex", flexDirection: "column"}}>
            <label htmlFor="currency">Recipient Bank Name</label>
            <Field as="select" name="recipientBank">
            <option value="">--select recipient bank---</option>
              {bankName?.map((item, index) => (
                <option value={item.name}>{item.name}</option>
              ))}
            </Field>
            <ErrorMessage name="recipientBank" component="span" />
          </div>

          <button 
            style={{width: "100%", marginTop: "10px", borderRadius: "15px", fontWeight: "600", background: "blue", color: "#fff"}} 
            type="submit">
              Submit
          </button>
         </div>
        
       )}
      </Form>
      )}
    </Formik>
   </div>

    
  </>
    
  )
}
