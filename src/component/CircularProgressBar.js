import { Box } from '@mui/material';
import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export default function CircularProgressBar({ completionRate, isPassed }) {
  return (
    <Box sx={{ width: '10vw', height: '10vw' }}>
      <CircularProgressbar
        styles={buildStyles({
          pathTransitionDuration: 0.5,
          trailColor: '#d6d6d6',
          pathColor: !isPassed ? '#3D850F' : '#C10914',
          textColor: !isPassed ? '#3D850F' : '#C10914',
        })}
        value={completionRate}
        text={`${completionRate}%`}
      />
    </Box>
  );
}

// export default CircularProgressBar;
