
import { Dialog, DialogContent, Button, CircularProgress, Toolbar, List, ListItem, Typography, IconButton, ListItemText, DialogActions } from '@mui/material'
import FlutterWaveButton from './FluterwavePayment'

import Close from '@mui/icons-material/Close'

export default function PaymentConfirmationDialog(props) {
 
  const userName= props.fluterWaveValue.userName
  const UserAmount = props.fluterWaveValue.amount
  const userEmail = props.fluterWaveValue.userEmail
  const UserFromCurrency = props.fluterWaveValue.fromCurrency
  



  const amount = props.amount
  let account = props.account
  const fromCurrency = props.fromCurrency
  const toCurrency = props.toCurrency
  const eRate = props.eRate
  const gross = amount * eRate 
  const charge = Number(account?.charge) + Number(account?.futureCharge)
  const amountToRecive = gross - ( gross * charge)


  let accountType;
  if (account?.type === 'bank') {
    accountType = account?.type?.toUpperCase()
  } else {
    accountType = account?.accountName
  }


  return (
    <Dialog open={props.open} onClose={props.close}>
      <Toolbar >
        <Typography sx={{ flexGrow: 1 }} />
        <IconButton onClick={props.close} >
          <Close />
        </IconButton>
      </Toolbar>

      <DialogContent >
        {
          props.loading

            ? <CircularProgress sx={{ position: 'relative', left: '40%' }} />

            : <List dense sx={{ minWidth: { xs: 250, md: 350 } }}>

              <ListItem secondaryAction={
                <Typography variant="button" > {fromCurrency?.name}{amount} </Typography>
              } >
                <ListItemText> Amount: </ListItemText>
              </ListItem>

              <ListItem secondaryAction={
                <Typography variant="button"> {fromCurrency?.name}1 = {toCurrency?.name}{(eRate)} </Typography>
              } >
                <ListItemText> Exchange Rate: </ListItemText>
              </ListItem>

              <ListItem secondaryAction={
                <Typography> {account?.charge * 100}% </Typography>
              } >
                <ListItemText> Charge {accountType}:  </ListItemText>
              </ListItem>

              <ListItem secondaryAction={
                <Typography> {(account?.futureCharge || 0) * 100} %</Typography>
              } >
                <ListItemText> Charge (Future Pay):  </ListItemText>
              </ListItem>

              <ListItem secondaryAction={
                <Typography> {toCurrency?.name}{(gross.toLocaleString())} </Typography>
              } >
                <ListItemText> Gross:  </ListItemText>
              </ListItem>
              
              <ListItem secondaryAction={
                <Typography> {toCurrency?.name}{(amountToRecive).toLocaleString()} </Typography>
              } >
                <ListItemText> You will receive:  </ListItemText>
              </ListItem>
            </List>
        }
      </DialogContent>
      <DialogActions sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', pb: 4 }}>
        {account?.type === 'card' ? " " : <Button variant='outlined' color="error" onClick={props.close} > Cancel </Button>}
        
        {account?.type === 'card' ? <div ><FlutterWaveButton style={{background: "red", padding: "20px"}} text={"Pay with Card"}  amount={UserAmount} userName={userName} userEmail={userEmail} fromCurrency={UserFromCurrency} /></div> : <Button 
          variant='contained'   
          onClick={ props.continue}> Continue 
        </Button>}
        
      </DialogActions>

    </Dialog>
  )

}


// account?.type === 'card' ? <FlutterWaveButton /> :