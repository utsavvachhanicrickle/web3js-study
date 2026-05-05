import { initWeb3 } from "./web3";

export const connectWallet = async () => {
  if (!window.ethereum) throw new Error("MetaMask not found");

  await window.ethereum.request({
    method: "eth_requestAccounts",
  }); 

  return getWalletData();
};

export const getWalletData = async () => {
  const web3 = initWeb3();
  if (!web3) return null;

  const accounts = await web3.eth.getAccounts();
  if (accounts.length === 0) return null;

  const account = accounts[0];
  console.log(accounts[0]);
  const balanceWei = await web3.eth.getBalance(account);
  const balanceEth = web3.utils.fromWei(balanceWei, "ether");

  const chainId = await web3.eth.getChainId();
  const networkId = await web3.eth.net.getId();

  const blockNumber = await web3.eth.getBlockNumber();
  const gasPrice = await web3.eth.getGasPrice();

  return {
    account,
    balance: balanceEth,
    chainId,
    networkId,
    blockNumber,
    gasPrice: web3.utils.fromWei(gasPrice, "gwei"),
  };
};
