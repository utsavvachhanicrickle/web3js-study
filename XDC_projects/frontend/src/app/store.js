import {
  configureStore
} from "@reduxjs/toolkit";

import walletReducer from
  "../features/wallet/walletSlice";

import paymentReducer from
  "../features/payment/paymentSlice";


export const store = configureStore({

  reducer: {

    wallet: walletReducer,

    payment: paymentReducer
  }
});