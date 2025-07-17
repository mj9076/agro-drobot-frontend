// src/components/AIDataCard.js
import React from 'react';
import { Paper, Typography, Box } from '@mui/material';
import { motion } from 'framer-motion';

const AIDataCard = ({ title, result, icon, recommendation }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      whileHover={{ scale: 1.05 }}
      style={{ width: '100%' }}
    >
      <Paper
        elevation={4}
        sx={{
          p: 3,
          background: `linear-gradient(135deg, #3f51b5 30%, #1a237e 90%)`,
          color: 'white',
          display: 'flex',
          flexDirection: 'column',
          borderRadius: '16px',
          boxShadow: '0 8px 16px rgba(0,0,0,0.3)',
          overflow: 'hidden',
          cursor: 'pointer',
          transition: 'transform 0.3s ease-in-out',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Box sx={{ fontSize: '2rem', mr: 1 }}>{icon}</Box>
          <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
            {title}
          </Typography>
        </Box>

        <Typography variant="body1" sx={{ mb: 1 }}>
          <strong>Result:</strong> {result}
        </Typography>

        {recommendation && (
          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)' }}>
            <strong>Recommendation:</strong> {recommendation}
          </Typography>
        )}
      </Paper>
    </motion.div>
  );
};

export default AIDataCard;
