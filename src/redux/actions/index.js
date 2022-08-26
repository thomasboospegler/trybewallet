// Coloque aqui suas actions
export const PERSONAL_INFO = 'PERSONAL_INFO';
export const WALLET_INFO = 'WALLET_INFO';

const walletSubmmit = (wallet) => ({
  type: WALLET_INFO,
  payload: wallet,
});

const userSubmmit = (user) => ({
  type: PERSONAL_INFO,
  payload: user,
});

export { walletSubmmit, userSubmmit };
