import React from 'react'
import { useState, useEffect } from 'react'
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
// import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import  {tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress'
import Pagination from '@mui/material/Pagination';

import { UserAccountManager } from '../../../../services/account'
import { useAuth } from '../../../../contexts/AuthContext'

const columns = [
  { id: "fullname", label: "Full Name", minWidth: 170 },
  { id: "email", label: "Email", minWidth: 100 },
  { id: "location", label: "Location", minWidth: 140 },
  { id: "phone", label: "Phone Number", minWidth: 100 },
  { id: "_id", label: "Client ID", minWidth: 100 },
];

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

const userAccountManager = new UserAccountManager()

const UsersDetailPage = () => {

  const { currentUser } = useAuth()
  userAccountManager.init(currentUser)



  const [ depositHistory, setDepositHistory] = useState([])
  const [ count, setCount ] = useState(null)
  const [page, setPage] = React.useState(1);
  const handleChange = (event, value) => {
    setPage(value);
  };
 
    const [isLoading, setLoading] = useState(true);

 

  


  useEffect(() => {
    async function depositHistory() {
      try {
          console.log("me")
          setLoading(true)
        await userAccountManager.getAllUserAccount({page:page}).then(res => {
          console.log(res)
          setCount(res.pagination.count)
          setPage(res.pagination.page)
          setDepositHistory(res.data)
          setLoading(false)
        })
      }catch(err) {
        setLoading(false)
      }
    }
  
    depositHistory()
  }, [page])
  
 
//done


  return (
    <Paper sx={{ width: '100%', marginTop: "20px" }}>
    <TableContainer sx={{ maxHeight: 440 }}>
      <Table stickyHeader aria-label="sticky table">
        
          <TableRow>
            {columns.map((column) => (
              <TableCell
                key={column.id}
                align={column.align}
                style={{ top: 57, minWidth: column.minWidth, background: "#FFFCDF", border: 0 }}
              >
                {column.label}
              </TableCell>
            ))}
          </TableRow>
       {isLoading ? <Box sx={{padding: "20px"}}><CircularProgress size={20} /> </Box> :  <TableBody>
          {depositHistory.map((row) => {
              return (
                <StyledTableRow hover >
                 {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align} style={{padding: "30px", border: 0}}>
                        {column.format && typeof value === 'number'? column.format(value): value}
                      </TableCell>
                    );
                  })}
                </StyledTableRow>
              );
            })}
        </TableBody>}
       
      </Table>
      
    </TableContainer>
    <Box sx={{m: 4, display: "flex", justifyContent: "center", alignItems: "center"}}>
    <Pagination count={count} page={page}  size="large" onChange={handleChange} />
    </Box>
  </Paper>
  )
}

export default UsersDetailPage