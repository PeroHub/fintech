import React from 'react'

import { useState } from 'react'
import { icons } from '../../../assets'
import { useAuth } from '../../../contexts/AuthContext'
import { TransactionManager } from '../../../services/transactions'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Close from '@mui/icons-material/Close'
import Typography from '@mui/material/Typography'
import Box from  '@mui/material/Box'




const fileUpload = new TransactionManager()


export default function PopUpload(props) {  
    const { currentUser } = useAuth()

  
    fileUpload.init(currentUser)

    // const [clear, setClear] = useState(true)
    const [loading, setLoading] = useState(false)
    
//    console.log(props.load)
    // console.log(props.data)


    // const hide = () => setClear(!clear)
    // console.log(clear)

    // const swit = {
    //     position: "relative",
    //     left: "-50%",
    //     transition: "400ms"
    // }

    // const [empty, setEmpty] = useState(false)

    let select;
    const [file, setFile] = useState("")
    if (file) {
        select = <p style={{ color: "green" }}>File Selected</p>
    } else {
        select = <p style={{ color: "red" }}>File Not Selected</p>
    }

    let handleFIle = (event) => {
        setFile(event.target.files[0])

    }

    
    let handleUpload = () => {
        setLoading(false)
        props.pageError('')
        props.openAlert()
        props.load(true) 
        props.close()
        fileUpload.createTransaction(props.data, file).then((response)=>{
            console.log(response)
            props.load(false)
        }).catch((e) => {
            props.pageError(`Please check your internet and try again!`)
            // console.log('transaction create error:<<---> ', e.message);
            props.load(false)
        })
       
    }

    

    

    return (
            <Dialog open={props.open} onClose={props.close}>
                <DialogContent sx={{p: 4}}>
                    <Close onClick={props.close} sx={{position: 'relative', left: '95%'}} />
                    <Box sx={{display: 'flex', flexDirection: 'column'}}>
                    {select}
                    {loading}
                        <Typography sx={{color: '#818181'}}>Please upload your payment proof here</Typography>
                        <Box sx={{background: '#EFEFEF', mt: 2, p: 2}}>
                        <div className="" style={{ }}>
                            <label> choose file
                                <input
                                    type="file"
                                    onChange={handleFIle}
                                    required
                                />
                                <img src={icons.camera} className="camera" alt="camera" />
                            </label>
                        </div>
                        </Box>
                        <Box sx={{mt: 2}}>
                        
                            <Button 
                                disabled={!(file)}
                                variant="contained"
                                sx={{ width: '100%'}}
                                onClose={props.close}
                                onClick={() => {
                                    
                                    handleUpload()
                                }}
                                
                            >
                                Upload
                            </Button>
                        
                        </Box>
                        {/* <Alert   loading={loading} /> */}
                        
                    </Box>
                    
                </DialogContent>

                
            </Dialog>
        
            
       
    )
}


// <div className="upload" >
//                 <Box>
//             <div className="sub-con">
//                 <ClearIcon className="upload-icon" onClick={props.reverse}></ClearIcon>
//                 {select}
//                 {loading}
//                 <p>Please upload your payment proof here </p>
//                 <div className="file">
//                     <label> choose file
//                         <input
//                             type="file"
//                             onChange={handleFIle}
//                             required
//                         />
//                         <img src={icons.camera} className="camera" alt="camera" />
//                     </label>
//                 </div>

//                 {/* Showing button only when a file has been selected */}
//                 {file ? <Link to="alert">
//                     <div
//                         className="btn-upload"
//                         onClick={() => {
//                             setClear(!clear)
//                             handleUpload()
//                         }}>Upload</div>
//                 </Link> : null}


//             </div>
//             </Box>
//         </div>