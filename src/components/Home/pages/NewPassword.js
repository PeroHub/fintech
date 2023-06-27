import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import { TextField, Button, Container, IconButton, InputAdornment, Grid, Stack, Box, Alert, CircularProgress } from "@mui/material";
import { Close, } from "@mui/icons-material";

function NewPassword(props) {
  const password1Ref = useRef();
  const passwordRef = useRef();
  const { resetPassword } = useAuth();
  const [error, setError] = useState("");
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  console.log(props);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      if(password1Ref.current.value !== passwordRef.current.value || password1Ref.current.value ===''){
        throw new Error('password 1 & 2 is required and must be the same')
      }
      setError("");
      setLoading(true);
      await resetPassword({...data,password:passwordRef.current.value});
      history.replace("/user");
    } catch (e) {
      setError(e.message)
    }
    setLoading(false);
  }

  useEffect(() => {
    setData(props.match.params)
  }, [props.match.params])


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
            <Box my={3} px={4} justifyContent="center" textAlign="center">
              <h5 style={{ color: 'black', paddingTop: '20px' }}> New Password </h5>
              <span style={{ color: 'black' }}>Please enter your new password</span>
            </Box>
            <form onSubmit={handleSubmit}>
              <Stack spacing={4}>
                {error && (
                  <Alert severity="error">{error}</Alert>
                )}
                <span>New Password</span>
                <TextField type="password" variant="outlined" inputRef={password1Ref} InputProps={{
                  startAdornment: (
                    <InputAdornment position="start"></InputAdornment>
                  ),
                }} />

                <span>Confirm Password</span>
                <TextField type="password" variant="outlined" inputRef={passwordRef} InputProps={{
                  startAdornment: (
                    <InputAdornment position="start"></InputAdornment>
                  ),
                }} />

                {loading ? <div className="text-center"> <CircularProgress size={30} /></div> : <Button type="submit" fullWidth disableElevation variant="contained">Reset</Button>}

                <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between">
                  <p className="mem-tag">Remember password? <Link to="login">Login</Link></p>
                </Stack>
              </Stack>
            </form>
          </Box>
        </Grid>
      </Grid>
    </Container>
  )
}

export default NewPassword;
