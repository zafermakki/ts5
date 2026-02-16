import React, { useEffect, useRef, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Stack,
  Box,
} from "@mui/material";
import TimerIcon from "@mui/icons-material/Timer";
import Swal from "sweetalert2";

const CountdownTimer = () => {
  const [minutes, setMinutes] = useState("");
  const [seconds, setSeconds] = useState("");
  const [totalSeconds, setTotalSeconds] = useState(0);

  const [isRunning, setIsRunning] = useState(false);

  const intervalRef = useRef(null);

  const audio = new Audio(
    "https://actions.google.com/sounds/v1/alarms/alarm_clock.ogg"
  );

  const handleMinutesChange = (e) => {
    const value = Number(e.target.value);
    if (value >= 0) setMinutes(value);
  };

  const handleSecondsChange = (e) => {
    const value = Number(e.target.value);
    if (value >= 0 && value <= 59) setSeconds(value);
  };

  const handleStart = () => {
    if (totalSeconds > 0) {
      setIsRunning(true);
      return;
    }
  
    const total = Number(minutes) * 60 + Number(seconds);
  
    if (total <= 0) return;
  
    setTotalSeconds(total);
    setIsRunning(true);
  };
  

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTotalSeconds(0);
  };

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTotalSeconds((prev) => {
          if (prev <= 1) {
            clearInterval(intervalRef.current);
            setIsRunning(false);

            audio.play();
            Swal.fire({
              icon: "success",
              title: "Time's up!",
              text: "The countdown timer has finished.",
              confirmButtonColor: "#1976d2",
            });

            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  const displayMinutes = String(Math.floor(totalSeconds / 60)).padStart(
    2,
    "0"
  );

  const displaySeconds = String(totalSeconds % 60).padStart(2, "0");

  return (
    <Card elevation={4}>
      <CardContent>
        <Box display="flex" gap={1} alignItems="center">
          <TimerIcon color="primary" />
          <Typography variant="h6">Countdown Timer</Typography>
        </Box>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Enter minutes and seconds, then press Start
        </Typography>

        <Stack direction="row" spacing={2} mb={2}>
          <TextField
            label="Minutes"
            type="number"
            fullWidth
            value={minutes}
            inputProps={{ min: 0 }}
            onChange={handleMinutesChange}
          />

          <TextField
            label="Seconds"
            type="number"
            fullWidth
            value={seconds}
            inputProps={{ min: 0, max: 59 }}
            onChange={handleSecondsChange}
          />
        </Stack>

        <Typography
          variant="h4"
          align="center"
          fontWeight="bold"
          sx={{ mb: 2 }}
        >
          {displayMinutes}:{displaySeconds}
        </Typography>

        <Stack direction="row" spacing={2}>
        <Button
            variant="contained"
            fullWidth
            onClick={handleStart}
            disabled={isRunning}
            >
            {totalSeconds > 0 ? "Resume" : "Start"}
        </Button>


        <Button
            variant="outlined"
            fullWidth
            onClick={handlePause}
            disabled={!isRunning}
          >
            Pause
        </Button>

        <Button variant="contained" color="error" fullWidth onClick={handleReset}>
            Reset
        </Button>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default CountdownTimer;
