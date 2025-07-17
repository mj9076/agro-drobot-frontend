import React from "react";
import {
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider
} from "@mui/material";

const LoRaMessages = ({ lora1, lora2 }) => {
  return (
    <Paper
      sx={{
        p: 2,
        backgroundColor: "rgba(255,255,255,0.1)",
        color: "#fff"
      }}
    >
      <Typography variant="h6" sx={{ mb: 2 }}>
        LoRa Module 1
      </Typography>

      <Typography variant="subtitle1" sx={{ mb: 1 }}>
        ✅ Received from LoRa 1:
      </Typography>
      <List dense>
        {lora1.received.length === 0 ? (
          <ListItem>
            <ListItemText primary="No messages received." />
          </ListItem>
        ) : (
          lora1.received.map((msg, idx) => (
            <ListItem key={idx}>
              <ListItemText primary={msg} />
            </ListItem>
          ))
        )}
      </List>

      <Typography variant="subtitle1" sx={{ mt: 2, mb: 1 }}>
        📤 Sent to LoRa 2:
      </Typography>
      <List dense>
        {lora1.sent.length === 0 ? (
          <ListItem>
            <ListItemText primary="No messages sent." />
          </ListItem>
        ) : (
          lora1.sent.map((msg, idx) => (
            <ListItem key={idx}>
              <ListItemText primary={msg} />
            </ListItem>
          ))
        )}
      </List>

      <Divider sx={{ my: 3, borderColor: "rgba(255,255,255,0.3)" }} />

      <Typography variant="h6" sx={{ mb: 2 }}>
        LoRa Module 2
      </Typography>

      <Typography variant="subtitle1" sx={{ mb: 1 }}>
        ✅ Received from LoRa 2:
      </Typography>
      <List dense>
        {lora2.received.length === 0 ? (
          <ListItem>
            <ListItemText primary="No messages received." />
          </ListItem>
        ) : (
          lora2.received.map((msg, idx) => (
            <ListItem key={idx}>
              <ListItemText primary={msg} />
            </ListItem>
          ))
        )}
      </List>

      <Typography variant="subtitle1" sx={{ mt: 2, mb: 1 }}>
        📤 Sent to LoRa 1:
      </Typography>
      <List dense>
        {lora2.sent.length === 0 ? (
          <ListItem>
            <ListItemText primary="No messages sent." />
          </ListItem>
        ) : (
          lora2.sent.map((msg, idx) => (
            <ListItem key={idx}>
              <ListItemText primary={msg} />
            </ListItem>
          ))
        )}
      </List>
    </Paper>
  );
};

export default LoRaMessages;
