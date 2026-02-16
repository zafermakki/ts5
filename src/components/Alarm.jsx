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
import AlarmIcon from "@mui/icons-material/Alarm";
import Swal from "sweetalert2";

const Alarm = () => {
  const [alarmTime, setAlarmTime] = useState("");
  const [isSet, setIsSet] = useState(false);

  const intervalRef = useRef(null);

  const audio = new Audio(
    "https://actions.google.com/sounds/v1/alarms/alarm_clock.ogg"
  );

  const handleSetAlarm = () => {
    if (!alarmTime) return;

    setIsSet(true);

    Swal.fire({
      icon: "success",
      title: "Alarm Set",
      text: `Alarm set for ${alarmTime}`,
      confirmButtonColor: "#1976d2",
    });
    
  };

  useEffect(() => {
    if (isSet) {
      intervalRef.current = setInterval(() => {
        const now = new Date();

        const hours = String(now.getHours()).padStart(2, "0");
        const minutes = String(now.getMinutes()).padStart(2, "0");

        const currentTime = `${hours}:${minutes}`;

        if (currentTime === alarmTime) {
          audio.play();

          Swal.fire({
            icon: "warning",
            title: "Alarm Ringing!",
            text: "Wake up! Your alarm time has been reached.",
            confirmButtonColor: "#d32f2f",
          });          

          clearInterval(intervalRef.current);

          setIsSet(false);
        }
      }, 1000);
    }

    return () => clearInterval(intervalRef.current);
  }, [isSet, alarmTime]);

  return (
    <Card elevation={4}>
      <CardContent>
        <Box display="flex" gap={1} alignItems="center">
          <AlarmIcon color="primary" />
          <Typography variant="h6">Alarm</Typography>
        </Box>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Select a time and the alarm will ring at that exact time
        </Typography>

        <Stack spacing={2}>
          <TextField
            label="Alarm Time"
            type="time"
            InputLabelProps={{ shrink: true }}
            value={alarmTime}
            onChange={(e) => setAlarmTime(e.target.value)}
            helperText="Select the time for alarm"
            fullWidth
          />

          <Button
            variant="contained"
            onClick={handleSetAlarm}
            disabled={isSet}
          >
            Set Alarm
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default Alarm;
