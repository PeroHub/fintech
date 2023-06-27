import {
  Dialog, DialogContent, DialogTitle, IconButton, Button, Toolbar,
  Typography,  Grid,  Box,
  ToggleButton, ToggleButtonGroup, CircularProgress
} from "@mui/material";
import Close from "@mui/icons-material/Close";
import { ViewPaymentProof } from "./ViewProof";
import { useState, useEffect } from "react";
import { TransactionManager } from '../../../services/transactions'

const status = ['pending', 'successful', 'paid', 'canceled']


const transactionManager = new TransactionManager()

export default function SingleTransactionDialog(props) {

  const [proofModel, setProofModel] = useState(false)
  const [loading, setLoading] = useState(false)
  const [item, setItem] = useState({})

  const popProof = {
    marginTop: "20px"
  }

  const TitleProof = {
    fontSize: "20px",
   
  }
 

  useEffect(() => {
    setLoading(true)
    transactionManager.getSingleTransaction(props.item, (data) => {
      setItem(data)
    }).catch(e => {
      console.log(e);
    }).finally(() => {
      setLoading(false)
    })
    return () => {
      setItem({});
    }
  }, [props.item])

  const { user, account, ...transaction } = item

  console.log(account)

  return (
    <Dialog open={props.open} onClose={props.close}>
      <DialogTitle>
        <Toolbar>
          <Typography sx={{ flexGrow: 1 }}>
            TX: {props.item.key}
          </Typography>
          <IconButton onClick={props.close} >
            <Close />
          </IconButton>
        </Toolbar>
      </DialogTitle>

      <DialogContent>
        {
          loading
            ? <Box sx={{ textAlign: 'center' }}>
              <CircularProgress />
            </Box>

            : <Grid container>
              <Grid item sm={8}>
                <ToggleButtonGroup onChange={(e) => props.statusUpdate(props.item, e.target.value)} value={transaction.status}>
                  {status.map((item) => {
                    return (
                      <ToggleButton value={item} key={item}>
                        {item.toLocaleUpperCase()}
                      </ToggleButton>
                    )
                  })}
                </ToggleButtonGroup>
              </Grid>
              <Grid item sm={4}>
                <Button sx={{marginLeft: "15px"}} onClick={() => setProofModel(true)}> View Proof </Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography> Transaction Details </Typography>
                <Box sx={popProof}>
                <Typography sx={TitleProof}> From</Typography>
                <Typography> {transaction?.from?.name}</Typography>
                </Box>

                <Box sx={popProof}>
                <Typography sx={TitleProof}> Amount</Typography>
                <Typography> {transaction?.amount}</Typography>
                
                </Box>

                <Box sx={popProof}>
                <Typography sx={TitleProof}> To</Typography>
                <Typography> {transaction?.to?.name}</Typography>
                </Box>

                <Box sx={popProof}>
                <Typography sx={TitleProof}> Payment Account</Typography>
                <Typography> {transaction?.paymentAccount?.accountBank}</Typography>
                <Typography> {transaction?.paymentAccount?.accountName}</Typography>
                <Typography> {transaction?.paymentAccount?.accountNo}</Typography>
                </Box>

                <Box sx={popProof}>
                <Typography sx={TitleProof}> Status</Typography>
                <Typography> {transaction?.payment}</Typography>
                
                </Box>

                <Box sx={popProof}>
                <Typography sx={TitleProof}> Payment Type</Typography>
                <Typography> {transaction?.status}</Typography>
                
                </Box>

                <Box sx={popProof}>
                <Typography sx={TitleProof}> To Receive</Typography>
                <Typography> {transaction?.toReceive}</Typography>
                
                </Box>

                <Box sx={popProof}>
                <Typography sx={TitleProof}> Key</Typography>
                <Typography> {transaction?.key}</Typography>
                
                </Box>

                <Box sx={popProof}>
                <Typography sx={TitleProof}> Created At</Typography>
                <Typography> {transaction?.createdAt}</Typography>
                
                </Box>
               
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography> User Details </Typography>
                <Box sx={popProof}>
                <Typography sx={TitleProof}>Fullname</Typography>
                <Typography> {user?.fullname}</Typography>
                
                </Box>

                <Box sx={popProof}>
                <Typography sx={TitleProof}>Email</Typography>
                <Typography> {user?.email}</Typography>
                
                </Box>

                <Box sx={popProof}>
                <Typography sx={TitleProof}>Phone Number</Typography>
                <Typography> {user?.phone}</Typography>
                
                </Box>
                {/* <List>
                  {
                    Object.keys(user ?? {}).map((item) => {
                      return exclude.includes(item) ? null : (
                        <ListItem key={item}>
                          <ListItemText primary={item.toLocaleUpperCase()} secondary={user[item]} />
                        </ListItem>
                      )
                    })
                  }

                </List> */}
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography sx={{marginTop: "20px", fontSize: "20px"}}> Account Details </Typography>
                <Box sx={popProof}>
                <Typography sx={TitleProof}>Fullname</Typography>
                <Typography> {account?.accountCurrency}</Typography>
                
                </Box>

                <Box sx={popProof}>
                <Typography sx={TitleProof}>User</Typography>
                <Typography> {account?.user}</Typography>
                
                </Box>

                <Box sx={popProof}>
                <Typography sx={TitleProof}>Account Name</Typography>
                <Typography> {account?.accountName}</Typography>
                
                </Box>

                <Box sx={popProof}>
                <Typography sx={TitleProof}>Bank No</Typography>
                <Typography> {account?.bankNumber}</Typography>
                
                </Box>

                <Box sx={popProof}>
                <Typography sx={TitleProof}>Recipient Bank</Typography>
                <Typography> {account?.recipientBank}</Typography>
                
                </Box>
                {/* <List>
                  {
                    Object.keys(account ?? {}).map((item) => {
                      return exclude.includes(item) ? null : (
                        <ListItem key={item}>
                          <ListItemText primary={item.toLocaleUpperCase()} secondary={account[item]} />
                        </ListItem>
                      )
                    })
                  }

                </List> */}
              </Grid>
            </Grid>
        }
      </DialogContent>

      <ViewPaymentProof open={proofModel} close={() => { setProofModel(false) }} item={props.item} proof={transaction.proof} />
    </Dialog>
  )
}