import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { userSubmmit } from '../redux/actions';

class Login extends React.Component {
  state = {
    isDisable: true,
    email: '',
    password: '',
  };

  validateEmailAndPassword = () => {
    const { email, password } = this.state;
    const emailRegex = (/^\S+@\S+\.\S+$/);
    const passwordMinLength = 6;
    const isEmailValid = emailRegex.test(email);
    const isPasswordValid = password.length >= passwordMinLength;
    return isEmailValid && isPasswordValid;
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => {
      const isButtonDisalbe = this.validateEmailAndPassword();
      this.setState({
        isDisable: !isButtonDisalbe,
      });
    });
  };

  onSubmit = (event) => {
    event.preventDefault();
    const { submit, history } = this.props;
    const { email } = this.state;
    submit(email);
    history.push('/carteira');
  };

  render() {
    const { email, isDisable, password } = this.state;
    return (
      <form onSubmit={ this.onSubmit }>
        <input
          type="text"
          data-testid="email-input"
          placeholder="Email"
          name="email"
          value={ email }
          onChange={ this.handleChange }
        />
        <input
          type="password"
          data-testid="password-input"
          placeholder="Password"
          name="password"
          value={ password }
          onChange={ this.handleChange }
        />
        <button
          type="submit"
          disabled={ isDisable }
        >
          Entrar
        </button>
      </form>
    );
  }
}

Login.propTypes = {
  submit: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  submit: (email) => dispatch(userSubmmit(email)),
});

export default connect(null, mapDispatchToProps)(Login);
