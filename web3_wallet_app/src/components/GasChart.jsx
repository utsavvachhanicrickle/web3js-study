import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useEffect, useState } from "react";

const GasChart = ({ currentGas }) => {
  const [data, setData] = useState([]);
  const [currency, setCurrency] = useState("USD");
  const [ethPrice, setEthPrice] = useState({});

  const symbols = {
    USD: "$",
    INR: "₹",
    EUR: "€",
    GBP: "£",
  };

  // 🌍 Fetch ETH price
  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const res = await fetch(
          "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd,inr,eur,gbp"
        );
        const json = await res.json();
        setEthPrice(json.ethereum);
      } catch (err) {
        console.error(err);
      }
    };

    fetchPrice();
  }, []);

  // 📊 Update data
  useEffect(() => {
    const interval = setInterval(() => {
      let converted = Number(currentGas);

      if (ethPrice && currency) {
        converted = currentGas * (ethPrice[currency.toLowerCase()] || 1);
      }

      setData((prev) => [
        ...prev.slice(-10),
        {
          time: new Date().toLocaleTimeString(),
          gas: Number(currentGas),          // raw gas
          price: Number(converted.toFixed(2)), // converted value
        },
      ]);
    }, 2500);

    return () => clearInterval(interval);
  }, [currentGas, currency, ethPrice]);

  return (
    <div className="mt-6 p-4 rounded-xl border text-(--text) border-[rgb(var(--border))] bg-[rgb(var(--card))]">
      
      {/* Header */}
      <div className="flex justify-between mb-4">
        <h2 className="font-semibold text-[rgb(var(--text))]">
          Gas Analytics
        </h2>

        <select
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          className="bg-[rgb(var(--bg))] border border-[rgb(var(--border))] px-2 py-1 rounded"
        >
          <option value="USD">USD</option>
          <option value="INR">INR</option>
          <option value="EUR">EUR</option>
          <option value="GBP">GBP</option>
        </select>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          
          <CartesianGrid stroke="rgba(150,150,150,0.2)" strokeDasharray="5 5" />

          <XAxis
            dataKey="time"
            tick={{ fill: "rgb(var(--muted))", fontSize: 10 }}
          />

          <YAxis
            tick={{ fill: "rgb(var(--muted))", fontSize: 10 }}
          />

          <Tooltip
            formatter={(value, name) =>
              name === "price"
                ? `${symbols[currency]} ${value}`
                : `${value} Gwei`
            }
          />

          <Legend align="right" />

          {/* Line 1: Gas */}
          <Line
            type="monotone"
            dataKey="gas"
            stroke="#6366f1"
            strokeWidth={2}
            name="Gas (Gwei)"
            dot={false}
          />

          {/* Line 2: Converted Price */}
          <Line
            type="monotone"
            dataKey="price"
            stroke="#22c55e"
            strokeWidth={2}
            name={`Price (${currency})`}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GasChart;