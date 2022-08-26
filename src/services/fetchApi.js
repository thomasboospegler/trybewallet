const fetchCurrenceAPI = async () => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const data = await response.json();
  // const coins = Object.values(data);
  // .filter(({ codein }) => codein !== 'BRLT');
  return data;
};

export default fetchCurrenceAPI;
