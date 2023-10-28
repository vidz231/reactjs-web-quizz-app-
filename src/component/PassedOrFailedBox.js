import { Box, Typography } from '@mui/material';
import React from 'react';
import CheckIcon from '@mui/icons-material/Check';
export default function PassedOrFailedBox() {
  return (
    <>
      <Box sx={{ width: '20vw', height: '10vh', border: 'solid #C10914', display: 'flex', flexDirection: 'row' }}>
        {' '}
        <Box sx={{ flexBasis: '30%', justifyContent: 'center', alignItems: 'center' }}>
          <CheckIcon sx={{ fontSize: '10vh', color: '#C10914' }} />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexBasis: '70%' }}>
          <Typography
            sx={{
              color: '#C10914',

              textAlign: 'center',
              fontFamily: 'Inter',
              fontSsize: '30vw',
              fontStyle: 'normal',
              fontWeight: 400,
              lineHeight: 'normal',
            }}
          >
            Passed away
          </Typography>
        </Box>
      </Box>
    </>
  );
}
