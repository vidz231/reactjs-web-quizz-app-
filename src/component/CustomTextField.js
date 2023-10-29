import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
/**
 *
 * @param: label, id, onKeyUp
 * @description: This component is used to display the customizable text field
 * @example:  <CustomTextField label={'Enter your name'} id={'name'} onKeyUp={HandleName} />
 * @returns: JSX.Element
 * @author: Vi Le
 * @version:1.0.0.2
 */
export default function CustomTextField({ label, id, onKeyUp, isLogin }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& > :not(style)': { m: 1 },
      }}
    >
      <TextField error={!isLogin} id={id} label={label} onKeyUp={onKeyUp} sx={{ width: '100%' }} />
    </Box>
  );
}
