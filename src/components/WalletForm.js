import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchAPI,
  walletSubmmit,
  editItemFromState,
  expenseSubmit,
  rmvItemFromState } from '../redux/actions';
import fetchCurrenceAPI from '../services/fetchApi';
import Table from './Table';

class WalletForm extends Component {
  state = {
    value: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
    description: '',
  };

  componentDidMount() {
    const { getCurrencies } = this.props;
    getCurrencies();
  }

  // componentDidUpdate() {
  //   const { expenses, getAskRm } = this.props;
  //   const sortedList = expenses.sort((a, b) => ((a.id > b.id) ? 1 : 0));
  //   getAskRm(sortedList);
  // }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  sortExpenses = () => {
    const { sortExpenses, expenses } = this.props;
    sortExpenses(expenses);
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const { getAsk, isEditing, idToEdit, editState, getAskRm, expenses } = this.props;
    if (isEditing) {
      const data = await fetchCurrenceAPI();
      const filteredExpensesList = expenses
        .filter((expense) => expense.id !== idToEdit);
      getAskRm(filteredExpensesList);
      getAsk({ id: idToEdit, ...this.state, exchangeRates: data, isEditing: false });
      const editData = {
        isEditing: false,
        idToEdit: 0,
      };
      editState(editData);
    } else {
      const id = expenses.length;
      const data = await fetchCurrenceAPI();
      getAsk({ id, ...this.state, exchangeRates: data, isEditing: false });
    }
    this.sortExpenses();
    this.setState({
      value: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      description: '',
    });
  };

  render() {
    const { currencies, isEditing } = this.props;
    const { value, currency, method, tag, description } = this.state;
    return (
      <form onSubmit={ this.handleSubmit }>
        <label htmlFor="value">
          Despesa:
          <input
            type="number"
            data-testid="value-input"
            id="value"
            name="value"
            value={ value }
            onChange={ this.handleChange }
          />
        </label>
        <select
          name="currency"
          data-testid="currency-input"
          value={ currency }
          onChange={ this.handleChange }
        >
          {currencies.map((curr, index) => (
            <option key={ index } value={ curr }>
              {curr}
            </option>))}
        </select>
        <select
          name="method"
          data-testid="method-input"
          value={ method }
          onChange={ this.handleChange }
        >
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
        </select>
        <select
          name="tag"
          data-testid="tag-input"
          value={ tag }
          onChange={ this.handleChange }
        >
          <option value="Alimentação">Alimentação</option>
          <option value="Lazer">Lazer</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Transporte">Transporte</option>
          <option value="Saúde">Saúde</option>
        </select>
        <label htmlFor="description">
          Descrição:
          <input
            type="text"
            data-testid="description-input"
            id="description"
            name="description"
            value={ description }
            onChange={ this.handleChange }
          />
        </label>
        <button type="submit">
          { isEditing ? 'Editar Despesa' : 'Adicionar despesa' }
        </button>
        <Table />
      </form>
    );
  }
}

WalletForm.propTypes = {
  getCurrencies: PropTypes.func.isRequired,
  getAsk: PropTypes.func.isRequired,
  getAskRm: PropTypes.func.isRequired,
  currencies: PropTypes.shape({
    map: PropTypes.isRequired,
  }).isRequired,
  dispatch: PropTypes.shape({}).isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  isEditing: PropTypes.bool.isRequired,
  idToEdit: PropTypes.number.isRequired,
  editState: PropTypes.func.isRequired,
  sortExpenses: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
  isEditing: state.wallet.editor,
  idToEdit: state.wallet.idToEdit,
});

const mapDispatchToProps = (dispatch) => ({
  getCurrencies: () => dispatch(fetchAPI()),
  getAsk: (state) => dispatch(walletSubmmit(state)),
  getAskRm: (state) => dispatch(rmvItemFromState(state)),
  editState: (state) => dispatch(editItemFromState(state)),
  sortExpenses: (state) => dispatch(expenseSubmit(state)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
