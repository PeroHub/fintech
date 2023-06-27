import React, { useEffect, useState } from "react";
import { icons } from "../../../assets";
import { Link } from 'react-router-dom'
import { Box, Typography, Card, CardContent, Grid, Avatar } from "@mui/material";
import ProfileManager from '../../../services/profile'
import { SERVER_URL } from "../../../api/config";

const details = [
  { id: 1, header: 'Mobile Number', key:'phone', content: '09012345678' },
  { id: 2, header: 'Transactions', key:'transactions', content: '13' },
  { id: 3, header: 'Location', key:'location', content: 'Uyo, Nigeria' },
]


const profileManager = new ProfileManager()

export default function Profilepage() {


  const [values, setValues] = useState({})

  useEffect(() => {
    async function getData() {
      profileManager.getProfile().then((data) => {
        if (data.fullname) {
          const [firstName, lastName] = data.fullname.split(' ', 2)
          setValues({ ...data, firstName, lastName })
        }
      }).catch((e) => {
        //display error 
        console.log(e.message)
      })
    }
    getData()
  }, [])


  return (
    <Box sx={{ width: { xs: '100%', sm: '100%', md: '80%', lg: '70%' }, height: '100%', mx: "auto", mt: 10 }}>
      <Card sx={{ boxShadow: "0px 4px 26px rgba(100, 100, 100, 0.15)", height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%', }}>
          <Grid container spacing={2}>
            <Grid item>
              <Avatar
                alt="avatar"
                sx={{ width: 90, height: 90 }}
                src={values.avatar ? `${SERVER_URL}/profile/avatar/${values.avatar}` : icons.profileadmin}
              />
            </Grid>
            <Grid item xs={6} mt={2} sm contaniner>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs >
                  <Typography variant="body2" gutterBottom>
                    {values.fullname ?? 'NA'}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {values.email ?? 'NA'}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Typography variant="subtitle1" component="div" p={2}>
                <Link to="/user/settings">Edit Profile</Link>
              </Typography>
            </Grid>
          </Grid>

          <Grid container columns={{ xs: 12, sm: 2, md: 6, lg: 2 }} xs={12} sm={8} md={6} lg={5} spacing={2} display="flex" justifyContent="center" alignItems="center" >
            {
              details.map(item => {
                return (
                  <Grid item xs={12} sm={8} md={6} lg={4} key={item.id}>
                    <Typography variant="body2" gutterBottom>
                      {item.header}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {values[item.key] ?? 'NA'}
                    </Typography>
                  </Grid>
                )
              })
            }
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
}
