import * as React from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

/**
 * @param: maxMark:Number, answers:Array
 * @description: this function is used to calculate the current answered question progress of the quiz
 * @example: <PassedOrFailedBox mark={mark} />
 * @returns: JSX.Element
 * @author:Vi Le
 * @version:1.0.0.0
 */
export default function LinearDeterminate({ maxMark, answers }) {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    console.log('heris answer' + answers.length);
    console.log(maxMark + '  ' + (answers.length - 1));
    const scrolled = ((answers.length - 1) / Number(maxMark)) * 100;
    console.log('heris answer' + scrolled);

    setProgress(scrolled);
  }, [answers, maxMark]);
  //#D5CCE5
  return (
    <Box sx={{ width: '100%', position: 'fixed' }}>
      <LinearProgress sx={{ bgcolor: '#D5CCE5' }} variant="determinate" value={progress} />
    </Box>
  );
}
