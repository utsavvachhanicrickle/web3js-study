import {
  createSlice
} from "@reduxjs/toolkit";

const initialState = {

  loading: false,

  transactions: [],

  currentReceipt: null
};

const paymentSlice = createSlice({

  name: "payment",

  initialState,

  reducers: {

    setLoading(state, action) {

      state.loading = action.payload;
    },

    setTransactions(state, action) {

      state.transactions = action.payload;
    },

    addTransaction(state, action) {

      state.transactions.unshift(
        action.payload
      );
    },

    setReceipt(state, action) {

      state.currentReceipt =
        action.payload;
    }
  }
});

export const {
  setLoading,
  setTransactions,
  addTransaction,
  setReceipt
} = paymentSlice.actions;

export default paymentSlice.reducer;