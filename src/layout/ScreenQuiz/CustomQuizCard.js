import {
  Card,
  CardContent,
  Checkbox,
  CssBaseline,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from '@mui/material';
import React, { useEffect, useState } from 'react';

export default function CustomQuizCard({ isMultiple, answer, content, onChoice, setAnswers, questionId }) {
  const [result, setResult] = useState({});
  const [selectedValues, setSelectedValues] = useState([]);

  const HandleChange = (e) => {
    setResult((pre) => ({
      ...pre,
      quesId: questionId,
      answerId: e.target.value,
    }));
    // setAnswers(result);
  };

  const handleChangeCheckedBox = (e) => {
    if (e.target.checked) {
      setSelectedValues((prev) => [...prev, e.target.value]);
      setResult((pre) => ({
        ...pre,
        quesId: questionId,
        answerId: pre.answerId ? [...pre.answerId, e.target.value] : [e.target.value],
      }));
      // setAnswers(result);
    } else {
      setSelectedValues((prev) => prev.filter((value) => value !== e.target.value));
      setResult((prev) => ({
        ...prev,
        quesId: questionId,
        answerId: prev.answerId.filter((value) => value !== e.target.value),
      }));
      // setAnswers(result);
    }
  };
  useEffect(() => {
    setAnswers(result);
  }, [result]);

  return (
    <>
      <CssBaseline />
      <Card
        sx={{
          width: '50vw',
          height: '40vh',
          marginBottom: '2%',
          border: 'solid #623F1F',
          borderRadius: '10px',
          bgcolor: '#D3E0AF',
          borderWidth: '20px',
        }}
      >
        <CardContent
          sx={{ fontSize: '2vw', display: 'flex', height: '30%', alignItems: 'center', justifyContent: 'center' }}
        >
          {' '}
          {content}{' '}
        </CardContent>

        {/* <Box sx={{ display: 'flex', height: '80%', flexFlow: 'row wrap' }}> */}
        <FormControl
          sx={{
            height: '70%',
            width: '100%',
          }}
        >
          <RadioGroup
            name="controlled-choice"
            onChange={HandleChange}
            style={{
              display: 'flex',
              flexFlow: 'row wrap',
              width: '100%',
              height: '100%',
              alignItems: 'center',
              justifyContent: 'space-evenly',
            }}
          >
            {answer.map((v, i) => {
              return (
                <FormControlLabel
                  style={{
                    margin: '0',
                    height: '30%',
                    width: '50%',
                    flexBasis: '45%',
                    backgroundColor: '#D86E6E',
                    borderRadius: '15px',
                  }}
                  key={i}
                  value={v.id}
                  control={
                    isMultiple ? (
                      <Checkbox
                        sx={{ fontSize: '1rem', color: '#181202' }}
                        checked={selectedValues.includes(v.id)}
                        onChange={handleChangeCheckedBox}
                        value={v.id}
                      />
                    ) : (
                      <Radio />
                    )
                  }
                  label={v.content}
                />
              );
            })}
          </RadioGroup>
        </FormControl>
        {/* </Box> */}
      </Card>
    </>
  );
}
