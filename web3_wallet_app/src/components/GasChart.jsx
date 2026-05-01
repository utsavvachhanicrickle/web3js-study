import {
  AreaChart,
  Area,
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
      let value = Number(currentGas);

      if (ethPrice && currency) {
        value = currentGas * (ethPrice[currency.toLowerCase()] || 1);
      }

      const formatted = Number(value.toFixed(2));

      setData((prev) => [
        ...prev.slice(-20),
        {
          time: new Date().toLocaleTimeString(),
          gas: formatted,
        },
      ]);

      setLastUpdated(new Date().toLocaleTimeString());
    }, 2500);

    return () => clearInterval(interval);
  }, [currentGas, currency, ethPrice]);

  const latest = data[data.length - 1]?.gas || 0;
  const first = data[0]?.gas || 0;

  // 📈 Calculate trend
  const change = latest - first;
  const percent = first ? ((change / first) * 100).toFixed(2) : 0;

  const isUp = change >= 0;

  return (
    <div className="mt-6 p-px rounded-2xl">
      <div className="bg-[rgba(255,255,255,0.05)] backdrop-blur-xl rounded-2xl p-5 border border-[rgb(var(--border))]">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-lg font-semibold text-[rgb(var(--text))]">
              Gas Market
            </h2>

            {/* 💰 Price */}
            <p className="text-2xl font-bold mt-1">
              {symbols[currency]} {latest}
            </p>

            {/* 📈 Change */}
            <p
              className={`text-sm ${
                isUp ? "text-green-500" : "text-red-500"
              }`}
            >
              {isUp ? "▲" : "▼"} {percent}% ({change.toFixed(2)})
            </p>

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

        {/* CHART */}
        <ResponsiveContainer width="100%" height={260}>
          <AreaChart data={data}>
            <CartesianGrid stroke="rgba(150,150,150,0.1)" />

            {/* Gradient */}
            <defs>
              <linearGradient id="colorGas" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={isUp ? "#22c55e" : "#ef4444"}
                  stopOpacity={0.7}
                />
                <stop
                  offset="95%"
                  stopColor={isUp ? "#22c55e" : "#ef4444"}
                  stopOpacity={0.05}
                />
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
              }}
            />

            <Area
              type="monotone"
              dataKey="gas"
              stroke={isUp ? "#22c55e" : "#ef4444"}
              fill="url(#colorGas)"
              strokeWidth={2}
              dot={false}
              isAnimationActive
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default GasChart;