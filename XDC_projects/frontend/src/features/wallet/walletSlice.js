import {
  createSlice
} from "@reduxjs/toolkit";

const initialState = {

  account: null,

  balance: null,

  chainId: null,

  connected: false
};

const walletSlice = createSlice({

  name: "wallet",

  initialState,

  reducers: {

    setWallet(state, action) {

      state.account =
        action.payload.account;

      state.balance =
        action.payload.balance;

      state.chainId =
        action.payload.chainId;

      state.connected = true;
    },

    disconnectWallet(state) {

      state.account = null;

      state.balance = null;

      state.chainId = null;

      state.connected = false;
    }
  }
});

export const {
  setWallet,
  disconnectWallet
} = walletSlice.actions;

export default walletSlice.reducer;