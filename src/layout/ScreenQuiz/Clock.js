import { Box, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
/**
 * @param: HandleSubmit:Function
 * @example: <Clock/>
 * @description: This component is used to display a clock timer on the screen
 * @returns: JSX.Element
 * @author: Vi Le
 * @version:1.0.0.0
 */
export default function Clock({ HandleSubmit }) {
  const [timer, setTimer] = useState(10);
  const [time, setTime] = useState(null);
  // Get the time left from localStorage when the component mounts
  useEffect(() => {
    const storedTime = localStorage.getItem('timeLeft');
    if (storedTime && !isNaN(storedTime) && Number(storedTime) > 0) {
      setTimer(Number(storedTime));
    }
  }, []);

  // Update the timer every second
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

  // Format the time left into mm:ss
  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;
  useEffect(() => {
    import('../../utils/StringUtils').then((StringUtils) => {
      const formattedTime = StringUtils.formatTime(minutes, seconds);
      setTime(formattedTime);
    });
  }, [minutes, seconds]);

  // When the timer reaches 0, submit the quiz
  useEffect(() => {
    if (timer === 0) {
      HandleSubmit();
    }
  }, [timer, HandleSubmit]);

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
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: 'white',
        }}
      >
        <Typography
          variant="h1"
          textAlign={'center'}
          sx={{
            display: 'flex',
            fontSize: '3vw',
            lineHeight: '1',
          }}
        >
          {time}
        </Typography>
      </Box>
    </>
  );
}
