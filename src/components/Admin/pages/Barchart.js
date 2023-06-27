import React from 'react'
import '../styles/transaction.css'
import { Bar } from 'react-chartjs-2';
 import Grid from '@mui/material/Grid';
 import Stack from '@mui/material/Stack';
 

 const state = {
  labels: ['January', 'February', 'March',
           'April', 'May'],
  datasets: [
    {
      label: 'Rainfall',
      backgroundColor: 'rgba(75,192,192,1)',
      borderColor: 'rgba(0,0,0,1)',
      borderWidth: 2,
      data: [65, 59, 80, 81, 56]
    }
  ]
}

function Barchart() {
    return (
      <div>
         <Grid  container spacing={2} >
        <Grid item xs={12} md={12}>
        <Stack direction="row" spacing={5}>
         <p>Transaction Stat</p>
         <p>Previous Week</p>
         <p> This Week</p>
         <p> This Week</p>
       </Stack>
       {/* <Bar
          data={state}
          options={{
            title:{
              display:true,
              text:'Average Rainfall per month',
              fontSize:20
            },
            legend:{
              display:true,
              position:'right'
            }
          }}
        /> */}
        </Grid>
        </Grid>
        
      </div>
    )
}

export default Barchart
