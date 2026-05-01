const NetworkInfo = ({ data }) => {
  return (
    <div className="bg-[rgb(var(--card))] p-4 rounded-xl shadow border border-[rgb(var(--border))]">
      <h2 className="font-semibold mb-2">Network Info</h2>

      <p>Chain ID: {data.chainId}</p>
      <p>Network ID: {data.networkId}</p>
      <p>Gas Price: {data.gasPrice} Gwei</p>
    </div>
  );
};

export default NetworkInfo;
