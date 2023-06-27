import React from 'react';
import { FlutterWaveButton, closePaymentModal } from 'flutterwave-react-v3';

export default function FluterwavePayment({amount, userEmail, UserName, fromCurrency, text}) {


   const config = {
    public_key: 'FLWPUBK-babfe75a06cb6e9bd5046f48e872818e-X',
    tx_ref: Date.now(),
    amount: amount,
    currency: fromCurrency,
    payment_options: 'card',
    redirect_url: '/user/transaction',
    customer: {
      email: userEmail,
      name: UserName,
    },
    customizations: {
      title: 'Future Pay',
      description: 'Payment for currency conversion',
      logo: 'https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg',
    },
  };

  const fwConfig = {
    ...config,
    text: text,
    callback: (response) => {
       console.log(response);
      closePaymentModal() // this will close the modal programmatically
    },
    onClose: () => {},
  };

  return (
    <div className="App">
      <FlutterWaveButton {...fwConfig} />
    </div>
  );
}