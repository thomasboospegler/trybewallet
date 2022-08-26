// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { WALLET_INFO, REQUEST_API, SUCCES_API, REJECTED_API } from '../actions';

const initialState = {
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
};

const wallet = (state = initialState, action) => {
  switch (action.type) {
  case WALLET_INFO:
    return { ...state };
  case REQUEST_API:
    return { ...state };
  case SUCCES_API:
    return { ...state,
      currencies: Object.values(action.data)
        .filter(({ codein }) => codein !== 'BRLT')
        .map(({ code }) => code) };
  case REJECTED_API:
    return { ...state };
  default:
    return state;
  }
};
export default wallet;
