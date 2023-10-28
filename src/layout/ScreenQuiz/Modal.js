import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useState } from 'react';
import { useEffect } from 'react';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',

  transform: 'translate(-50%, -50%)',
  width: '30%',
  height: '60%',
  bgcolor: '#D3E0AF',
  border: '25px solid #623F1F',
  borderRadius: '10%',

  boxShadow: 24,
  display: 'flex',
  p: 4,
  flexFlow: 'column',
  alignItems: ' center',
};

export default function ResultUI({ answers, maxMark, displayResult }) {
  const [mark, setMark] = useState(0);
  useEffect(() => {
    import('./QuizService').then((fn) => {
      fn.getTempResult(answers).then((res) => {
        setMark(res.mark);
      });
    });
  }, []);
  return (
    <>
      <Modal open={displayResult} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Box sx={{ flexBasis: '50%' }}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {/* {JSON.stringify(answers)} */}
              {mark}/{maxMark}
            </Typography>
          </Box>
          <Box sx={{ flexBasis: '50%' }}>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              hehe
              {maxMark}
            </Typography>
          </Box>
        </Box>
      </Modal>
    </>
  );
}
