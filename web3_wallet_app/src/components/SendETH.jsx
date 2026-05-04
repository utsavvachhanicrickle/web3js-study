import { useState } from "react";
import Web3 from "web3";

const SendETH = ({ account, balance }) => {
  const [to, setTo] = useState("");
  const [amount, setAmount] = useState(0);
  const [loading, setLoading] = useState(false);

  const web3 = new Web3(window.ethereum);
  const step = 0.001;

  const increase = () => {
    const val = amount + step;
    if (val <= balance) setAmount(Number(val.toFixed(6)));
  };

  const decrease = () => {
    const val = amount - step;
    if (val >= 0) setAmount(Number(val.toFixed(6)));
  };

  const setMax = () => setAmount(balance);

  const sendTransaction = async () => {
    const finalAmount = Number(amount);
    if (!to || amount <= 0) return alert("Enter valid details");
    try {
      setLoading(true);
      alert("Sending: " + finalAmount);
      const valueWei = web3.utils.toWei(finalAmount.toString(), "ether");
const valueHex = "0x" + BigInt(valueWei).toString(16);
      console.log("Amount (ETH):", finalAmount.toString());
      console.log("Value (Wei):", valueWei);

      await window.ethereum.request({
        method: "eth_sendTransaction",
        params: [
          {
            from: account,
            to,
            value: valueHex,
          },
        ],
      });

      alert("Transaction sent 🚀");
      setAmount(0);
      setTo("");
    } catch (err) {
      console.error(err);
      alert("Transaction failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 mt-4  text-(--text) border rounded-xl">
      <h2 className="font-semibold mb-2">Send ETH</h2>

      <input
        type="text"
        placeholder="Receiver Address"
        value={to}
        onChange={(e) => setTo(e.target.value)}
        className="w-full p-2 mb-2 border rounded"
      />

      <p className="text-sm">Balance: {balance} ETH</p>

      <div className="flex gap-2 mt-2">
        <button onClick={decrease}>-</button>

        <input
          type="number"
          step="0.001"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          className="w-full text-center border rounded"
        />

        <button onClick={increase}>+</button>
      </div>

      <button onClick={setMax} className="text-blue-500 text-sm mt-1">
        Use Max
      </button>

      <button
        onClick={sendTransaction}
        className="w-full mt-3 bg-blue-500 text-white py-2 rounded"
      >
        {loading ? "Sending..." : "Send"}
      </button>
    </div>
  );
};

export default SendETH;
