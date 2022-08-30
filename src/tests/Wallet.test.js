import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen, waitFor } from '@testing-library/react';
import renderWithRouterAndRedux from './helpers/renderWith';
import mockData from './helpers/mockData';
import App from '../App';

describe('Testes da pagina "Login"', () => {
  // Variaveis globais para os testes
  const email = 'thomas@teste.com';
  const initialState = {
    user: {
      email,
    },
    wallet: {
      currencies: Object.values(mockData).map(({ code }) => code),
      expenses: [],
      editor: false,
      idToEdit: 0,
    },
  };
  const pathWallet = '/carteira';
  const cartaoDeCredito = 'Cartão de crédito';

  const getInputsAndButtonsFromLoginPage = () => {
    const despesasInput = screen.getByLabelText(/despesa:/i);
    const currencyInput = screen.getByTestId('currency-input');
    const methodInput = screen.getByTestId('method-input');
    const tagInput = screen.getByTestId('tag-input');
    const descriptionInput = screen.getByRole('textbox', { name: /Descrição:/i });
    const submitButton = screen.getByRole('button', { name: /adicionar/i });
    return {
      despesasInput, currencyInput, methodInput, tagInput, descriptionInput, submitButton,
    };
  };

  it('test if the inputs and buttons are in te screen and have thair initial values', () => {
    renderWithRouterAndRedux(<App />, { initialState, initialEntries: [pathWallet] });

    const {
      despesasInput, currencyInput, methodInput, tagInput, descriptionInput, submitButton,
    } = getInputsAndButtonsFromLoginPage();

    // Verifica se o emial é passado corretamente pela store
    const emailElement = screen.getByText(email);
    expect(emailElement).toBeInTheDocument();

    // Verifica se todos os campos do formulario estão na tela
    expect(despesasInput).toBeInTheDocument();
    expect(currencyInput).toBeInTheDocument();
    expect(methodInput).toBeInTheDocument();
    expect(tagInput).toBeInTheDocument();
    expect(descriptionInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();

    // Verifica os valores iniciais dos inputs
    expect(despesasInput).toHaveValue(null);
    expect(currencyInput).toHaveValue('USD');
    expect(methodInput).toHaveValue('Dinheiro');
    expect(tagInput).toHaveValue('Alimentação');
    expect(descriptionInput).toHaveValue('');
  });

  it('should submit te form with the information and add the values in the screen', async () => {
    // const { store } =
    renderWithRouterAndRedux(<App />, {
      initialState, initialEntries: [pathWallet],
    });

    const {
      despesasInput, currencyInput, methodInput, tagInput, descriptionInput, submitButton,
    } = getInputsAndButtonsFromLoginPage();

    // Digita e seleciona valores nos inputs
    userEvent.type(despesasInput, '10');
    userEvent.selectOptions(currencyInput, 'BTC');
    userEvent.selectOptions(methodInput, cartaoDeCredito);
    userEvent.selectOptions(tagInput, 'Lazer');
    userEvent.type(descriptionInput, 'teste');

    // Verifica os valores dos inputs
    expect(despesasInput).toHaveValue(10);
    expect(currencyInput).toHaveValue('BTC');
    expect(methodInput).toHaveValue(cartaoDeCredito);
    expect(tagInput).toHaveValue('Lazer');
    expect(descriptionInput).toHaveValue('teste');

    // Testa botão submit e verifica se os valores esperados aparecem na tela
    userEvent.click(submitButton);
    await waitFor(() => {
      expect(despesasInput).toHaveValue(null);
      expect(currencyInput).toHaveValue('USD');
      expect(methodInput).toHaveValue('Dinheiro');
      expect(tagInput).toHaveValue('Alimentação');
      expect(descriptionInput).toHaveValue('');
    });
  });

  it('Test delete button', async () => {
    const newStore = {
      user: {
        email,
      },
      wallet: {
        currencies: Object.values(mockData).map(({ code }) => code),
        expenses: [
          {
            id: 0,
            value: '10',
            currency: 'BTC',
            method: 'Cartão de crédito',
            tag: 'Lazer',
            description: 'teste',
            exchangeRates: mockData,
          },
        ],
        editor: false,
        idToEdit: 0,
      },
    };
    const { store } = renderWithRouterAndRedux(
      <App />,
      { initialEntries: [pathWallet], initialState: newStore },
    );
    // Clica no botao de romover o item da lista e verifica se foi removido da store
    const btnDelete = screen.getByTestId('delete-btn');
    userEvent.click(btnDelete);
    await waitFor(() => {
      const { wallet } = store.getState();
      expect(wallet.expenses).toHaveLength(0);
      expect(screen.getByText(/0/i)).toBeInTheDocument();
    });
  });
});
