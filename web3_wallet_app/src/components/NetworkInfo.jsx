const NetworkInfo = ({ data }) => {
  return (
    <div className="bg-(--card) text-(--text) p-4 rounded-xl shadow border border-(--border)">
      <h2 className="font-semibold mb-2">Network Info</h2>

      <p>Chain ID: {data.chainId}</p>
      <p>Network ID: {data.networkId}</p>
      <p>Gas Price: {data.gasPrice} Gwei</p>
    </div>
  );
};

export default NetworkInfo;
