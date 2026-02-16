import React from "react";
import { Container, Typography, Grid } from "@mui/material";
import DigitalClock from "./components/DigitalClock";
import CountdownTimer from "./components/CountdownTimer";
import Alarm from "./components/Alarm";

const App = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" align="center" gutterBottom fontWeight="bold">
        Time Management Application
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <DigitalClock />
        </Grid>

        <Grid item xs={12} md={4}>
          <CountdownTimer />
        </Grid>

        <Grid item xs={12} md={4}>
          <Alarm />
        </Grid>
      </Grid>
    </Container>
  );
};

export default App;
