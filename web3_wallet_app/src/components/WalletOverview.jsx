const WalletOverview = ({ data }) => {
  return (
    <div className="bg-(--card) text-(--text) p-4 rounded-xl shadow border border-(--border)">
      <h2 className="font-semibold mb-2">Wallet Overview</h2>
      <p className="text-(--muted)">Balance: {data.balance} ETH</p>
    </div>
  );
};

export default WalletOverview;
