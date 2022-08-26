import React from 'react';
import Header from '../components/Header';
import WalletForm from '../components/WalletForm';

class Wallet extends React.Component {
  render() {
    return (
      <main>
        <Header />
        <div>
          <WalletForm />
        </div>
      </main>
    );
  }
}

export default Wallet;
