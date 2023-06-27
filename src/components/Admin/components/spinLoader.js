import React from "react";
import { Spinner } from "react-bootstrap";
import "../styles/transaction.css";
import {Box} from '@mui/material'

function SpinLoader() {
  return (
    <Box sx={{p:'100px'}}>
      <div className="loading">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>

    </Box>
  );
}

export default SpinLoader;
