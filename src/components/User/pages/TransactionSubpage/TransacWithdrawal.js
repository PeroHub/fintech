import { useState, useEffect } from 'react'

import { WalletManager } from '../../../../services/wallet'
import { useAuth } from '../../../../contexts/AuthContext'

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import  {tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress'

const columns = [
  { id: "key", label: "TRANSACTION ID", minWidth: 170 },
  { id: "amount", label: "AMOUNT (USD)", minWidth: 100 },
  {
    id: "createdAt",
    label: "DELIVERY DATE/TIME",
    minWidth: 170,
    format: (value) => new Date(value).toLocaleString(),
  },
  { id: "status", label: "STATUS", minWidth: 100 },
];

// const StyledTableCell = styled(TableCell)(({ theme }) => ({
//   [`&.${tableCellClasses.head}`]: {
//     backgroundColor: "#FFFCDF",
//     color: theme.palette.common.black,
//     border: 0,
    
//   },
//   [`&.${tableCellClasses.body}`]: {
//     fontSize: 14,
//     border: 0,
//     padding: "40px",
//     borderRadius: "10px",
    
//   },
// }));

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

const walletManager = new WalletManager()

const TransacWithdrawal = () => {
  const { currentUser } = useAuth()
  walletManager.init(currentUser)

  const [ withdrawHistory, setWithdrawHistory] = useState([])

  const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [isLoading, setLoading] = useState(true);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    async function withdrawHistory() {
      try {
        setLoading(true)
        await walletManager.getWalletWithdrawHistory().then(res => {
          setWithdrawHistory(res.data)
          console.log(res)
          setLoading(false)
        })
      }catch(err) {
        setLoading(false)
      }
    }
  
    withdrawHistory()
  }, [])

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
          {withdrawHistory.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                <StyledTableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align} style={{padding: "30px", border: 0}}>
                        {column.format && typeof value === 'number'
                          ? column.format(value)
                          : value}
                      </TableCell>
                    );
                  })}
                </StyledTableRow>
              );
            })}
        </TableBody>}
       
      </Table>
    </TableContainer>
    <TablePagination
      rowsPerPageOptions={[10, 25, 100]}
      component="div"
      count={withdrawHistory.length}
      rowsPerPage={rowsPerPage}
      page={page}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
  </Paper>
  )
}

export default TransacWithdrawal