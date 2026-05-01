import Web3 from "web3";

let web3;

export const initWeb3 = () => {
  if (window.ethereum) {
    web3 = new Web3(window.ethereum);
    return web3;
  } else {
    alert("Install MetaMask");
    return null;
  }
};

export default web3;