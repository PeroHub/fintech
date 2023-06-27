import React from 'react'
import ClearIcon from '@mui/icons-material/Clear';
import { useState } from 'react'
import InputResultCard from './InputResultCard';

export const valuesContext = React.createContext()

export default function AccountDetailCard() {

    const [clear, setClear] = useState(false)
    const sho = () => setClear(!clear)

    let display = {
        display: "none"
    }

    let fine;
    if(clear === true){
        fine = display
    }

    // State for form
    const [values, setValues] = useState({
        fullName: "",
        accountNumber: "",
        bankName: ""
    });


    

    

    const handleFullName = (event) => {
        setValues({...values, fullName: event.target.value})
    }

    const handleAccountNumber = (event) => {
        setValues({...values, accountNumber: event.target.value})
    }

    const handleBankName = (event) => {
        setValues({...values, bankName: event.target.value})
    }

    
    
    const handleSubmit = (e) => {
        e.preventDefault()
        setValues({...values})
        // let userDetails = [values]
        
    }

    // Looping through the forms values
        // let row;
        let userDetails = [values]
        let test = localStorage.setItem('done', JSON.stringify(userDetails));
        console.log(test)
        // userDetails.forEach(element => {
        //     row = <div>
        //             <p>{element.fullName}</p>
        //             <p>{element.accountNumber}</p>
        //             <p>{element.bankName}</p>
        //          </div>
        //     // console.log(row)
        // });

        // Looping through the forms values
    

    

    

    
    // End State for form

    return (
        <>
        <div className="done" style={ fine }>
            <form onSubmit={handleSubmit}>
                <ClearIcon className="clr" onClick={sho}></ClearIcon>
                <div>
                    <label for="fname">Full Name:</label>
                    <input 
                        onChange={handleFullName}
                        value={values.fullName}
                        type="text"  
                        placeholder="Peter Ime" 
                        required />
                        
                </div>
                <div>
                    <label for="account">Account Number:</label>
                    <input 
                        onChange={handleAccountNumber}
                        value={values.accountNumber}
                        type="number" 
                        placeholder="234567891" 
                        required />
                </div>
                <div>
                    <label for="lname">Bank Name:</label>
                    <input 
                        onChange={handleBankName}
                        value={values.bankName}
                        type="text" 
                        placeholder="" 
                        required />
                </div>
                <div>
                    <input onClick={sho} className="butt" type="submit"></input>
                </div>
            </form>
        </div>
            <valuesContext.Provider value={userDetails}>
            <InputResultCard />
            </valuesContext.Provider>
        </>
    )
}


