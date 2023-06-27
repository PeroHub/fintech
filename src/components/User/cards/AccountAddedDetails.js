import { Box, CardContent, Button, Card  } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress';
import React from 'react'

export const AccountAddedDetails = ({createdAccount, loaderHomeAcct, deleteCard, handleDeleteAcoount, setGetIndex}) => {
  return (
    <div>
        {loaderHomeAcct ? <CircularProgress /> :  <Box sx={{ display: "flex", flexWrap: "wrap", mt:2}}>
                {createdAccount && createdAccount.map((item, index) => (

                <Card sx={{ width: {xs: "100%", sm: "70%", md: "30%", mr:4}, ml: 2, mt:2}}>
                    <Button onClick={() => {
                        handleDeleteAcoount()
                        setGetIndex(index)
                    }}>Delete </Button>
                    <CardContent>
                        <p> <span>Currency:</span> {item.accountCurrency}</p>
                        <p> <span>Acct No:</span> {item.bankNumber}</p>
                        <p> <span>Acct Name:</span> {item.accountName}</p>
                        <p> <span> Bank:</span> {item.recipientBank}</p>
                    </CardContent>
                </Card>
                )) 
                }
            </Box>
            }
          
            
    </div>
  )
}
