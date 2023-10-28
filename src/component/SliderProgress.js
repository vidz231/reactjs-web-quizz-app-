import * as React from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
/***
 * This component is used to track current answered question
 * @param maxMark:Num - this give back the maximum number of question
 * @param answer:JsonArray - answers give back the current answered question
 * @example
 * <LinearDeterminate maxMark={5} answer={[1,2,3]}>
 * @description
 * Dieu kien tien quyet: maxMark and answer ko duoc null | undefined
 * @returns a slider that tracked the current progress
 * @author: Le Trung Vi
 * @version 1.0.0.0
 */
export default function LinearDeterminate({ maxMark, answers }) {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    // const handleScroll = () => {
    //   const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    //   const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    //   const scrolled = (scrollTop / windowHeight) * 100;
    //   setProgress(scrolled);
    // };
    console.log('heris answer' + answers.length);
    console.log(maxMark + '  ' + (answers.length - 1));
    const scrolled = ((answers.length - 1) / Number(maxMark)) * 100;
    console.log('heris answer' + scrolled);

    setProgress(scrolled);
    // window.addEventListener('scroll', handleScroll);

    // return () => {
    //   window.removeEventListener('scroll', handleScroll);
    // };
  }, [answers, maxMark]);
  //#D5CCE5
  return (
    <Box sx={{ width: '100%', position: 'fixed' }}>
      <LinearProgress sx={{ bgcolor: '#D5CCE5' }} variant="determinate" value={progress} />
    </Box>
  );
}
