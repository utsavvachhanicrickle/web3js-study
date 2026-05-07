import { useDispatch } from "react-redux";

import { setWallet } from "../features/wallet/walletSlice";

import getWeb3 from "../services/web3";

const WalletButton = () => {
  const dispatch = useDispatch();

  const connectWallet = async () => {
    try {
      const web3 = await getWeb3();

      const accounts = await web3.eth.getAccounts();

      const balance = await web3.eth.getBalance(accounts[0]);

      const chainId = await web3.eth.getChainId();

      dispatch(
        setWallet({
          account: accounts[0],
          balance: balance.toString(),
          chainId: Number(chainId),
        }),
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <button onClick={connectWallet} className="bg-blue-600 px-4 py-2 rounded">
      Connect Wallet
    </button>
  );
};

export default WalletButton;
