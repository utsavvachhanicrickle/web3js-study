const WalletOverview = ({ data }) => {
  return (
   <div className="bg-[rgb(var(--card))] p-4 rounded-xl shadow border border-[rgb(var(--border))]">
  <h2 className="font-semibold mb-2">Wallet Overview</h2>
  <p className="text-[rgb(var(--muted))]">Balance: {data.balance} ETH</p>
</div>
  );
};

export default WalletOverview;
