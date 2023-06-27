import React from 'react'
import { TransactionManager } from "../../../../services/transactions";
import { useState, useEffect } from 'react';
import { useAuth } from "../../../../contexts/AuthContext";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material/styles";
// import LoadingButtons from '../../components/spinLoader'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box';


const transactionManager = new TransactionManager();

const columns = [
  { id: "key", label: "TRANSACTION ID", minWidth: 170 },
  { id: "amount", label: "AMOUNT (USD)", minWidth: 100 },
  { id: "toReceive", label: "To Receive (NGN)", minWidth: 100, format:(value)=> Number(value).toLocaleString() },
  {
    id: "createdAt",
    label: "DELIVERY DATE/TIME",
    minWidth: 170,
    format: (value) => new Date(value).toLocaleString(),
  },
  { id: "status", label: "STATUS", minWidth: 100 },
];

const StyledTableCell = styled(TableCell)(({ theme, index }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: index % 2 === 0?"#fff":"#FFFCDF",
    color: "black",
    fontWeight: "bold",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 24,
    
    
  },   
}));

export const TransacConvert = () => {
    const [values, setValues] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [isLoading, setLoading] = useState(true);
    const { currentUser } = useAuth();
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };
  
    useEffect(() => {
      setLoading(true)
      transactionManager.init(currentUser);
      return transactionManager
        .getUserTransactions((data) => {
          setLoading(false);
          setValues(data.data);
        })
        .catch((e) => {
          console.log(e);
          setLoading(false)
        })
    }, [currentUser]);
  
                                                                                                              
   
  return (
    <Paper
      sx={{  margin: "auto", marginTop: 2 }}
    >
      <TableContainer sx={{ maxHeight: 540 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <StyledTableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          {
            isLoading ? <Box sx={{padding: "20px"}}><CircularProgress size={20} /> </Box>  :  
            (
              <TableBody>
            {values.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                return (
                  <TableRow style={{backgroundColor: index % 2 === 0?"#fff":"#FFFCDF"}} hover role="checkbox" tabIndex={-1} key={row.code} sx={{border: "1px solid red"}}>
                    {columns.map((column, index) => {
                     
                      const value = row[column.id];
                      console.log(value)
                      return (
                  
                          <TableCell  key={column.id}  align={column.align} sx={index % 2 ? {background: "", padding: "20px", border: "none"}: {background: "", border: "none", padding: "20px"}} >
                          {column.format?column.format(value):value}
                        </TableCell>
                          
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
            ) 
          }
          
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={values.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  )
}
