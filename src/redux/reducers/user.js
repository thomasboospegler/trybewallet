// Esse reducer será responsável por tratar as informações da pessoa usuária
import { PERSONAL_INFO } from '../actions';

const initialState = {
  email: '', // string que armazena o email da pessoa usuária
};

const user = (state = initialState, action) => {
  switch (action.type) {
  case PERSONAL_INFO:
    return { ...state, email: action.user };

  default:
    return state;
  }
};
export default user;
