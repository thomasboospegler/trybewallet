import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouterAndRedux from './helpers/renderWith';
import App from '../App';

describe('Testes da pagina "Login"', () => {
  // Variaveis globais para os testes
  const email = 'thomas@teste.com';
  const password = '12345678';

  const pathHome = '/';
  const pathWallet = '/carteira';

  const getInputsAndButtonsFromLoginPage = () => {
    const emailInput = screen.getByPlaceholderText(/email/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);
    const sendButton = screen.getByRole('button', { name: /entrar/i });
    return {
      emailInput, passwordInput, sendButton,
    };
  };

  it('test if the inputs and buttons are in te screen and have thair initial values', () => {
    renderWithRouterAndRedux(<App />, { initialEntries: [pathHome] });

    const { emailInput, passwordInput, sendButton } = getInputsAndButtonsFromLoginPage();

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(sendButton).toBeInTheDocument();

    expect(emailInput).toHaveValue('');
    expect(passwordInput).toHaveValue('');
  });

  it('should redirect to page "Walet" after logging in', () => {
    const { history } = renderWithRouterAndRedux(<App />, { initialEntries: [pathHome] });

    const { emailInput, passwordInput, sendButton } = getInputsAndButtonsFromLoginPage();

    userEvent.type(emailInput, email);
    userEvent.type(passwordInput, password);

    expect(emailInput).toHaveValue(email);
    expect(passwordInput).toHaveValue(password);

    userEvent.click(sendButton);

    expect(history.location.pathname).toBe(pathWallet);
  });
});
