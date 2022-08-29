// Coloque aqui suas actions
export const PERSONAL_INFO = 'PERSONAL_INFO';
export const WALLET_INFO = 'WALLET_INFO';
export const REQUEST_API = 'REQUEST_API';
export const SUCCES_API = 'SUCCES_API';
export const REJECTED_API = 'REJECTED_API';
export const RMV_ITEM = 'RMV_ITEM';

export const walletSubmmit = (wallet) => ({
  type: WALLET_INFO,
  wallet,
});

export const userSubmmit = (user) => ({
  type: PERSONAL_INFO,
  user,
});

export const requestAPI = () => ({ type: REQUEST_API });

export const getResultApi = (data) => ({ type: SUCCES_API, data });

export const errorApi = (error) => ({ type: REJECTED_API, error });

export const rmvItemFromState = (data) => ({ type: RMV_ITEM, data });

export function fetchAPI() {
  return async (dispatch) => {
    try {
      dispatch(requestAPI());
      const response = await fetch('https://economia.awesomeapi.com.br/json/all');
      const data = await response.json();
      dispatch(getResultApi(data));
    } catch (error) {
      dispatch(errorApi(error));
    }
  };
}
