import { useState } from "react";
// import { TransactionManager } from "../../../services/transactions";
// import { useAuth } from "../../../contexts/AuthContext";
// import Paper from "@mui/material/Paper";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell, { tableCellClasses } from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TablePagination from "@mui/material/TablePagination";
// import TableRow from "@mui/material/TableRow";
// import { styled } from "@mui/material/styles";
// import LoadingButtons from '../components/spinLoader'
import '../styles/transaction.css'

import { TransacConvert } from "./TransactionSubpage/TransacConvert";
import TransacDeposit from "./TransactionSubpage/TransacDeposit";
import TransacPayment from "./TransactionSubpage/TransacPayment";
import TransacWithdrawal from "./TransactionSubpage/TransacWithdrawal";

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';

// const transactionManager = new TransactionManager();

// const columns = [
//   { id: "key", label: "TRANSACTION ID", minWidth: 170 },
//   { id: "amount", label: "AMOUNT (USD)", minWidth: 100 },
//   { id: "toReceive", label: "To Receive (NGN)", minWidth: 100, format:(value)=> Number(value).toLocaleString() },
//   {
//     id: "createdAt",
//     label: "DELIVERY DATE/TIME",
//     minWidth: 170,
//     format: (value) => new Date(value).toLocaleString(),
//   },
//   { id: "status", label: "STATUS", minWidth: 100 },
//   { id: "action", label: "ACTION", align: "right", minWidth: 100 },
// ];



// const StyledTableCell = styled(TableCell)(({ theme }) => ({
//   [`&.${tableCellClasses.head}`]: {
//     backgroundColor: theme.palette.warning.light,
//     color: theme.palette.common.white,
//   },
//   [`&.${tableCellClasses.body}`]: {
//     fontSize: 14,
//   },
// }));


export function TransacHeader({handleDeposit, handleWithdraw, handlePayment, handleConvert}) {

  return (
    <div>
      <Box className="transaComponent" >
      <div className="transacConvert" onClick={handleConvert} style={{cursor: "pointer", fontWeight: "bold", marginTop: "20px"}}>Convert</div>
      <div className="transacwithdraw" onClick={handleWithdraw} style={{cursor: "pointer", fontWeight: "bold", marginTop: "20px"}}>Withdrawal</div>
      <div className="transacDeposit" onClick={handleDeposit} style={{cursor: "pointer", fontWeight: "bold", marginTop: "20px"}}>Deposit</div>
      <div className="transacPayment" onClick={handlePayment} style={{cursor: "pointer", fontWeight: "bold", marginTop: "20px"}}>Payment</div>
      </Box>

      <Box className="TransacSelect" sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Transaction</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Transact"
        >
          <MenuItem value={"payment"}><div className="transacPayment" onClick={handlePayment} style={{cursor: "pointer", fontWeight: "bold", marginTop: "20px"}}>Payment</div></MenuItem>
          <MenuItem value={"deposit"}><div className="transacDeposit" onClick={handleDeposit} style={{cursor: "pointer", fontWeight: "bold", marginTop: "20px"}}>Deposit</div></MenuItem>
          <MenuItem value={"withdrawal"}><div className="transacwithdraw" onClick={handleWithdraw} style={{cursor: "pointer", fontWeight: "bold", marginTop: "20px"}}>Withdrawal</div></MenuItem>
          <MenuItem value={"convert"}><div className="transacConvert" onClick={handleConvert} style={{cursor: "pointer", fontWeight: "bold", marginTop: "20px"}}>Convert</div></MenuItem>
          
        </Select>
      </FormControl>
    </Box>
    </div>
  )
}

export default function Transactionpage() {
  // const [values, setValues] = useState([]);
  // const [page, setPage] = useState(0);
  // const [rowsPerPage, setRowsPerPage] = useState(10);
  // const [isLoading, setLoading] = useState(true);
  // const { currentUser } = useAuth();

  // const handleChangePage = (event, newPage) => {
  //   setPage(newPage);
  // };

  // const handleChangeRowsPerPage = (event) => {
  //   setRowsPerPage(+event.target.value);
  //   setPage(0);
  // };

  // useEffect(() => {
  //   transactionManager.init(currentUser);
  //   return transactionManager
  //     .getUserTransactions((data) => {
  //       setLoading(false);
  //       setValues(data.data);
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //     })
  // }, [currentUser]);

  // let va = values.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
  // console.log(va)

  const [ contentShow, setContentShow ] = useState('convert')

  console.log(contentShow)

  const handleDeposit = () => {
    setContentShow('deposit')
  }

  const handleConvert = () => {
    setContentShow('convert')
  }

  const handleWithdraw = () => {
    setContentShow('withdraw')
  }

  const handlePayment = () => {
    setContentShow('payment')
  }

  let contentDisplay;
  switch (contentShow) {
    case 'payment':
      contentDisplay = <TransacPayment  />
      break;
    case 'deposit':
      contentDisplay = <TransacDeposit  />
      break;
    case 'withdraw':
      contentDisplay = <TransacWithdrawal />
      break;
  
    default:
      contentDisplay = <TransacConvert />
      break;
  }
  


  return (
    <div>
      <TransacHeader 
      handleDeposit={handleDeposit}
      handleWithdraw={handleWithdraw}
      handlePayment={handlePayment}
      handleConvert={handleConvert}
      />
      { contentDisplay }
    </div>
    
  );
}
