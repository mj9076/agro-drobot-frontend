// src/components/PiCameraFeed.jsx

import React from "react";
import { Paper, Typography } from "@mui/material";
import { motion } from "framer-motion";

const PiCameraFeed = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      style={{
        display: "flex",
        justifyContent: "center"
      }}
    >
      <Paper
        sx={{
          background: "rgba(10, 50, 10, 0.4)",
          border: "1px solid rgba(100, 255, 100, 0.3)",
          borderRadius: "12px",
          padding: "16px",
          backdropFilter: "blur(10px)",
          color: "#ffffff",
          textAlign: "center",
          width: "100%",
          maxWidth: "400px"  // ✅ This sets the max width
        }}
      >
        <Typography variant="h5" sx={{ color: "#aee571", mb: 2 }}>
          Live Raspberry Pi Camera Feed
        </Typography>
        <img
          src="http://192.168.100.80:8081/"
          alt="Pi Camera Feed"
          style={{
            width: "100%",
            borderRadius: "12px",
            border: "2px solid #aee571",
            objectFit: "cover",
            boxShadow: "0 0 20px rgba(174, 229, 113, 0.4)"
          }}
        />
      </Paper>
    </motion.div>
  );
};

export default PiCameraFeed;
