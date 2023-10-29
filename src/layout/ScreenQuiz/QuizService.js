import { CUSTOMER_DOMAIN, SERVER_DOMAIN } from '../../const/Domain';

/***
 * @param none
 * @example
 * const [examKey,setExamKey] = useState("");
 * useLayoutEffect(()=>{
 *     getExamKey().then(data=>{
 *     setExamKey(data)
 * },[])
 *
 * })
 * @description this function return the exam Key call it in useLayoutEffect
 * @returns string
 * @author: Vi Le
 * @version: 1.0.0.0
 */
export const getExamKey = async () => {
  let res = await fetch(SERVER_DOMAIN + '/pw');
  let dt = await res.json();
  const examKey = dt.examPW;

  return examKey;
};
/***
 * @param: quizz:string
 * quizz is the key to acc the quizz
 * @example
 * const[data,setData] = ([])
 * useEffect(()=>{
 *  getExamData('182e08a1-0d18-44bd-9b4b-c7ac85144e9e').then(dt=>{
 *  setData(dt)
 * })
 *
 * })
 * @description: this function will return the data of the quiz
 * @author: vile
 * @version: 1.0.0.3
 */
export const getExamData = async (quizz) => {
  let res = await fetch(CUSTOMER_DOMAIN + `${quizz}`);
  let dt = await res.json();

  return dt;
};
/***
 * this function is used to get the mark from the server
 * @param: answerData:json array
 * 
 * @example
 * const[mark,setMark] = useState(0)
 *useEffect(() => {
    import('./QuizService').then((fn) => {
      fn.getResult(answers).then((res) => {
        setMark(res);
      });
    });
  }, []);
 * @description: this function will give u the result mark
 * @author: vi le
 * @version: 1.0.0.1
 */
export const getResult = async (answerData) => {
  const response = await fetch('https://server.nglearns.com/quizz/285498f5-3486-434d-a459-bedb6bcea7ce', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(answerData),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  return data;
};
/***
 * this function is used to get the mark from the server
 * @param: answerData:json array
 * 
 * @example
 * const[mark,setMark] = useState(0)
 *useEffect(() => {
    import('./QuizService').then((fn) => {
      fn.getResult(answers).then((res) => {
        setMark(res);
      });
    });
  }, []);
 * @returns:json
 * @description: this function will give you the temporary result mark
 * @author: Vi Le
 * @version: 1.0.0.2
 */
export const getTempResult = async (answerData) => {
  const res = await fetch(SERVER_DOMAIN + '/result');
  const data = await res.json();
  return data;
};
