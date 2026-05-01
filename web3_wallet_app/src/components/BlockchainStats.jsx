const BlockchainStats = ({ data }) => {
  return (
    <div className="bg-(--card) text-(--text) p-4 rounded-xl shadow mt-4 border border-(--border) ">
      <h2 className="font-semibold mb-2">Blockchain Stats</h2>
      <p>Latest Block: {data.blockNumber}</p>
    </div>
  );
};

export default BlockchainStats;
