import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { rmvItemFromState, editItemFromState } from '../redux/actions';

class Table extends Component {
  hanldeEditButton = (id) => {
    const { editState } = this.props;
    const data = {
      isEditing: true,
      idToEdit: id,
    };
    editState(data);
  };

  handleRmvButton = (id) => {
    const { expenses, getAsk } = this.props;
    const filteredExpensesList = expenses
      .filter((expense) => expense.id !== id);
      // .map((expense, index) => ({ ...expense, id: index }));
    getAsk(filteredExpensesList);
  };

  render() {
    const { expenses } = this.props;
    return (
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          { expenses
            .sort((a, b) => a.id - b.id)
            .map((expense) => (
              <tr key={ expense.id }>
                <td>{expense.description}</td>
                <td>{expense.tag}</td>
                <td>{expense.method}</td>
                <td>{Number(expense.value).toFixed(2)}</td>
                <td>{expense.exchangeRates[expense.currency].name}</td>
                <td>{Number(expense.exchangeRates[expense.currency].ask).toFixed(2)}</td>
                <td>
                  {(expense.value * expense.exchangeRates[expense.currency].ask)
                    .toFixed(2)}
                </td>
                <td>Real</td>
                <td>
                  <button
                    type="button"
                    data-testid="delete-btn"
                    onClick={ () => this.handleRmvButton(expense.id) }
                  >
                    Excluir
                  </button>
                  <button
                    type="button"
                    data-testid="edit-btn"
                    onClick={ () => this.hanldeEditButton(expense.id) }
                  >
                    Editar
                  </button>
                </td>
              </tr>)) }
        </tbody>
      </table>
    );
  }
}

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  getAsk: PropTypes.func.isRequired,
  editState: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  getAsk: (state) => dispatch(rmvItemFromState(state)),
  editState: (state) => dispatch(editItemFromState(state)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);
