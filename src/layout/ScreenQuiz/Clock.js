import { Box, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
/**
 * @param: none
 * @example: <Clock/>
 * @description: This component is used to display a clock on the screen
 * @returns: JSX.Element
 * @author: Vi Le
 * @version:1.0.0.0
 */
export default function Clock() {
  const [timer, setTimer] = useState(3600);
  useEffect(() => {
    // Get the time left from localStorage when the component mounts
    const storedTime = localStorage.getItem('timeLeft');

    // If there's a stored time and it's not NaN or negative, use it
    if (storedTime && !isNaN(storedTime) && Number(storedTime) > 0) {
      setTimer(Number(storedTime));
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((pre) => {
        if (pre === 0) {
          clearInterval(interval);
          return pre;
        }
        const newTime = pre - 1;
        localStorage.setItem('timeLeft', newTime);
        return newTime;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;
  useEffect(() => {
    if (timer === 0) {
      console.log('submit');
    }
  }, [timer]);

  return (
    <>
      <Box
        sx={{
          position: 'fixed',
          width: '10vw',
          height: '10vw',
          flexShrink: '0',
          borderRadius: '10vw',
          border: 'solid #623F1F thick',
          top: '5%',
          right: '2%',
          display: 'flex', // Add this
          alignItems: 'center', // Add this
          justifyContent: 'center', // Add this
          bgcolor: 'white',
        }}
      >
        <Typography
          variant="h1"
          textAlign={'center'}
          sx={{
            display: 'flex',
            fontSize: '3vw', // Adjust this as needed
            lineHeight: '1', // Adjust this as needed
          }}
        >
          {minutes}:{seconds}
          {/* <Countdown  date={Date.now() + 100000} /> */}
        </Typography>
      </Box>
    </>
  );
}
