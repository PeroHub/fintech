import React from "react"
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Close from '@mui/icons-material/Close'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Box from  '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
// import { useTheme } from '@mui/material/styles';
// import useMediaQuery from '@mui/material/useMediaQuery';
import { FaRegCopy } from "react-icons/fa";

import { useAuth } from '../../../contexts/AuthContext';
import { TransactionManager } from '../../../services/transactions';

const transactionManager = new TransactionManager()

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  
  

export default function PayToAccount(props) {
    const { currentUser } = useAuth()
    transactionManager.init(currentUser)
    // console.log(props.data)

    // const theme = useTheme();
    // const small = useMediaQuery(theme.breakpoints.up('sm'));
    // const large = useMediaQuery(theme.breakpoints.up('md'));
    
    const [state, setState] = React.useState({
        open: false,
        vertical: 'top',
    horizontal: 'center',
      });

      const [accountState, setAccountState] = React.useState({
        op: false,
        vertical1: 'top',
    horizontal2: 'center',
      });

      const {  open } = state;

      const {  op } = accountState;

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  const handleCloseSecond = () => {
    setAccountState({...accountState, op: false})
  };


    
   

    // function handleCopyTextFromParagraph() {
    //     const cb = navigator.clipboard;
    //     const paragraph = document.querySelector('p');
    //     cb.writeText(paragraph.innerText).then(() => alert('Text copied'));
    //   }

    const confirmPayment = async () => {

        props.setPayToAccount(false)
        props.handleSubmit()
        props.pageError('')
        props.load(true)
        props.handleAlert()
        await transactionManager.createTransaction(props.data).then(res => {
            console.log(res)
            props.load(false)
        }).catch((err) => {
            console.log(err)
            props.pageError(`Please check your internet and try again!`)
            props.load(false)
        })
    }

    // const [ value, setValue ] = React.useState({
    //     accountName: props.payAccount.accountName,
    //     accountNumber: props.payAccount.accountNo,
    //     accountBank: props.payAccount.accountBank,
    //     code : props.payAccount.type === "web" ? props.confirmationCode.placeholder : props.confirmationCode.code,
    //     copied: false
    // })

    const handleCopy = (newState) => () => {
        navigator.clipboard.writeText(props.payAccount.type === "web" ? `Invoice ${props.confirmationCode.placeholder}` : `${props.confirmationCode.code}`)
        setState({ open: true, ...newState });
    }

    const copyAccount = (newState) => () => {
        navigator.clipboard.writeText(`${props.payAccount.accountNo}`)
        setAccountState({ op: true, ...newState });
    }

    // console.log(value)

    return (
        <Dialog open={props.open} onClose={props.close}>
           <IconButton onClick={props.close} sx={{ justifyContent: 'end'}}>
                <Close />
            </IconButton>
            <DialogContent sx={{p: {xs: 1, sm: 4, md: 4}}}>
            <Box>
            <Typography sx={{ textAlign: 'center', color: '#818181'}}>Send the amount shown to the account details below</Typography>
            </Box>
             <Box sx={{background: "#EFEFEF", p: 2, mt: 4, mb: 4, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                 <Typography sx={{color: '#818181'}}>Payment Amount</Typography>
                 <Typography>{props.amount} {props.fromCurrency?.name}</Typography>
             </Box>
             {props.paymentAccountLoader ? <CircularProgress /> : <Box sx={{mt: 4, mb: 4}}>
                {/* <CopyToClipboard 
                text={[value.accountName, value.accountNumber, value.accountBank, props.payAccount.type === "web" ? props.confirmationCode.placeholder : props.confirmationCode.code,]}
                onCopy={() => setValue({...value, copied: true})}>
                <span>Copy to clipboard with span</span>
            </CopyToClipboard>
            
            {value.copied ? <span style={{color: 'red'}}>Copied.</span> : null} */}
  

            <Snackbar open={op} autoHideDuration={4000} onClose={handleCloseSecond}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Copied!
                </Alert>
            </Snackbar>

            <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Copied!
                </Alert>
            </Snackbar>
                 <Box sx={{background: "#EFEFEF", p: {xs: 1, sm: 4, md: 4}}}>
                 <Typography sx={{color: '#818181'}}><span style={{color: '#3A3A3A', fontWeight: 500}}>Account Name:</span> {props.payAccount?.accountName}</Typography>
                
                 <div>
                 <Typography sx={{color: '#818181', display: "inline"}}><span style={{color: '#3A3A3A', fontWeight: 500}}>{props.payAccount.type === "web" ? "Email:" : "Account Number:"} </span>{props.payAccount?.accountNo}</Typography>
                 <span style={{marginLeft: "15px", cursor: "pointer"}} onClick={
                    copyAccount({
                        vertical: 'top',
                        horizontal: 'center',
                    })
                    }><FaRegCopy style={{color: op ? "green": null, fontSize: "20px"}} /></span>
                 </div>
                 <Typography sx={{color: '#818181'}}><span style={{color: '#3A3A3A', fontWeight: 500}}>{props?.payAccount?.type === "web" ? " " : "Bank:"}</span> {props?.payAccount?.accountBank}</Typography>
                 <div>
                 <Typography sx={{color: '#818181', display: "inline"}}><span style={{color: '#3A3A3A', fontWeight: 500}}>Description:</span> { props.payAccount.type === "web" ? `Invoice ${props?.confirmationCode?.placeholder}` : `${props?.confirmationCode?.code}`} </Typography>
                 {/* <span>man</span> */}
                <span style={{marginLeft: "15px", cursor: "pointer"}} onClick={
                    handleCopy({
                        vertical1: 'top',
                        horizontal2: 'center',
                    })
                    }><FaRegCopy style={{color: open ? "green": null, fontSize: "20px"}} /></span>
                 </div>
                 {/* <Typography sx={{color: '#818181'}}><span style={{color: '#3A3A3A', fontWeight: 500}}>Code:</span> {props.confirmationCode} </Typography> */}
                </Box>
                <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', mt: 4}}>
                    <Typography sx={{fontSize: {xs: '14px', md: '18px', color: '#E45757', textAlign: 'center'}}}>Please copy the code above and add in your payment description for smooth confirmation. After making payment, please come back to this page and click on payment confirmation!!!</Typography>
                    <Button sx={{ p: 2, mt: 3, width: {xs: '100%', md: '50%'}}} onClick={confirmPayment} variant="contained">Confirm Payment</Button>
                </Box>
             </Box>}
            </DialogContent>
        </Dialog>
    )
}