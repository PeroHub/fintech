import { React, useEffect, useState } from 'react'
 import '../styles/transaction.css'
import { TransactionManager } from '../../../services/transactions'
import { CurrencyManager } from '../../../services/currency'
// import { icons } from '../../../assets'
import {  Grid, Card, CardContent, List, ListItem, ListItemText, Chip, Box, Typography, Toolbar, Badge } from '@mui/material'
import NotificationsIcon from '@mui/icons-material/Notifications';
// import SaveIcon from '@mui/icons-material/Save';
// import LoadingButton from '@mui/lab/LoadingButton';
import SingleTransactionDialog from "../components/SingleTransactionDialog"
import Barchart from "./Barchart"
  

const transactionManager = new TransactionManager()
const currencyManager = new CurrencyManager()


const filter = { page: 1, limit: 4, status: 'pending' }


function Dashboard() {

    const [dialogState, toggleDialog] = useState(false);
    const [currentItem, setCurrentItem] = useState({});
    const [values, setValues] = useState([]);
    const [ totalCurrencyInflow, setTotalCurrencyInflow ] = useState({});
    const [ totalInflow, setTotalInflow ] = useState({});
    console.log(totalInflow)

    // const [currencies, setCurrencies] = useState([]);
    // const [currency, setCurrency] = useState({ id: 1, name: 'UdSD', toBase: 500},);

    // const [loading, setLoading] = useState(false);
    // const [curloading, setCurLoading] = useState(false);


    // const [edit, setEdit] = useState(true)
    // const [amount, setAmount] = useState(500)


    function openDialog(item) {
        setCurrentItem(item)
        toggleDialog(true)

    }

    // function handleOpen() {
    //     setAmount(currency.toBase)
    //     setEdit(false)
    // }

    // function handleClick() {
    //     setLoading(true);
    //     currencyManager.updateExchangeRate(currency, amount).then(() => {
    //         setCurrency({ ...currency, toBase: amount })
    //     }).catch((e) => {
    //         console.log(e);
    //     }).finally(() => {
    //         setLoading(false);
    //         setEdit(true)
    //     })
    // }

    // const handleCurrency = (event) => {
    //     setCurrency(event.target.value)
    //     setCurrency(currencies.find((item) => item._id === event.target.value))
    // }

    // const handleChange = (event) => {
    //     const { value } = event.target;
    //     setAmount(value);
    // };

    useEffect(() => {
        transactionManager.getAllTransactions((data) => {
            setValues(data.data);
        }, filter).catch((e) => {
            console.log(e);
        });

       

        // setCurLoading(true)
        currencyManager.getCurrencies((data) => {
            // setCurrencies(data)
            // setCurrency(data[0])
        }).catch((e) => {
            console.log(e)
        }).finally(() => {
            // setCurLoading(false)
        })

    }, []);

    useEffect(() => {
        try {
            transactionManager.getTotalCurrencyInflow(data => {
                setTotalCurrencyInflow(data)
            })
        }catch(err) {
            console.log(err)
        }
    }, [])

    useEffect(() => {
        try {
            transactionManager.getTotalInflow(data => {
                setTotalInflow(data)
            })
        }catch(err) {
            console.log(err)
        }
    }, [])

    const handleStatus = async (currentItem, status) => {

        await transactionManager.updateStatus(currentItem, status).then((data) => {
            const newState = [...values]
            newState[newState.findIndex((item) => item._id === data._id)] = data
            setValues(newState)
            currentItem.status = status
            setCurrentItem({ ...currentItem })
        }).catch((e) => {
            console.log(e)
        })

    };

    return (
        <Grid container alignItems="stretch" justifyContent="space-between" spacing={2}>
            <Grid item xs={12}>
                <Typography color='primary'> Total Inflow </Typography>
            </Grid>

            <Grid sx={{mx: 1}}  container spacing={2} >
           
                <Grid   style={{cursor: "pointer"}} item md={4}  xs={12} sm={12}>
                    
                    <Card style={{borderBottom: "5px solid #F5F21A"}} sx={{height: 200}}>
                   
                        <CardContent sx={{ textAlign: 'center', m: 3}}>
                            
                            {Array.from(totalCurrencyInflow).map(item => (
                               <>
                                <p style={ {fontSize: "20px"}}>{item?._id}</p>
                                <p  style={{color: "#3A3A3A", fontSize: "34px", fontWeight: "bold"}}  sx={{ textAlign: 'center', mt: 5 }}>                
                                {item?.total}
                                </p></>
                            ))}
                            
                       
                        
                        </CardContent>
                   
                    
                    </Card>
                </Grid>
                <Grid   style={{cursor: "pointer"}} item md={4}  xs={12} sm={12}>
                    <Card style={{borderBottom: "5px solid #28B446"}} sx={{height: 200}}>
                    <CardContent sx={{ textAlign: 'center', m: 3}}>
                        { Array.from(totalInflow).map(item => (
                            <>
                            <Box style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                             <p style={ {fontSize: "14px", fontFamily: "Quicksand",color: "#35342C",  fontWeight: "bold", alignItems: "center", paddingRight: "10px"}}>{item?._id}:</p>
                            <p style={{color: "#3A3A3A", fontSize: "14px", alignItems: "center"}}  sx={{ textAlign: 'center', mt: 5 }}>{item?.total}</p>
                            </Box>
                       
                            </>
                        ))}
                       
                       
                        </CardContent>
                    </Card>
                </Grid>
        </Grid>
            
           
           
            <Grid item xs={12}>

                <Typography color='primary'> Analysis </Typography>
            </Grid>
            <Grid item xs={12} sm={7} md={8}>
                <Card sx={{ height: '100%', borderRadius: '15px', boxShadow: '0px 4px 22px rgba(128, 56, 56, 0.16)' }} className='analysis__details--pending'>
                    <CardContent>
                        <h2> Chart </h2>
                        <Barchart />
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} sm={5} md={4}>
                <Card sx={{ minHeight: '200px', borderRadius: '15px', boxShadow: '0px 4px 22px rgba(128, 56, 56, 0.16)' }} className='analysis__details--pending'>
                    <Toolbar>
                        <Typography variant="h6" color="black" sx={{ flexGrow: 1 }}>
                            Pending Orders
                        </Typography>
                        <Badge variant="dot" color="primary">
                            <NotificationsIcon />
                        </Badge>
                    </Toolbar>
                    <CardContent>
                        <List dense >

                            {
                                values.map((item, index) => {
                                    return (
                                        <ListItem key={index}
                                            secondaryAction={
                                                <Chip color="secondary" size="small" label={item.status} />
                                            }
                                            hover onClick={() => openDialog(item)}
                                        >
                                            <ListItemText
                                                primary={item.key}
                                                secondary={`$${item.amount} ${new Date(item.createdAt).toLocaleDateString()}`}
                                            />
                                        </ListItem>

                                    )
                                })
                            }
                        </List>
                        <SingleTransactionDialog open={dialogState} statusUpdate={handleStatus} close={() => toggleDialog(false)} item={currentItem} />
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    )
}

export default Dashboard;
