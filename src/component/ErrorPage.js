import { Container, Typography } from '@mui/material';
import React from 'react';

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
