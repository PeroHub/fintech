
import { Dialog, IconButton, Toolbar, } from "@mui/material";
import Close from "@mui/icons-material/Close";
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
// import { SERVER_URL } from "../../../api/config";
import { useEffect, useState } from "react";


export function ViewPaymentProof(props) {

  const [fileName, setFileName] = useState()

  useEffect(()=>{
    const ext = `${props.item?.proof?.split('.')?.splice(-1)}`
    setFileName(`${props.item?.key}.${ext}`)
  },[props.item])

  return (
    <Dialog open={props.open} onClose={props.close} fullScreen>
      <Toolbar>
        <IconButton  download={fileName} color="primary" href={`${props.proof}`}  >
          <ArrowCircleDownIcon />
        </IconButton>
        <IconButton color="primary" onClick={props.close} sx={{position: "relative", right: "30px"}} >
          <Close />
        </IconButton>
      </Toolbar>
      <img style={{ height: 'auto', width: '100%' }} src={`${props.proof}`} alt="proof" />
    </Dialog>
  )
}