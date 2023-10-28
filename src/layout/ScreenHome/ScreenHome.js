import { Box, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import CustomButton from '../../component/CustomButton';
import { useNavigate } from 'react-router-dom';
import CustomTextField from '../../component/CustomTextField';
import { KEY } from '../../const/Domain';

export default function ScreenHome() {
  const [data, setData] = useState('');
  const [isValid, setIsValid] = useState(true);

  const nav = useNavigate();
  //   const [code, setCode] = useState('');
  useEffect(() => {
    if (!(data === '') && localStorage.getItem('examPw') !== data) {
      localStorage.clear();
    }
  }, [data]);
  const HandleKeyUp = (e) => {
    e.preventDefault();
    console.log(e);
    setData(e.target.value);
  };
  const HandleSubmit = (e) => {
    e.preventDefault(); // Prevent the form from refreshing the page
    if (data === KEY.find((s) => s === data)) {
      nav(`/quizz/${data}`);
      localStorage.setItem('examPw', data);
    } else {
      setIsValid(false);
    }
  };

  return (
    <>
      <Box
        sx={{
          width: '100vw',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            width: '30vw',
            height: '40vh',
            display: 'flex',
            flexFlow: 'column nowrap',
            justifyContent: 'space-evenly',
            alignItems: 'center',
          }}
        >
          <Box>
            <Typography variant="h4" textAlign={'center'}>
              {' '}
              Enter Quizz Key To Continue
            </Typography>
          </Box>
          <form
            onSubmit={HandleSubmit}
            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}
          >
            <Box>
              <CustomTextField label={'enter code'} helper={isValid ? '' : 'Invalid code'} onKeyUp={HandleKeyUp} />
            </Box>
            <Box>
              <CustomButton type="submit" text="login" isSubmit={true} />
            </Box>
          </form>
        </Box>
      </Box>
    </>
  );
}
