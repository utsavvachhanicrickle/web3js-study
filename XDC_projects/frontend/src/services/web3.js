import Web3 from "web3";

const getWeb3 = async () => {

  if (!window.ethereum) {

    throw new Error(
      "MetaMask not installed"
    );
  }

  await window.ethereum.request({
    method: "eth_requestAccounts"
  });

  return new Web3(window.ethereum);
};

export default getWeb3;