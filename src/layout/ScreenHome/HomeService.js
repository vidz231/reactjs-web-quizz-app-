import { CUSTOMER_DOMAIN } from '../../const/Domain';

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
 * @deprecated: this function is deprecated
 * @author:Vi LE
 * @version: 1.0.0.1 
 */
export const getApi = async () => {
  let res = await fetch('http://localhost:1880/user');
  let dt = await res.json();

  return dt;
};

export const getKey = async (quizzKey) => {
  let res = await fetch(CUSTOMER_DOMAIN + quizzKey);
  if (res.status === 200) {
    let dt = await res.json();
    const examKey = dt.id;

    return examKey;
  }
  return null;
};
