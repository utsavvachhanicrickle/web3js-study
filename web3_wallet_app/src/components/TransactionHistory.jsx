import { useEffect, useState } from "react";

const TransactionHistory = ({ account }) => {
  const [txs, setTxs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!account) return;

    const fetchTxs = async () => {
      try {
        setLoading(true);

        const res = await fetch(
          `https://api-sepolia.etherscan.io/api?module=account&action=txlist&address=${account}&startblock=0&endblock=99999999&sort=desc&apikey=YourApiKey`
        );

        const data = await res.json();

        console.log("Etherscan:", data);

        // ✅ SAFE CHECK
        if (data.status === "1" && Array.isArray(data.result)) {
          setTxs(data.result.slice(0, 10)); // latest 10
        } else {
          setTxs([]);
        }
      } catch (err) {
        console.error(err);
        setTxs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTxs();
  }, [account]);

  return (
    <div className="p-4 mt-6 rounded-xl border border-(--border) bg-(--card) text-(--text)">
      <h2 className="font-semibold mb-4 text-lg">
        Transaction History
      </h2>

      {/* 🔄 Loading */}
      {loading && (
        <p className="text-center text-(--muted)">
          Loading transactions...
        </p>
      )}

      {/* 🚫 Empty */}
      {!loading && txs.length === 0 && (
        <p className="text-center text-(--muted)">
          No transactions found 🚫
        </p>
      )}

      {/* 📊 Table */}
      {!loading && txs.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-(--border)">
                <th className="text-left p-2">Type</th>
                <th className="text-left p-2">Address</th>
                <th className="text-left p-2">Amount</th>
                <th className="text-left p-2">Time</th>
                <th className="text-left p-2">Tx</th>
              </tr>
            </thead>

            <tbody>
              {txs.map((tx) => {
                const isOutgoing =
                  tx.from.toLowerCase() === account.toLowerCase();

                return (
                  <tr
                    key={tx.hash}
                    className="border-b border-(--border) hover:bg-[rgba(255,255,255,0.03)]"
                  >
                    {/* 🔄 Type */}
                    <td className="p-2">
                      {isOutgoing ? (
                        <span className="text-red-400">Sent</span>
                      ) : (
                        <span className="text-green-400">Received</span>
                      )}
                    </td>

                    {/* 📍 Address */}
                    <td className="p-2">
                      {(isOutgoing ? tx.to : tx.from).slice(0, 6)}...
                      {(isOutgoing ? tx.to : tx.from).slice(-4)}
                    </td>

                    {/* 💰 Amount */}
                    <td className="p-2">
                      {(tx.value / 1e18).toFixed(4)} ETH
                    </td>

                    {/* ⏱ Time */}
                    <td className="p-2">
                      {new Date(
                        tx.timeStamp * 1000
                      ).toLocaleString()}
                    </td>

                    {/* 🔗 Tx Link */}
                    <td className="p-2 text-blue-400">
                      <a
                        href={`https://sepolia.etherscan.io/tx/${tx.hash}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        View
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TransactionHistory;