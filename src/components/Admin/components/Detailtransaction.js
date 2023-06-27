import React, { useState, useEffect } from "react";
import { TransactionManager } from "../../../services/transactions";
import { useAuth } from "../../../contexts/AuthContext";
import Loading from "./spinLoader";
import  {tableCellClasses } from '@mui/material/TableCell';
import { TableContainer,Paper, Stack, Box, InputLabel, NativeSelect, FormControl, MenuItem, Table, Button, TableBody, TableHead, TableRow, TableCell } from "@mui/material";
import SingleTransactionDialog from "./SingleTransactionDialog";
import "../styles/transaction.css";
import { styled } from "@mui/material/styles";


const transactionManager = new TransactionManager();

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  [`&.${tableCellClasses.body}`]: {
    border: 0,
    padding: "20px",
    
  },
  '&:nth-of-type(even)': {
    backgroundColor: "#FFFCDF",
    border: 0,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const values = ["paid", "Successful","pending","Canceled"];

function Detailtransaction(props) {
  const { currentUser } = useAuth();
  transactionManager.init(currentUser);

  const [dialogState, toggleDialog] = useState(false);
  const [currentItem, setCurrentItem] = useState({});
  const [error, setError] = useState('');           
  const [sort, setSort] = useState('');


  console.log(sort)
 

  const [isLoading, setLoading] = useState(true);
  const [value, setValues] = useState([]);
  const [filter, setFilter] = useState({ page: 1 });

  // useEffect(() => {
  //   transactionManager.getAllTransactions((data) => {
  //     setValues(data.data);
  //     setLoading(false);
  //   });
  // }, []);
  console.log(sort)

  function openDialog(item) {
    setCurrentItem(item)
    toggleDialog(true)

  }

   const handleChange = (event) => {
    setSort(event.target.value);
    setFilter({...filter,status:event.target.value})
  };

  useEffect(() => {
    setLoading(true)
    transactionManager.getAllTransactions((data) => {
      setValues(data.data);
    }, filter).catch(e => {
      setError(e.message)
    }).finally(() => setLoading(false));
  }, [filter]);

  function paginate(isNext) {
    if (isNext) {
      if (value.length < 10) {
        return;
      }
      setFilter({ page: filter.page + 1 })
    } else {
      if (filter.page <= 1) {
        return
      }
      setFilter({ page: filter.page - 1 })
    }
  }

  const handleStatus = async (currentItem, status) => {

    await transactionManager.updateStatus(currentItem, status).then((data) => {
      const newState = [...value]
      newState[newState.findIndex((item) => item._id === data._id)].status = data.status
      setValues(newState)
      currentItem.status = status
      setCurrentItem({ ...currentItem })
    }).catch((e) => {
      console.log(e)
    })

  };
  

  return (
    <Stack>
      <Box sx={{ minWidth: 120, display: 'flex', justifyContent: 'flex-end',}}>
      <FormControl sx={{width: 100}}>
      <InputLabel variant="standard" htmlFor="uncontrolled-native">
          Filter
        </InputLabel>
        <NativeSelect
           value={sort}
           onChange={handleChange}
          
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem> 
          <option value="pending">Pending</option>
          <option value="paid">Paid</option>
          <option value="successful">Successful</option>
          <option value="canceled">Canceled</option>
        </NativeSelect>
      
      </FormControl>
    </Box>
    <TableContainer component={Paper} >
      {
         isLoading ? <Loading /> : value.length? <Table>
              <TableHead>
                <TableRow  sx={{
                  
                }}style={{backgroundColor: "#FFFCDF", padding: "20px", border: "none" }}>
                
                  <TableCell sx={{ fontWeight: 'bold', fontSize: '14px', color: '#4F4F4F' }}>TRANSACTION ID</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', fontSize: '14px', color: '#4F4F4F' }}>AMOUNT(USD)</TableCell>
                
                  <TableCell sx={{ fontWeight: 'bold', fontSize: '14px', color: '#4F4F4F' }}>DELIVERY DATE/TIME</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', fontSize: '14px', color: '#4F4F4F' }}>STATUS</TableCell>

                </TableRow>
              </TableHead>

              <TableBody>
                {value.map((item,index)  => {
                console.log(values)
              console.log(item.status)
        
                let status;
                switch (item.status) {
                  case 'paid':
                    status = "paid";
                    break;
                    case 'pending':
                    status = "pending";
                    break;
                    case 'canceled':
                    status = "canceled";
                    break;
                    case 'successful':
                    status = "successful";
                    break;
                    default:   

                }
               
                  return (
                    <TableRow style={{backgroundColor: index % 2 === 0?"#fff":"#FFFCDF"}} key={item._id} hover onClick={() => openDialog(item)}>
                    
                      <TableCell sx={{ fontWeight: 'bold', fontSize: '16px', color: '#001427', padding: "20px", border: "none" }}> {item.key} </TableCell>
                      <TableCell sx={{ fontWeight: 'bold', fontSize: '16px', color: '#001427', padding: "20px", border: "none" }}> {item.amount} </TableCell>
                        <TableCell sx={{ fontWeight: 'bold', fontSize: '16px', color: '#001427', padding: "20px", border: "none" }}> {new Date(item.createdAt).toLocaleString()} </TableCell>
                        <div className={status}> {item.status} </div>
                              
                          
                                
                            
                            
                                
                       
                    
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
            : <h4> {error? error: 'Nodata'} </h4>
      }
      <div style={{ margin: '5px', textAlign: 'right' }}>
        <Button size="small" sx={{ mr: '10px' }} disabled={filter.page <= 1} variant="contained" color="secondary" onClick={() => { paginate() }}> Prev</Button>
        <Button size="small" sx={{ mr: '10px' }} disabled={value.length < 10} variant="contained" onClick={() => { paginate(true) }}> Next</Button>
      </div>
      <SingleTransactionDialog open={dialogState} statusUpdate={handleStatus} close={() => toggleDialog(false)} item={currentItem} />
    </TableContainer>
    </Stack>
  )
}

export default Detailtransaction;
