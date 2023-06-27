import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";

export default function DateComponent() {
  const [value, setValue] = useState(new Date());

  //   const handleChange = (newValue) => {
  //     setValue(newValue);
  //   };

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
          }}
          renderInput={(params) => <TextField {...params} sx={{marginTop: '.2rem'}}/>}
        />
      </LocalizationProvider>
    </>
  );
}
