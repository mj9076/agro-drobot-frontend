// src/components/SplashScreen.jsx
// This component displays the introductory splash screen for your Drobot dashboard,
// featuring a static agricultural image background from the public folder and smooth animations.

import React from 'react';
import { Box, Typography } from '@mui/material';

const SplashScreen = () => {
  // Function to handle potential image loading errors (optional, but good practice)
  const handleImageError = (e) => {
    console.error('Image loading error:', e.target.src);
    // You could set a state here to show a fallback color or message
  };

  return (
    <Box sx={{
      // --- Overall Splash Screen Container Styles ---
      position: 'fixed', // Ensures it covers the entire viewport
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      zIndex: 9999, // Ensures it's always on top of other content
      overflow: 'hidden', // Hide any overflow from the background image

      backgroundImage: "url('/my-agro-robot.jpg.png')", // <--- PASTE YOUR IMAGE FILENAME HERE (e.g., '/my-agro-robot.jpg')
      backgroundSize: 'cover',        // Cover the entire container
      backgroundPosition: 'center',   // Center the image
      backgroundRepeat: 'no-repeat',  // Do not repeat the image
      
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.95) 100%)',
        zIndex: 1, // Place overlay above background image but below text
      },

      // Flexbox for centering the text content
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',

      // --- Animation for the entire splash screen (fade out) ---
      // This animation makes the whole splash screen fade out after its display time.
      '@keyframes splashFadeOut': {
        '0%': { opacity: 1 },     // Start fully visible
        '85%': { opacity: 1 },    // Stay visible for most of the duration
        '100%': { opacity: 0, visibility: 'hidden' }, // Fade out completely and hide element
      },
      animation: 'splashFadeOut 3.5s forwards', // 3.5 seconds duration, stays at end state
    }}>
      {/* The text "AI Based Agro Drobot" */}
      <Typography variant="h2" component="h1" sx={{
        color: '#a1ff70', // Your theme's vibrant green color
        textShadow: '0 0 10px #a1ff70, 0 0 20px #a1ff70, 0 0 30px #a1ff70', // Glowing text effect
        fontFamily: 'Segoe UI, sans-serif',
        fontWeight: 'bold',
        letterSpacing: '5px', // Spacing between letters for a stylish look
        textAlign: 'center',
        zIndex: 2, // Ensure text is above the overlay

      
        '@keyframes textRevealFade': {
          '0%': { opacity: 0, transform: 'translateY(20px)' }, // Start invisible, slightly below
          '15%': { opacity: 1, transform: 'translateY(0)' },  // Fade in and slide up
          '80%': { opacity: 1, transform: 'translateY(0)' },  // Stay visible
          '100%': { opacity: 0, transform: 'translateY(-20px)' }, // Fade out and slide slightly up
        },
        // Apply the text animation. It starts slightly after the background animation.
        animation: 'textRevealFade 3s forwards', // Adjusted duration for text animation
        animationDelay: '0.5s', // Start text animation 0.5 seconds after splash screen appears
      }}>
        AI Based Agro Drobot
      </Typography>
    </Box>
  );
};

export default SplashScreen;
