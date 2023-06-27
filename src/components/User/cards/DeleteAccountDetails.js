import { Box, Dialog, DialogContent, DialogContentText, Button } from '@mui/material'
import React from 'react'

export const DeleteAccountDetails = ({open, close, getIndex, deleteCard, setAccountDeleteModal}) => {
  return (
    <div>
        <Dialog
          open={open}
          onClose={close}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          
        >
          <DialogContent >
              <DialogContentText id="alert-dialog-description" >
              ARE YOU SURE!!
            </DialogContentText>
  
           
          </DialogContent>
         
              
            <Box sx={{ textAlign: "center", padding: "10px"}}>
                <Button sx={{color: "red"}} onClick={close}>No</Button>
                <Button sx={{color: "green"}} onClick={() => {
                close()
                deleteCard(getIndex)
                setAccountDeleteModal(true)
                // handleDeletedOpen()
                //   handleDeletedOpen()
                }}>Yes</Button>
            
            </Box>
            
          
          
        </Dialog>
    </div>
  )
}
