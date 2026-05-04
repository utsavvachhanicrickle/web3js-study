import { useEffect, useState } from "react";

const DEMO_ACCOUNTS = [
  {
    label: "Binance Wallet 1",
    address: "0x28C6c06298d514Db089934071355E5743bf21d60",
  },
  {
    label: "Vitalik Wallet",
    address: "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045",
  },
];

const TransactionHistory = () => {
  const [selectedAccount, setSelectedAccount] = useState(
    DEMO_ACCOUNTS[0].address
  );
  const [txs, setTxs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const pageSize = 20;

  useEffect(() => {
    const apiKey = import.meta.env.VITE_ETHERSCAN_API_KEY;

    const fetchTxs = async () => {
      try {
        setLoading(true);

        const res = await fetch(
          `https://api.etherscan.io/v2/api?chainid=1&module=account&action=txlist&address=${selectedAccount}&page=${page}&offset=${pageSize}&sort=desc&apikey=${apiKey}`
        );

        const data = await res.json();
        console.log("Etherscan:", data);

        if (data.status === "1" && Array.isArray(data.result)) {
          setTxs(data.result);
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
  }, [selectedAccount, page]);

  const getAge = (timestamp) => {
    const secondsAgo = Math.floor(Date.now() / 1000 - timestamp);
    const minutes = Math.floor(secondsAgo / 60);

    if (minutes < 1) return `${secondsAgo}s ago`;
    if (minutes < 60) return `${minutes} mins ago`;

    const hours = Math.floor(minutes / 60);
    return `${hours} hrs ago`;
  };

  return (
    <div className="p-4 mt-6 rounded-xl border text-text border-(--border) bg-(--card)">
      <h2 className="font-semibold mb-4 text-lg">Transaction History</h2>

      {/* 🔽 Dropdown */}
      <select
        value={selectedAccount}
        onChange={(e) => {
          setSelectedAccount(e.target.value);
          setPage(1); // reset page
        }}
        className="mb-4 p-2 rounded "
      >
        {DEMO_ACCOUNTS.map((acc) => (
          <option key={acc.address} value={acc.address}>
            {acc.label}
          </option>
        ))}
      </select>

      {/* 🔄 Loading */}
      {loading && <p className="text-center">Loading...</p>}

      {/* 🚫 Empty */}
      {!loading && txs.length === 0 && (
        <p className="text-center">No transactions found 🚫</p>
      )}

      {/* 📊 Table */}
      {!loading && txs.length > 0 && (
        <>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="p-2 text-left">Status</th>
                <th className="p-2 text-left">Method</th>
                <th className="p-2 text-left">From</th>
                <th className="p-2 text-left">To</th>
                <th className="p-2 text-left">Amount</th>
                <th className="p-2 text-left">Age</th>
                <th className="p-2 text-left">Tx</th>
              </tr>
            </thead>

            <tbody>
              {txs.map((tx) => (
                <tr key={tx.hash} className="border-b">
                  <td className="p-2">
                    {tx.isError === "0" ? (
                      <span className="text-green-400">Success</span>
                    ) : (
                      <span className="text-red-400">Failed</span>
                    )}
                  </td>

                  <td className="p-2">
                    {tx.input === "0x" ? "Transfer" : "Contract"}
                  </td>

                  <td className="p-2">
                    {tx.from.slice(0, 6)}...{tx.from.slice(-4)}
                  </td>

                  <td className="p-2">
                    {tx.to
                      ? `${tx.to.slice(0, 6)}...${tx.to.slice(-4)}`
                      : "Contract"}
                  </td>

                  <td className="p-2">
                    {(Number(tx.value) / 1e18).toFixed(4)} ETH
                  </td>

                  <td className="p-2">
                    {getAge(Number(tx.timeStamp))}
                  </td>

                  <td className="p-2 text-blue-400">
                    <a
                      href={`https://etherscan.io/tx/${tx.hash}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      View
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* 🔢 Pagination Controls */}
          <div className="flex justify-between mt-4">
            <button
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              className="px-3 py-1  rounded"
            >
              ⬅ Prev
            </button>

            <span>Page {page}</span>

            <button
              onClick={() => setPage((p) => p + 1)}
              className="px-3 py-1  rounded"
            >
              Next ➡
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default TransactionHistory;