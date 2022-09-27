import React, { useEffect, useState } from "react";
import {
  Box,
  Paper,
  Backdrop,
  CircularProgress,
  Grid,
} from "@material-ui/core";
import { ticketRef } from "../../config/firebase";

const Dashboard = () => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let arr = [];
    ticketRef.get().then((docs) => {
      docs.forEach((doc) => {
        arr.push(doc.data());
      });
      setCount(arr.length);
    });
  }, []);
  return (
    <Box m={2}>
      <Box component={Paper} p={2} mb={3} elevation={3}>
        <Backdrop style={{ zIndex: "1000", color: "#fff" }} open={false}>
          <CircularProgress color="inherit" />
        </Backdrop>
        <h1>Auto Vision Services</h1>
      </Box>
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <Paper style={{ padding: "10px" }}>
            <h2>Total Customers</h2>
            <p>{count}</p>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper style={{ padding: "10px" }}>
            <h2>Total Tickets</h2>
            <p>{count}</p>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};
export default Dashboard;
