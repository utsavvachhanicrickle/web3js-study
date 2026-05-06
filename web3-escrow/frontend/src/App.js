import { useEffect, useState } from "react";
import { Web3 } from "web3";
import abi from "./abi.json";
import addressFile from "./address.txt";

function App() {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);


  const contractAddress = "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266";
  useEffect(() => {
    async function load() {
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);

        // connect wallet
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });

        setAccount(accounts[0]);

        const instance = new web3.eth.Contract(abi, contractAddress);

        setContract(instance);
      } else {
        alert("Install MetaMask");
      }
    }

    load();
  }, []);

  // 🔹 CREATE JOB
  const createJob = async () => {
    await contract.methods.createJob().send({
      from: account,
      value: Web3.utils.toWei("1", "ether"),
    });

    alert("Job Created");
  };

  // 🔹 ACCEPT JOB
  const acceptJob = async () => {
    await contract.methods.acceptJob(1).send({
      from: account,
    });

    alert("Job Accepted");
  };

  // 🔹 SUBMIT WORK
  const submitWork = async () => {
    await contract.methods.submitWork(1).send({
      from: account,
    });

    alert("Work Submitted");
  };

  // 🔹 APPROVE PAYMENT
  const approvePayment = async () => {
    await contract.methods.approvePayment(1).send({
      from: account,
    });

    alert("Payment Released");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Escrow DApp</h2>

      <p>Connected Wallet: {account}</p>

      <button onClick={createJob}>Create Job (1 ETH)</button>
      <br />
      <br />

      <button onClick={acceptJob}>Accept Job</button>
      <br />
      <br />

      <button onClick={submitWork}>Submit Work</button>
      <br />
      <br />

      <button onClick={approvePayment}>Approve Payment</button>
    </div>
  );
}

export default App;
