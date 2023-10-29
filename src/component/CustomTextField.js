import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { FormHelperText } from '@mui/material';
/**
 *
 * @param: label, id, helper, onKeyUp
 * @description: This component is used to display the customizable text field
 * @example: <CustomTextField label="Email" id="email" helper="Email is required" onKeyUp={handleEmail} />
 * @returns: JSX.Element
 * @author: Vi Le
 * @version:1.0.0.0
 */
export default function CustomTextField({ label, id, helper, onKeyUp }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& > :not(style)': { m: 1 },
      }}
    >
      <TextField id={id} label={label} onKeyUp={onKeyUp} sx={{ width: '100%' }} />
      <FormHelperText style={{ color: 'red' }}>{helper}</FormHelperText>
    </Box>
  );
}
