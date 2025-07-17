import React from 'react';
import { Paper, Typography, Box } from '@mui/material';
import { motion } from 'framer-motion';

const SensorDataCard = ({ title, value, unit, icon }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.04 }}
      style={{
        width: '100%',
        height: '100%',
      }}
    >
      <Paper
        elevation={0}
        sx={{
          p: 2,
          borderRadius: '16px',
          background: `rgba(30, 30, 40, 0.6)`,
          backdropFilter: `blur(8px)`,
          border: `1px solid rgba(255, 255, 255, 0.08)`,
          backgroundImage: `
            linear-gradient(
              rgba(30, 30, 40, 0.6),
              rgba(30, 30, 40, 0.6)
            )
          `,
          boxShadow: `0 4px 12px rgba(0,0,0,0.3)`,
          color: '#ffffff',
          transition: 'all 0.3s ease',
          "&:hover": {
            boxShadow: `0 8px 24px rgba(0,0,0,0.5)`,
            borderColor: 'rgba(173, 216, 230, 0.4)',
            background: `rgba(45, 45, 60, 0.7)`,
          },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Box
            sx={{
              fontSize: '2rem',
              mr: 1,
              color: 'rgba(173, 216, 230, 0.8)',
            }}
          >
            {icon}
          </Box>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              color: '#e3f2fd',
              letterSpacing: '0.5px',
            }}
          >
            {title}
          </Typography>
        </Box>

        <Typography
          variant="body2"
          sx={{
            fontSize: '0.95rem',
            color: '#cfd8dc',
          }}
        >
          <strong>Result:</strong> {value} {unit}
        </Typography>
      </Paper>
    </motion.div>
  );
};

export default SensorDataCard;
