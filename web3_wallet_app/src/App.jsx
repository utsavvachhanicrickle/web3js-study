import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import WalletOverview from "./components/WalletOverview";
import NetworkInfo from "./components/NetworkInfo";
import BlockchainStats from "./components/BlockchainStats";
import GasChart from "./components/GasChart";

import { connectWallet, getWalletData } from "./utils/wallet";
import { DarkModeContextProvider } from "./context/darkModeContext";

function App() {
  return (
    <DarkModeContextProvider>
      <MainApp />
    </DarkModeContextProvider>
  );
}

function MainApp() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      const res = await getWalletData();
      if (res) setData(res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleConnect = async () => {
    try {
      setLoading(true);
      const res = await connectWallet();
      setData(res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // ⚡ Auto connect + listeners
  useEffect(() => {
    load();

    if (window.ethereum) {
      const handleAccountsChanged = () => load();
      const handleChainChanged = () => load();

      window.ethereum.on("accountsChanged", handleAccountsChanged);
      window.ethereum.on("chainChanged", handleChainChanged);

      return () => {
        window.ethereum.removeListener(
          "accountsChanged",
          handleAccountsChanged
        );
        window.ethereum.removeListener(
          "chainChanged",
          handleChainChanged
        );
      };
    }
  }, []);

  return (
    <div className="min-h-screen bg-[rgb(var(--bg))] text-[rgb(var(--text))] transition">
      {/* Navbar */}
      <Navbar account={data?.account} />

      <div className="p-6">
        {/* Loading */}
        {loading && (
          <p className="text-center text-gray-600 dark:text-gray-300">
            Loading wallet data...
          </p>
        )}

        {/* Connect Button */}
        {!loading && !data && (
          <div className="flex justify-center">
            <button
              onClick={handleConnect}
              className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow"
            >
              Connect Wallet
            </button>
          </div>
        )}

        {!loading && data && (
          <>
            <div className="grid md:grid-cols-2 gap-4">
              <WalletOverview data={data} />
              <NetworkInfo data={data} />
            </div>

            <BlockchainStats data={data} />

            <GasChart currentGas={data.gasPrice} />
          </>
        )}
      </div>
    </div>
  );
}

export default App;