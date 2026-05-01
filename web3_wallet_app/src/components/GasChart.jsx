import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { useEffect, useState } from "react";

const GasChart = ({ currentGas }) => {
  const [data, setData] = useState([]);
  const [currency, setCurrency] = useState("USD");
  const [ethPrice, setEthPrice] = useState({});
  const [lastUpdated, setLastUpdated] = useState("");

  // 🌍 Currency symbols
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

  // 📊 Update chart
  useEffect(() => {
    const interval = setInterval(() => {
      let value = Number(currentGas);

      if (ethPrice && currency) {
        value = currentGas * (ethPrice[currency.toLowerCase()] || 1);
      }

      const formatted = Number(value.toFixed(2));

      setData((prev) => [
        ...prev.slice(-14),
        {
          time: new Date().toLocaleTimeString(),
          gas: formatted,
        },
      ]);

      setLastUpdated(new Date().toLocaleTimeString());
    }, 2500);

    return () => clearInterval(interval);
  }, [currentGas, currency, ethPrice]);

  const latestValue = data.length > 0 ? data[data.length - 1].gas : 0;

  return (
    <div className="mt-6 p-px rounded-2xl">
      <div className="bg-[rgba(255,255,255,0.05)] backdrop-blur-xl rounded-2xl p-5 border border-[rgb(var(--border))]">

        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-lg font-semibold text-[rgb(var(--text))]">
              Gas Price Trend
            </h2>

            {/* 💰 Current Value */}
            <p className="text-2xl font-bold mt-1">
              {symbols[currency]} {latestValue}
            </p>

            {/* ⏱️ Last updated */}
            <p className="text-xs text-[rgb(var(--muted))]">
              Updated: {lastUpdated}
            </p>
          </div>

          {/* Dropdown */}
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="bg-[rgb(var(--bg))] text-[rgb(var(--text))] border border-[rgb(var(--border))] px-3 py-1 rounded-lg"
          >
            <option value="USD">USD</option>
            <option value="INR">INR</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
          </select>
        </div>

        {/* Chart */}
        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={data}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(150,150,150,0.1)"
            />

            <defs>
              <linearGradient id="gasGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0.1} />
              </linearGradient>
            </defs>

            <XAxis
              dataKey="time"
              tick={{ fill: "rgb(var(--muted))", fontSize: 10 }}
            />
            <YAxis
              tick={{ fill: "rgb(var(--muted))", fontSize: 10 }}
            />

            <Tooltip
              formatter={(value) => `${symbols[currency]} ${value}`}
              contentStyle={{
                backgroundColor: "rgb(var(--card))",
                border: "1px solid rgb(var(--border))",
                borderRadius: "10px",
                color: "rgb(var(--text))",
              }}
            />

            <Line
              type="monotone"
              dataKey="gas"
              stroke="url(#gasGradient)"
              strokeWidth={3}
              dot={false}
              activeDot={{ r: 6 }}
              isAnimationActive={true}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default GasChart;