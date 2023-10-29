import { Box, Typography } from '@mui/material';
import React from 'react';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
/**
 *
 * @param: isPassed
 * @example: <PassedOrFailedBox isPassed={true} />
 * @description: This component is used to display the result of the quiz
 * @returns: JSX.Element
 * @author: Vi Le
 * @version:1.0.0.0
 */
export default function PassedOrFailedBox({ isPassed }) {
  return (
    <>
      {isPassed ? (
        <Box
          sx={{
            width: '20vw',
            height: '10vh',
            border: 'solid #C10914',
            display: 'flex',
            flexDirection: 'row',
            borderRadius: '10px',
          }}
        >
          {' '}
          <Box sx={{ flexBasis: '30%', justifyContent: 'center', alignItems: 'center' }}>
            <ClearIcon sx={{ fontSize: '10vh', color: '#C10914' }} />
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexBasis: '70%' }}>
            <Typography
              fontSize={'3vw'}
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
              Failed
            </Typography>
          </Box>
        </Box>
      ) : (
        <Box
          sx={{
            width: '20vw',
            height: '10vh',
            border: 'solid #3D850F',
            display: 'flex',
            flexDirection: 'row',
            borderRadius: '10px',
          }}
        >
          {' '}
          <Box sx={{ flexBasis: '30%', justifyContent: 'center', alignItems: 'center' }}>
            <CheckIcon sx={{ fontSize: '10vh', color: '#3D850F' }} />
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexBasis: '70%',
            }}
          >
            <Typography
              fontSize={'3vw'}
              sx={{
                color: '#3D850F',

                textAlign: 'center',
                fontFamily: 'Inter',
                fontSsize: '50vw',
                fontStyle: 'normal',
                fontWeight: 400,
                lineHeight: 'normal',
              }}
            >
              Passed
            </Typography>
          </Box>
        </Box>
      )}
    </>
  );
}
