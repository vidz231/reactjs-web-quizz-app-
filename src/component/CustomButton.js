import { Box, Button, ThemeProvider, alpha, createTheme, getContrastRatio } from '@mui/material';
import React from 'react';
const orangeBase = '#F96D15';
const orangeMain = alpha(orangeBase, 0.7);
const greenBase = '#008000';
const greenMain = alpha(greenBase, 0.7);
const theme = createTheme({
  palette: {
    orange: {
      main: orangeMain,
      light: alpha(orangeBase, 0.5),
      dark: alpha(orangeBase, 0.9),
      contrastText: getContrastRatio(orangeMain, '#fff') > 4.5 ? '#fff' : '#111',
    },
    green: {
      main: greenMain,
      light: alpha(greenBase, 0.5),
      dark: alpha(greenBase, 0.9),
      contrastText: getContrastRatio(greenMain, '#fff') > 4.5 ? '#fff' : '#111',
    },
  },
});
/**
 *
 * @param text,type,isSubmit
 * @returns
 */
export default function CustomButton({ text, type, isSubmit }) {
  return (
    <Box>
      <ThemeProvider theme={theme}>
        <Button type={type} variant="outlined" color={isSubmit ? 'green' : 'orange'}>
          {text}
        </Button>
      </ThemeProvider>
    </Box>
  );
}
