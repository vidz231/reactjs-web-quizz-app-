import { Container, Typography } from '@mui/material';
import React from 'react';
import CustomButton from './CustomButton';
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
      <Container
        sx={{
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <Typography color={'red'} variant="h1">
          😭 PAGE NOT FOUND 😭
        </Typography>
        <CustomButton
          text={'Go back to home page'}
          type={'button'}
          isSubmit={false}
          onClick={() => window.location.replace('/')}
        />
      </Container>
    </>
  );
}
