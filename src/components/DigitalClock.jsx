import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

const DigitalClock = () => {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();

      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      const seconds = String(now.getSeconds()).padStart(2, "0");

      setTime(`${hours}:${minutes}:${seconds}`);
    };

    updateClock();

    const interval = setInterval(updateClock, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Card elevation={4}>
      <CardContent>
        <Box display="flex" alignItems="center" gap={1}>
          <AccessTimeIcon color="primary" />
          <Typography variant="h6">Digital Clock</Typography>
        </Box>

        <Typography
          variant="h3"
          align="center"
          sx={{ mt: 2, fontWeight: "bold" }}
        >
          {time}
        </Typography>

      </CardContent>
    </Card>
  );
};

export default DigitalClock;
