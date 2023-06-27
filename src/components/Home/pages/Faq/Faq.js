import React from 'react'
import { useState } from 'react'
import { icons } from '../../../../assets'
import { Link, useHistory} from "react-router-dom";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";
// import { FaAngleDown } from "react-icons/fa";
// import { FaAngleUp } from "react-icons/fa";


import Faqstructure from './Faqstructure';
import Footer from "../../components/footer/Footer"


// import { CurrencyManager } from '../../../../services/currency'
import { useAuth } from '../../../../contexts/AuthContext'

// const currencyManager = new CurrencyManager();

const Faq = () => {

  const { currentUser } = useAuth();


  const [ faq, setFaq ] = useState(false);
  const [ secFaq, setSecFaq ] = useState(false);
  const [ thirFaq, setThirFaq ] = useState(false);
  const [ fourthFaq, setFourthFaq ] = useState(false);
  const [ fiveFaq, setFiveFaq ] = useState(false);
  const [ sixFaq, setSixFaq ] = useState(false);
  const [ sevenFaq, setSevenFaq ] = useState(false);
  const [ eightFaq, setEightFaq ] = useState(false);

  const history = useHistory();
 
  function handleClick() {
    history.push("/");
  }

  const heightTrue = {
    display: "block",
    maxHeight: "300px",
    transition:"0.3s",
    background: "#FBFBFB",
    padding: "20px",
    color: "#7C7B73"
  }

  const heightFalse = {
    display: "none",
    maxHeight: "0px",
    transition:"0.3s"
  }

  const dot = {
    fontSize: "1rem",
    background: "rgba(255, 138, 0, 1)",
    borderRadius: "50%",
    width: "10px",
    display: "inline-block",
    position: "relative",
    top: "-10px",
    height: "10px",
    marginLeft: "5px"
  }
  return (
    <div>
      <Box sx={{ background: "rgba(0, 0, 0, 0.6)",  maxHeight: "70vh", backgroundImage: `url(${icons.faq})`, backgroundPosition: "center", backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundBlendMode: "multiply", display: "flex", textAlign: "center", color: "#fff", fontSize: "30px", fontWeight: "bold"}}>
      <Box sx={{  width: "100%"}}>
        <Box sx={{ display: "flex", justifyContent: "space-between"}}>
        
        <Box onClick={handleClick} sx={{padding: {xs: "10px", sm: "30px", md: "30px"},fontSize: {xs: "18px"}, fontStyle: "normal", fontWeight: "bold", textTransform: "uppercase", lineHeight: "20px", color: "rgba(255, 138, 0, 1)", cursor: "pointer"}}>
            FuturePay<div style={dot}></div>
          </Box>
         <Box sx={{padding: {xs: "10px", sm: "30px", md: "30px"}}}>
            <Link to="/">
                <IconButton color="primary">
                  <Close />
                </IconButton>
            </Link>
         </Box>
        </Box>
        <Box sx={{textAlign: "center", width: "100%", height: "50vh", display: "flex", justifyContent: "center", alignItems: "center"}}>FuturePays Help center</Box>
        
      </Box>
    </Box>
    <Box sx={{ marginTop: "20px",  display: "flex",  justifyContent: "center", alignItems: "center"}}>
      <Box sx={{ boxShadow: "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)", width: {xs: "100%", sm: "70%", md: "50%"}, display: "flex", flexDirection: "column", paddingTop: "10px", alignItems: "center"}}>
          <h3 style={{textAlign: "center", margin: "20px"}}>Frequestly Asked Questions</h3>
          
            <Faqstructure 
              faq={faq}
              toggle={() => setFaq(!faq)}
              question={"How does the Futurepay money transfer and conversion app work?"}
              answer={"The FuturePay app lets you convert between USD and Naira in your Access Dorm and Payoneer account with ease. All you have to do is input the amount you want to convert, select the payment method, add or select a recipient account, make a transfer to the stipulated account, and wait to receive your naira equivalent."}
              heightTrue={heightTrue}
              heightFalse={heightFalse}
            />

            <Faqstructure 
              faq={secFaq}
              toggle={() => setSecFaq(!secFaq)}
              question={"Who can use FuturePay?"}
              answer={"FuturePay is currently open to all citizens of Nigeria legitimately earning USD from freelance or remote work"}
              heightTrue={heightTrue}
              heightFalse={heightFalse}
            />

            <Faqstructure 
              faq={thirFaq}
              toggle={() => setThirFaq(!thirFaq)}
              question={"Can I keep money in my FuturePay Account?"}
              answer={"From version 2 of Futurepay which will come with wallets, you will be able to keep money securely in your Futurepay account"}
              heightTrue={heightTrue}
              heightFalse={heightFalse}
            />

            <Faqstructure 
              faq={fourthFaq}
              toggle={() => setFourthFaq(!fourthFaq)}
              question={"How safe is my money on FuturePay?"}
              answer={"Your Money is 99% secure and safe on the FuturePay platform"}
              heightTrue={heightTrue}
              heightFalse={heightFalse}
            />

            <Faqstructure 
              faq={fiveFaq}
              toggle={() => setFiveFaq(!fiveFaq)}
              question={"How fast is the payment system?"}
              answer={"On confirmation, you should get your Naira in 2 to 30 minutes"}
              heightTrue={heightTrue}
              heightFalse={heightFalse}
            />

            <Faqstructure 
              faq={sixFaq}
              toggle={() => setSixFaq(!sixFaq)}
              question={"What is the transaction limit on Future pay?"}
              answer={"The maximum transaction limit is 5,000"}
              heightTrue={heightTrue}
              heightFalse={heightFalse}
            />

            <Faqstructure 
              faq={sevenFaq}
              toggle={() => setSevenFaq(!sevenFaq)}
              question={"How much does it cost to use Futurepay?"}
              answer={"Transactions on Futurepay carry a transaction charge of 1%"}
              heightTrue={heightTrue}
              heightFalse={heightFalse}
            />

            <Faqstructure 
              faq={eightFaq}
              toggle={() => setEightFaq(!eightFaq)}
              question={"Are there hidden charges?"}
              answer={"There are no hidden charges on FuturePay, all our charges are transparently displayed at the point of conversion"}
              heightTrue={heightTrue}
              heightFalse={heightFalse}
            />
        
          
      </Box>

    </Box>

    <div className="updates">
          <p>Yet to get an account with futurepay?</p>
          <Link to={currentUser ? "user": "signup" }>
              <Button variant="contained" className="">Get started</Button>
            </Link>
        </div>

    <Footer />
    </div>
  )
}

export default Faq