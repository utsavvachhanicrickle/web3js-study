import { useEffect, useState } from "react";
import { Web3 } from "web3";
import abi from "./abi.json";

function App() {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);

  // ✅ REAL CONTRACT ADDRESS
  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

  useEffect(() => {
    async function load() {
      try {
        if (!window.ethereum) {
          alert("Install MetaMask");
          return;
        }

        const web3 = new Web3(window.ethereum);

        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });

        setAccount(accounts[0]);

        const instance = new web3.eth.Contract(
          abi,
          contractAddress
        );

        setContract(instance);

        alert("Wallet Connected");
      } catch (error) {
        console.log(error);

        alert("Failed to connect wallet");
      }
    }

    load();
  }, []);

  // ✅ CREATE JOB
  const createJob = async () => {
    try {
      if (!contract) {
        alert("Contract not loaded");
        return;
      }

      await contract.methods.createJob().send({
        from: account,
        value: Web3.utils.toWei("1", "ether"),
      });

      alert("✅ Job Created");
    } catch (error) {
      console.log(error);

      alert(error?.message || "Transaction Failed");
    }
  };

  // ✅ ACCEPT JOB
  const acceptJob = async () => {
    try {
      await contract.methods.acceptJob(1).send({
        from: account,
      });

      alert("✅ Job Accepted");
    } catch (error) {
      console.log(error);

      alert(error?.message || "Accept Failed");
    }
  };

  // ✅ SUBMIT WORK
  const submitWork = async () => {
    try {
      await contract.methods.submitWork(1).send({
        from: account,
      });

      alert("✅ Work Submitted");
    } catch (error) {
      console.log(error);

      alert(error?.message || "Submit Failed");
    }
  };

  // ✅ APPROVE PAYMENT
  const approvePayment = async () => {
    try {
      await contract.methods.approvePayment(1).send({
        from: account,
      });

      alert("✅ Payment Released");
    } catch (error) {
      console.log(error);

      alert(error?.message || "Payment Failed");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Escrow DApp</h2>

      <p>Connected Wallet:</p>
      <p>{account}</p>

      <button onClick={createJob}>
        Create Job (1 ETH)
      </button>

      <br />
      <br />

      <button onClick={acceptJob}>
        Accept Job
      </button>

      <br />
      <br />

      <button onClick={submitWork}>
        Submit Work
      </button>

      <br />
      <br />

      <button onClick={approvePayment}>
        Approve Payment
      </button>
    </div>
  );
}

export default App;