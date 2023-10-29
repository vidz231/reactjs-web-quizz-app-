import React from 'react';
import ScreenHome from './layout/ScreenHome/ScreenHome';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ScreenQuiz from './layout/ScreenQuiz/ScreenQuiz';
import { Box } from '@mui/material';
import ErrorPage from './component/ErrorPage';

export default function App() {
  return (
    <Box sx={{ bgcolor: '#D5CCE5' }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ScreenHome />} />
          <Route path="/quizz" element={<ErrorPage />} />
          <Route path="/quizz/:quizzKey" element={<ScreenQuiz />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </Box>
  );
}
