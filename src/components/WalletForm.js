import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchAPI } from '../redux/actions';

class WalletForm extends Component {
  state = {
    despesa: '',
    currencie: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
    description: '',
  };

  componentDidMount() {
    const { getCurrencies } = this.props;
    getCurrencies();
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { currencies } = this.props;
    const { despesa, currencie, method, tag, description } = this.state;
    return (
      <form onSubmit={ this.handleSubmit }>
        <label htmlFor="despesa">
          Despesa:
          <input
            type="number"
            data-testid="value-input"
            name="despesa"
            value={ despesa }
            onChange={ this.handleChange }
          />
        </label>
        <select
          name="currencie"
          data-testid="currency-input"
          value={ currencie }
          onChange={ this.handleChange }
        >
          {currencies.map((curr) => (
            <option key={ curr } value={ curr }>
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
            name="description"
            value={ description }
            onChange={ this.handleChange }
          />
        </label>
      </form>
    );
  }
}

WalletForm.propTypes = {
  getCurrencies: PropTypes.func.isRequired,
  currencies: PropTypes.shape({
    map: PropTypes.isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  getCurrencies: () => dispatch(fetchAPI()),
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
