import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { AuthProvider } from "../contexts/AuthContext";
import { useState, useEffect, createContext } from 'react'
import Home from "./Home/components/content/Home";
import Login from "./Home/pages/Login";
import Faq from "./Home/pages/Faq/Faq"
import Signup from "./Home/pages/Signup";
import ForgotPassword from "./Home/pages/ForgotPassword";
import P from "./Home/pages/NewPassword";
import Error from "../services/Error";
import Alert from "../services/Alert";

import NigerianBanks from "./User/cards/nigerianbanks";
import { currency } from "./currencyFormDb";

import { ThemeProvider } from "@mui/system"
import { theme } from "./theme"

import '../api/config'

// Project CSS
import "./index.css";
import "../components/Home/styles/sign.css";
import "../components/User/styles/dashboard.css";
import "./Home/styles/body.css";

//  Dashboard Components

import UserDashboard from "../components/User/components/UserDashboard";
import Maintransaction from "./Admin/components/Maintransaction";
import Agent from "./Agent/components/Agenthome"

//Private Route
import PrivateRoute from "../services/PrivateRoute";
import AdminRoute from "../services/AdminRoute";

//API and Auth
import { useAuth } from "../contexts/AuthContext";
import { CurrencyManager } from "../services/currency";

const currencyManager = new CurrencyManager()


export const ConverterContext = React.createContext();

export const userInfoContext = createContext({
  bankName: [],
  currencies: []
})

function App() {

  
  const [ currencies, setCurrencies ] = useState([])
  const [ bankName, setBankName ] = useState(NigerianBanks)
  const [ loading, setLoading ] =  useState(true)



  useEffect(() => {
    // this simulates an async action, after which the component will render the content
    demoAsyncCall().then(() => setLoading(false));
    currency().then((val)=>setCurrencies(val))
  },[])

  // useEffect(() => {
  //   const getCurrency = async () => {
  //     try {
  //      await currencyManager.getAllCurrencies(res => {
  //        setCurrencies(res)
  //        console.log(res)
  //      })
       
      
  //     } catch (error) {
  //       console.error(error)

       
  //     }
  //   }
 
  //   getCurrency()
  // }, [])

  // console.log(currencies)


  if(loading){
    return null
  }

  

  
  return (
      <BrowserRouter>
        <AuthProvider>
        <ThemeProvider theme={theme}>
          <userInfoContext.Provider 
            value={{
              bankName,
              currencies
            }}
            >
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/faq" component={Faq} />
            <Route path="/reset" component={ForgotPassword} />
            <Route path="/resetpassword/:user/:code" component={P}/>
            

            {/* Only users that are logged-in can access these routes */}
            <AdminRoute path="/cash" component={Maintransaction} />
            <PrivateRoute path="/user" component={UserDashboard} />
            <PrivateRoute path="/agent" component={Agent} />
            <Route path="/" component={Home} exact />
            <Route path="/alert" component={Alert} />
            <Route component={Error}/>
          </Switch>
          </userInfoContext.Provider>
         
          </ThemeProvider>
        </AuthProvider>
      </BrowserRouter>
  );
}

function demoAsyncCall() {
  return new Promise((resolve) => setTimeout(() => resolve(), 4000));
}

export default App;
