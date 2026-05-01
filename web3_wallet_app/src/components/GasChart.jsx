import { LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";
import { useEffect, useState } from "react";

const GasChart = ({ currentGas }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setData((prev) => [
        ...prev.slice(-9),
        {
          time: new Date().toLocaleTimeString(),
          gas: Number(currentGas),
        },
      ]);
    }, 3000);

    return () => clearInterval(interval);
  }, [currentGas]);

  return (
    <div className="bg-[rgb(var(--card))] p-4 rounded-xl shadow mt-4 border border-[rgb(var(--border))]">
      <h2 className="font-semibold mb-2">Gas Price Trend</h2>
      <LineChart width={400} height={200} data={data}>
        <XAxis dataKey="time" hide />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="gas" />
      </LineChart>
    </div>
  );
};

export default GasChart;
