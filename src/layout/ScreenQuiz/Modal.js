import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useState } from 'react';
import { useEffect } from 'react';
import PassedOrFailedBox from '../../component/PassedOrFailedBox';
import CircularProgressBar from '../../component/CircularProgressBar';

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
/**
 * @param: answers: Array, maxMark: Number, displayResult: Boolean
 * @example: <ResultUI answers={answers} maxMark={maxMark} displayResult={displayResult} />
 * @description: this component is used to display the result of the quiz after the user has submitted the answer
 * @example: <ResultUI answers={answers} maxMark={maxMark} displayResult={displayResult} />
 * @author:vi le
 * @returns: JSX.Element
 */
export default function ResultUI({ answers, maxMark, displayResult }) {
  const [mark, setMark] = useState(null);
  const [isPassed, setIsPassed] = useState(true);
  const [percentage, setPercentage] = useState(0);
  useEffect(() => {
    localStorage.getItem('quizzKey');
  }, []);
  // calculate the percentage of the quiz that the user has answered
  useEffect(() => {
    setPercentage(Math.round((mark / maxMark) * 100));
  }, [mark, maxMark]);
  /**
   * @description: get the result from the backend and set the mark for the quiz
   * @author: Vi Le
   * @version:1.0.0.0
   */
  useEffect(() => {
    import('./QuizService').then((fn) => {
      let quizzKey = localStorage.getItem('examPw');

      fn.getResult(answers.slice(1), quizzKey).then((res) => {
        setMark(Number(res));
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [displayResult]);

  useEffect(() => {
    if (mark !== null) {
      localStorage.clear();
    }
  }, [mark]);
  /**
   * @description: check if the user has passed the quiz or not and set the result for the quiz
   * @author: Vi Le
   * @version:1.0.0.1
   */
  useEffect(() => {
    setIsPassed(mark <= Math.floor(maxMark / 2));
  }, [mark, maxMark]);
  return (
    <>
      <Modal open={displayResult} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Box sx={{ flexBasis: '50%' }}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {/* {JSON.stringify(answers)} */}
              {/* {mark}/{maxMark} */}
              {displayResult && <CircularProgressBar completionRate={percentage} isPassed={isPassed} />}
            </Typography>
          </Box>
          <Box sx={{ flexBasis: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <PassedOrFailedBox isPassed={isPassed} />
          </Box>
        </Box>
      </Modal>
    </>
  );
}
