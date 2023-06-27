import React from 'react'
import Box from '@mui/material/Box';
import { FaAngleDown } from "react-icons/fa";
import { FaAngleUp } from "react-icons/fa";

const Faqstructure = ({faq, toggle,heightTrue, heightFalse, question, answer }) => {
  return (
    <>
    <Box sx={{borderBottom: "1px solid #CCCCCC", width: {xs: "100%", md: "70%"}, padding: {xs: "10px 5px", sm: "20px", md:"20px 0px"}}}>
        <Box sx={{display: "flex", justifyContent: "space-between", padding: "10px"}}>
        <p style={{color: "#FF842B"}}>{question}</p>
        <div onClick={toggle}>
            { faq ? <FaAngleUp style={{fontSize: "25px", color: "#7C7B73"}} /> : <FaAngleDown style={{fontSize: "25px", color: "#7C7B73"}} /> }
        </div>
        </Box>
        <Box sx={ faq ? heightTrue : heightFalse}>{answer}</Box>
    </Box>
    </>
  )
}

export default Faqstructure