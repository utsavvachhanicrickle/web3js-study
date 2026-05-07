import { useState } from "react";

import { useDispatch } from "react-redux";

import Web3 from "web3";

import api from "../api/axios";

import { setReceipt } from "../features/payment/paymentSlice";

const PaymentCard = () => {
  const dispatch = useDispatch();

  const [amount, setAmount] = useState(0.01);

const sendPayment = async () => {

  try {

    if (!window.ethereum) {

      alert("MetaMask not installed");

      return;
    }

    const web3 = new Web3(
      window.ethereum
    );

    const accounts =
      await web3.eth.getAccounts();

    const adminWallet =
      import.meta.env
        .VITE_ADMIN_WALLET;

    console.log(
      "Sending Payment..."
    );



    // =========================
    // SEND TRANSACTION
    // =========================

    const tx =
      await web3.eth.sendTransaction({

        from: accounts[0],

        to: adminWallet,

        value: web3.utils.toWei(
          amount.toString(),
          "ether"
        )
      });




    console.log(
      "Transaction Success:"
    );

    console.log(tx);




    // =========================
    // START VERIFY LOOP
    // =========================

    let attempts = 0;

    const maxAttempts = 10;



    const interval = setInterval(
      async () => {

        try {

          attempts++;

          console.log(
            `Verify Attempt ${attempts}`
          );



          const response =
            await api.post(
              "/payments/verify",
              {
                txHash:
                  tx.transactionHash
              }
            );



          console.log(
            "Backend Response:"
          );

          console.log(
            response.data
          );



          // success
          if (
            response.data.success
          ) {

            dispatch(
              setReceipt(
                response.data
                  .transaction
              )
            );

            console.log(
              "Transaction Verified"
            );

            clearInterval(
              interval
            );
          }

        } catch (error) {

          console.log(
            "Verify Error:"
          );

          console.log(
            error.response?.data ||
            error.message
          );
        }



        // stop retries
        if (
          attempts >= maxAttempts
        ) {

          console.log(
            "Verification Timeout"
          );

          clearInterval(
            interval
          );
        }

      },

      // every 5 sec
      5000
    );

  } catch (error) {

    console.log(
      "Payment Error:"
    );

    console.log(error);
  }
};

  return (
    <div className="bg-slate-800 p-6 rounded mt-6">
      <h2 className="text-lg font-bold mb-4">Send Payment</h2>

      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="w-full p-3 rounded bg-slate-700 mb-4"
      />

      <button onClick={sendPayment} className="bg-green-600 px-4 py-2 rounded">
        Send TXDC
      </button>
    </div>
  );
};

export default PaymentCard;
