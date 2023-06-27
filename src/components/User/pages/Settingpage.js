import React, { useState, forwardRef, useEffect } from "react";
import { Box, Dialog, DialogTitle, DialogActions, DialogContent, DialogContentText, InputAdornment, Slide, Badge, Avatar, TextField, IconButton, Button, Grid, Stack } from "@mui/material";
import { Visibility, VisibilityOff, PhotoCamera } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
// import { icons } from "../../../assets";
import ProfileManager from '../../../services/profile'
import { SERVER_URL } from "../../../api/config";
import { icons } from "../../../assets";

const Input = styled("input")({
  display: "none",
});

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const profileManager = new ProfileManager()

export default function Settingpage() {

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    location: "",
    phone: "",
  };


  const [open, setOpen] = useState(false);
  const [isRevealPwd, setIsRevealPwd] = useState(false);
  const [values, setValue] = useState(initialValues);
  const [avatar, setAvatar] = useState(null);
  const [action, setAction] = useState(false);
  const [message, setMessage] = useState("");

  const items = [
    { id: "firstName", name: "firstName", label: "First Name", placeholder: "John", value: values.firstName },
    { id: "lastName", name: "lastName", label: "Last Name", placeholder: "Peters", value: values.lastName },
    { id: "emailAddress", name: "email", label: "Email Address", placeholder: "johnp@gmail.com", value: values.email },
    { id: "phoneNumber", name: "phone", label: "Phone Number", placeholder: "+234 000 000 0000", value: values.phone },
    { id: "password", label: "Password" },
    { id: "location", name: "location", label: "Location", placeholder: "Uyo, Nigeria", value: values.location },
  ]



  const handleClickOpen = event => {
    setOpen(true);
    setAction(event)
    if (event === 'save') {
      setMessage("Are you sure you want to save the changes?")
    } else {
      setMessage("Are you sure you want to delete this account? this action is irrevocable!")
    }
  };


  const handleSubmit = async () => {
    if (action === 'save') {
      console.log(values);
      values['fullname'] = values['firstName'] + ' ' + values['lastName']
      await profileManager.editProfile(values, avatar).catch(e => {
        //display error message
        console.log(e.message)
      })
    }
    setOpen(false)
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = event => {
    const { name, value } = event.target;
    setValue({ ...values, [name]: value });
  };


  useEffect(() => {
    async function getData() {
      profileManager.getProfile().then((data) => {
        if (data.fullname) {
          const [firstName, lastName] = data.fullname.split(' ', 2)
          setValue({ ...data, firstName, lastName })
        }
      }).catch((e) => {
        //display error 
        console.log(e.message)
      })
    }
    getData()
  }, [])



  return (
    <Grid
      sx={{ minHeight: "100vh" }}
      justifyContent="center"
      alignItems="center"
      container
    >
      <Grid item xs={12} sm={8} md={6} lg={8}>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 4, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <>
            <Stack
              direction={{ xs: "row", sm: "row", lg: "row" }}
              justifyContent="center"
              width="80%"
            >
              <Badge
                overlap="circular"
                sx={{ height: 80 }}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                badgeContent={
                  <label htmlFor="icon-button-file">
                    <Input onChange={(e) => setAvatar(e.target.files[0])} accept="image/*" id="icon-button-file" type="file" />
                    <IconButton
                      color="primary"
                      aria-label="upload picture"
                      component="span"
                    >
                      <PhotoCamera />
                    </IconButton>
                  </label>
                }
              >
                <Avatar
                  alt="avatar"
                  sx={{ width: 90, height: 90 }}
                  src={values.avatar ? `${SERVER_URL}/profile/avatar/${values.avatar}` : icons.profileadmin}
                />
              </Badge>
            </Stack>
            {items.map((item) => {
              return item.id !== "password" ? (
                <TextField
                  key={item.id}
                  label={item.label}
                  id={item.id}
                  name={item.name}
                  value={values[item.name]}
                  variant="standard"
                  onChange={handleChange}
                />
              ) : (
                <TextField
                  key={item.id}
                  type={isRevealPwd ? "text" : "password"}
                  label={item.label}
                  variant="standard"
                  name="password"
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        {/* <Lock /> */}
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => {
                            setIsRevealPwd(!isRevealPwd);
                          }}
                        >
                          {isRevealPwd ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              );
            })}
            <Stack direction={{ xs: "column", sm: "row", lg: "row" }} justifyContent="center" width="80%" margin="auto" marginTop="7%">
              {/* <Button color="error" onClick={() => handleClickOpen('delete')}>Delete my account</Button> */}
              <Button variant="contained" color="warning" onClick={() => handleClickOpen('save')}>Save Changes</Button>
              <Dialog open={open} TransitionComponent={Transition} keepMounted onClose={handleClose} aria-describedby="alert-dialog-slide-description">
                <DialogTitle>{"FuturePay"}</DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-slide-description">
                    {message}
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose}>Disagree</Button>
                  <Button onClick={handleSubmit}>Agree</Button>
                </DialogActions>
              </Dialog>
            </Stack>
          </>
        </Box>
      </Grid>
    </Grid>
  );
}
