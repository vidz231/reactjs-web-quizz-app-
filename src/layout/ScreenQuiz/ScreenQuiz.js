import { Box, Button, Container, Skeleton, Typography } from '@mui/material';
import React, { lazy, useEffect, useLayoutEffect, useState, Suspense } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// import CustomQuizCard from './CustomQuizCard';
// import Clock from './Clock';
import ResultUI from './Modal';
import CustomButton from '../../component/CustomButton';
// import LinearDeterminate from '../../component/SliderProgress';
const Clock = lazy(() => import('./Clock'));
const LinearDeterminate = lazy(() => import('../../component/SliderProgress'));
const CustomQuizCard = lazy(() => import('./CustomQuizCard'));
export default function ScreenQuiz() {
  const nav = useNavigate();
  const { quizzKey } = useParams();
  const [quizzData, setQuizzData] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [maxMark, setMaxMark] = useState(0);
  const [isDisplay, setIsDisplay] = useState(false);

  useLayoutEffect(() => {
    if (!localStorage.getItem('examPw') || quizzKey !== localStorage.getItem('examPw')) {
      nav('/');
    }
    if (quizzKey === undefined) {
      nav('*');
    }
  }, [nav, quizzKey]);

  useEffect(() => {
    import('./QuizService.js').then((d) => {
      d.getExamData(quizzKey).then((data) => {
        setQuizzData(data);
        setMaxMark(Object.keys(data.lsQuizz).length);
      });
    });
  }, [quizzKey, nav]);

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

  const HandleSubmit = (e) => {
    e.preventDefault();
    localStorage.clear();
    setIsDisplay(true);
    // nav('/');
  };

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
        {!isDisplay && <Clock HandleSubmit={HandleSubmit} quizzKey={quizzKey} />}
      </Suspense>
      <Typography variant="h3" textAlign={'center'}>
        {quizzData.title}
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
                  />
                </Suspense>
              );
            })}
        </Box>
      </Container>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        {/* <Button onClick={HandleSubmit}>click me to submit</Button> */}
        <CustomButton type="button" text={'submit'} onClick={HandleSubmit} />
      </Box>
      <ResultUI answers={answers} maxMark={maxMark} displayResult={isDisplay} isSubmit={true} />;
      {/* <input type="submit" value="handin" /> */}
    </div>
  );
}
