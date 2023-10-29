import { Container, Typography } from '@mui/material';
import React from 'react';
/**
 * @param : none
 * @example : <ErrorPage />
 * @description : This component is used to display the error page
 * @returns : JSX.Element
 * author : Vi Le
 * version : 1.0.0.0
 */
export default function ErrorPage() {
  return (
    <>
      <Container sx={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Typography color={'red'} variant="h1">
          ERROR PAGE :-(
        </Typography>
      </Container>
    </>
  );
}
