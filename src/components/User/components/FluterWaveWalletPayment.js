import React from 'react';
import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';
import Button from '@mui/material/Button';

import { WalletManager } from '../../../services/wallet'
import { useAuth } from '../../../contexts/AuthContext'

const walletManager = new WalletManager()

export default function FluterWaveWalletPayment({amount, userEmail, UserName, close, fromCurrency, currencyId, WalletId}) {

  const { currentUser } = useAuth()
console.log(currencyId)
console.log(WalletId)
  walletManager.init(currentUser)
  
  const config = {
    public_key: 'FLWPUBK-babfe75a06cb6e9bd5046f48e872818e-X',
    tx_ref: Date.now(),
    amount: amount,
    currency: fromCurrency,
    payment_options: 'card',
    // redirect_url: '/user/home',
    customer: {
      email: userEmail,
      name: UserName,
    },
    customizations: {
        title: 'Future Pay',
        description: 'Deposit',
      logo: 'https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg',
    },
  };

  const handleFlutterPayment = useFlutterwave(config);

  return (
    <div className="App">
   

      <Button 
      
        onClick={() => {
          close()
          handleFlutterPayment({
            callback: async (response) => {
              // await walletManager.depositToWallet({response}).then((res) => console.log(res))
               const dataValue= 
                 {
                   txId: response.transaction_id,
                   amount: response.amount,
                   flwRef: response.flw_ref,
                   txRef: response.tx_ref,
                   currency: currencyId,
                   wallet: WalletId
                };
                await walletManager.depositToWallet(dataValue).then((res) => console.log(res))
                closePaymentModal() // this will close the modal programmatically
            },
            onClose: () => {},
          });
        }}
        variant="contained"
        style={{padding: "16px 60px", marginTop: "-5px", width: "100%"}}
      >
        Deposit
      </Button>
    </div>
  );
}



