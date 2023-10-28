const getApi = async () => {
  let res = await fetch('http://localhost:1880/user');
  let dt = await res.json();

  return dt;
};

export default getApi;
