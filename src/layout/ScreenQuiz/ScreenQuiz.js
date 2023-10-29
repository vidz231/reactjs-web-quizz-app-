import { Box, Container, Skeleton, Typography } from '@mui/material';
import React, { lazy, useEffect, useLayoutEffect, useState, Suspense } from 'react';
import { json, useNavigate, useParams } from 'react-router-dom';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
// import CustomQuizCard from './CustomQuizCard';
// import Clock from './Clock';
import ResultUI from './Modal';
import CustomButton from '../../component/CustomButton';
// import LinearDeterminate from '../../component/SliderProgress';
const Clock = lazy(() => import('./Clock'));
const LinearDeterminate = lazy(() => import('../../component/SliderProgress'));
const CustomQuizCard = lazy(() => import('./CustomQuizCard'));

/**
 *
 * @description: this function is used to display the quiz screen
 * @returns: JSX.Element
 * @author: Vi Le
 * @version: 1.0.0.0
 */

export default function ScreenQuiz() {
  const nav = useNavigate();
  const { quizzKey } = useParams();
  const [quizzData, setQuizzData] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [maxMark, setMaxMark] = useState(0);
  const [isDisplay, setIsDisplay] = useState(false);

  useEffect(() => {
    const localAnswer = localStorage.getItem('ans');
    // setAnswers(JSON.parse(localAnswer));
    setAnswers(JSON.parse(localAnswer) || []);
  }, []);
  //save cuurent user state to local storage
  useEffect(() => {
    localStorage.setItem('ans', JSON.stringify(answers));
  }, [answers]);

  /**
   * @description: check if the user has the key to access the quiz or not, if not, redirect to the home page
   * @author: Vi Le
   * @version:1.0.0.0
   */
  useEffect(() => {
    if (!localStorage.getItem('examPw') || quizzKey !== localStorage.getItem('examPw')) {
      nav('/');
    }
    if (quizzKey === undefined) {
      nav('*');
    }
  }, [nav, quizzKey]);
  /**
   * @description: get the data from the backend and set the data for the quiz
   * @author:Vi Le
   * @version:1.0.0.0
   */
  useEffect(() => {
    import('./QuizService.js').then((d) => {
      d.getExamData(quizzKey).then((data) => {
        setQuizzData(data);
        setMaxMark(Object.keys(data.lsQuizz).length);
      });
    });
  }, [quizzKey, nav]);
  /**
   *
   * @param : answer:json
   * @example
   * @description: this function is used to set the answer for the quiz
   * @returns: void
   * @author:Vi LE
   * @version:1.0.0.0
   */

  const HandleChoice = (answer) => {
    setAnswers((prev) => {
      // Find the index of the existing answer with the same questionId
      const existingAnswerIndex = prev.findIndex((a) => a.quesId === answer.quesId);
      if (existingAnswerIndex !== -1) {
        // If it exists, update its value
        prev[existingAnswerIndex] = answer;
        return [...prev];
      } else {
        // If it doesn't exist, add it to the state
        return [...prev, answer];
      }
    });
  };
  /**
   *
   * @param: e: event
   * @example:
   * @description: this function is used to submit the answer to the backend and open the result modal
   */
  const HandleSubmit = (e) => {
    e.preventDefault();
    setIsDisplay(true);

    // nav('/');
  };
  const HandleOvertime = () => {
    setIsDisplay(true);
  };
  /**
   * @description: this useEffect is used to check the answer state
   * @returns: void
   */
  useEffect(() => {
    console.log('hereis the answer' + JSON.stringify(answers));
  }, [answers]);

  return (
    <div style={{ backgroundColor: '#D5CCE5' }}>
      <Suspense fallback={<Skeleton variant="rectangular" width={'100vw'} />}>
        {' '}
        <LinearDeterminate maxMark={maxMark} answers={answers} />
      </Suspense>
      <Suspense
        fallback={
          <Skeleton
            variant="circular"
            sx={{
              position: 'fixed',
              width: '10vw',
              height: '10vw',
              flexShrink: '0',
              borderRadius: '10vw',
              border: 'solid #623F1F thick',
              top: '5%',
              right: '2%',
              display: 'flex', // Add this
              alignItems: 'center', // Add this
              justifyContent: 'center', // Add this
            }}
          />
        }
      >
        {!isDisplay && <Clock HandleSubmit={HandleOvertime} quizzKey={quizzKey} />}
      </Suspense>
      <Typography variant="h3" textAlign={'center'}>
        {quizzData.title}
      </Typography>
      <Typography variant="h5" textAlign={'center'} sx={{ marginBottom: '2%' }}>
        {quizzData.description}
      </Typography>
      <Typography variant="h6" textAlign={'center'} sx={{ marginBottom: '2%' }}>
        Notice: <RadioButtonUncheckedIcon /> is single choices, <CheckBoxOutlineBlankIcon /> is multiple choice
      </Typography>
      <Container sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {quizzData.lsQuizz &&
            Object.values(quizzData.lsQuizz).map((v, i) => {
              return (
                <Suspense key={i} fallback={<Skeleton variant="rectangular" width="50vw" height="40vh" />}>
                  <CustomQuizCard
                    key={i}
                    setAnswers={HandleChoice}
                    isMultiple={v.isMutiple}
                    answer={v.answer}
                    questionId={v.id}
                    content={v.content}
                    index={i + 1}
                  />
                </Suspense>
              );
            })}
        </Box>
      </Container>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <CustomButton type="button" text={'submit'} onClick={HandleSubmit} />
      </Box>
      {isDisplay && <ResultUI answers={answers} maxMark={maxMark} displayResult={isDisplay} isSubmit={true} />}
    </div>
  );
}
