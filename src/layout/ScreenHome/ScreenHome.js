import { Box, CircularProgress, Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import CustomButton from '../../component/CustomButton';
import { useLocation, useNavigate } from 'react-router-dom';
import CustomTextField from '../../component/CustomTextField';
import { KEY } from '../../const/Domain';

export default function ScreenHome() {
  const [data, setData] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [key, setKey] = useState('');
  const [isLogin, setIsLogin] = useState(false);
  const nav = useNavigate();
  const isFirstRenderRef = useRef(true);
  const [count, setCount] = useState(0);

  //check if the user has the key to access the quiz or not, if not, redirect to the home page
  useEffect(() => {
    if (!(key === '') && localStorage.getItem('examPw') !== key) {
      localStorage.clear();
    }
  }, [key]);

  const HandleKeyUp = (e) => {
    e.preventDefault();
    console.log(e);
    setData(e.target.value);
  };

  const HandleSubmit = (e) => {
    setIsLogin(true);
    e.preventDefault();
    console.log(data.length);
    console.log(KEY[0].length);
    console.log(data.length === KEY.length[0]);
    if (data.length === 36) {
      import('./HomeService.js').then((fn) => {
        fn.getKey(data).then((res) => {
          setKey(res);
        });
      });
    } else {
      setIsValid(false);
      setCount((pre) => pre + 1);
    }
    setTimeout(() => {
      setIsLogin(false);
    }, 2000);
  };
  useEffect(() => {
    if (key) {
      nav(`/quizz/${data}`);
      localStorage.setItem('examPw', data);
    } else {
      setIsValid(false);
    }
  }, [key]);

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
              Enter Quiz Key To Continue
            </Typography>
          </Box>
          <form
            onSubmit={HandleSubmit}
            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}
          >
            <Box>
              <CustomTextField
                label={'enter code'}
                isValid={isValid}
                helper={isValid ? '' : 'Invalid code'}
                onKeyUp={HandleKeyUp}
                isLogin={count > 0 ? false : true}
              />

              {count > 0 && !isLogin && (
                <Typography variant="p" textAlign={'center'} color={'red'}>
                  invalid code
                </Typography>
              )}
            </Box>

            <Box>
              <CustomButton
                type="submit"
                text={isLogin ? <CircularProgress size={'3vh'} color="secondary" /> : 'login'}
                isSubmit={true}
                isLogin={count > 0 && isLogin ? true : false}
              />
            </Box>
          </form>
        </Box>
      </Box>
    </>
  );
}
