/**
 * @param none
 * @example:
 * useEffect(() => {
    const fetchData = async () => {
      const result = await getApi();
      setData(result);
    };
    fetchData();
  }, []);
 * @description: this function will return the data from the server
 * @returns: json array
 * @author:Vi LE
 * @version: 1.0.0.0 
 */
const getApi = async () => {
  let res = await fetch('http://localhost:1880/user');
  let dt = await res.json();

  return dt;
};

export default getApi;
