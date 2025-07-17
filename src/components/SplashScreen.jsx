// src/components/SplashScreen.jsx

import React from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';

const SplashScreen = () => {
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 9999,
        overflow: 'hidden',

        backgroundImage: "url('/my-agro-robot.jpg.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',

        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          backdropFilter: 'blur(8px)',
          zIndex: 1,
        },

        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',

        '@keyframes splashFadeOut': {
          '0%': { opacity: 1 },
          '90%': { opacity: 1 },
          '100%': { opacity: 0, visibility: 'hidden' },
        },
        animation: 'splashFadeOut 5s forwards',
      }}
    >
      {/* Glowing Panel */}
      <Box
        sx={{
          zIndex: 2,
          background: 'rgba(255, 255, 255, 0.06)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          borderRadius: '20px',
          padding: '30px 50px',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 0 30px rgba(161, 255, 112, 0.4)',
          textAlign: 'center',
          animation: 'fadeZoom 2s ease-out',
          '@keyframes fadeZoom': {
            '0%': { opacity: 0, transform: 'scale(0.85)' },
            '100%': { opacity: 1, transform: 'scale(1)' },
          },
        }}
      >
        <Typography
          variant="h3"
          sx={{
            fontFamily: 'Segoe UI, sans-serif',
            fontWeight: 'bold',
            letterSpacing: '6px',
            color: '#a1ff70',
            textShadow: '0 0 12px #a1ff70, 0 0 25px #76f153',
            marginBottom: 1.5,
            animation: 'textGlow 2s infinite ease-in-out',
            '@keyframes textGlow': {
              '0%': { textShadow: '0 0 8px #a1ff70' },
              '50%': { textShadow: '0 0 18px #76f153' },
              '100%': { textShadow: '0 0 8px #a1ff70' },
            },
          }}
        >
          AI BASED AGRO DROBOT
        </Typography>

        <Typography
          variant="subtitle1"
          sx={{
            color: '#e0ffe0',
            fontWeight: 400,
            marginBottom: 3,
            letterSpacing: '1px',
            fontSize: '18px',
            textShadow: '0 0 5px rgba(161,255,112,0.3)',
          }}
        >
          Revolutionizing Smart Farming with AI + IoT
        </Typography>

        <CircularProgress
          thickness={4}
          size={50}
          sx={{
            color: '#a1ff70',
          }}
        />
      </Box>
    </Box>
  );
};

export default SplashScreen;

