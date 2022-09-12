// Coloque aqui suas actions
export const PERSONAL_INFO = 'PERSONAL_INFO';
export const WALLET_INFO = 'WALLET_INFO';
export const REQUEST_API = 'REQUEST_API';
export const SUCCES_API = 'SUCCES_API';
export const RMV_ITEM = 'RMV_ITEM';
export const EDIT_ITEM = 'EDIT_ITEM';
export const EXPENSE_SUBMIT = 'EXPENSE_SUBMIT';

export const walletSubmmit = (wallet) => ({
  type: WALLET_INFO,
  wallet,
});

export const expenseSubmit = (expenses) => ({
  type: EXPENSE_SUBMIT,
  expenses,
});

export const userSubmmit = (user) => ({
  type: PERSONAL_INFO,
  user,
});

export const requestAPI = () => ({ type: REQUEST_API });

export const getResultApi = (data) => ({ type: SUCCES_API, data });

export const rmvItemFromState = (data) => ({ type: RMV_ITEM, data });

export const editItemFromState = (data) => ({ type: EDIT_ITEM, data });

export function fetchAPI() {
  return async (dispatch) => {
    dispatch(requestAPI());
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await response.json();
    dispatch(getResultApi(data));
  };
}
