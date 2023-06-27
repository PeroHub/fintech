import React, { useRef, useState } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import { Link, } from "react-router-dom";
import { TextField, Button, Container, IconButton, InputAdornment, Grid, Stack, Box, Alert, CircularProgress } from "@mui/material";
import { Close,} from "@mui/icons-material";

function ForgotPassword() {
  const emailRef = useRef();
  const { forgotPassword } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(true)


  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if(!emailRef.current.value){
        throw new Error('Email is required')
      }
      setError("");
      setLoading(true);
      await forgotPassword(emailRef.current.value);
      setModal(false)
    } catch (e) {
      setError(e.message)
    }
    setLoading(false);
  }


  return (
    <Container sx={{ backgroundColor: 'black' }} maxWidth={{}} >

      <Box sx={{ position: 'fixed', top: "20px", right: "20px" }} position={{ top: '4px', right: '4px' }}>
        <Link to="/">

          <IconButton color="primary">
            <Close />
          </IconButton>
        </Link>
      </Box>

      <Grid sx={{ minHeight: '100vh' }} justifyContent="center" alignItems="center" container>
        <Grid item xs={12} sm={8} md={6} lg={4} >

          <Box my={4} px={4} justifyContent="center" textAlign="center">
            <Link to="/">
              <div className="logo" style={{ justifyContent: 'center', }}>Future Pay<div></div></div>
            </Link>
          </Box>
        
          <Box sx={{ backgroundColor: 'white' }} px={2} py={4} >
            {modal ? 
                (<>
                    <Box my={3} px={4} justifyContent="center" textAlign="center">
                        <h5 style={{ color: 'black', paddingTop: '20px' }}>FORGOT PASSWORD?</h5>
                        <span  style={{ color: 'black'}}>Enter your FUTUREPAY account email address</span>
                    </Box>
                    <form onSubmit={handleSubmit}>

                        <Stack spacing={4}>
                            {error && (
                            <Alert severity="error">{error}</Alert>
                            )}
                            <TextField  type="email" required variant="outlined" inputRef={emailRef} InputProps={{
                            startAdornment: (
                                <InputAdornment position="start"></InputAdornment>
                            ),
                            }} />
                        
                            {loading ? <div className="text-center"> <CircularProgress size={30} /></div> : <Button type="submit" onClick={handleSubmit} fullWidth disableElevation variant="contained">Reset Password</Button>}

                            <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between">
                            <p className="mem-tag">Remember password? <Link to="login">Login</Link></p>
                            </Stack>
                        </Stack>
                    </form>
                </>) : 
                (<>
                    <Box my={3} px={0} justifyContent="center" textAlign="center">
                        <h5 style={{ color: 'white', paddingTop: '20px', backgroundColor: '#f57c00', paddingBottom: '10px' }}>OKAY, WE SENT YOU AN EMAIL</h5>
                        <span  style={{ color: 'black'}}>Please click the link sent to your mail within the next 10 minutes</span>
                    </Box>
                    <Stack spacing={4}>
                        <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between">
                        <p className="mem-tag">Resend Link?  <Button onClick={handleSubmit}> Resend </Button> </p>
                        </Stack>
                    </Stack>
                </>) 
            }
          </Box>
        </Grid>
      </Grid>
    </Container>
  )
}

export default ForgotPassword;
