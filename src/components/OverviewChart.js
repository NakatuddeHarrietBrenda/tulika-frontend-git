import { PieChart, Pie, Cell, Tooltip } from "recharts";
import { useEffect, useState } from "react";

function OverviewChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/overview")
      .then(res => res.json())
      .then(res => {
        setData([
          { name: "Packages", value: res.packages },
          { name: "Customers", value: res.customers },
          { name: "Bookings", value: res.bookings }
        ]);
      });
  }, []);

  const COLORS = ["#8884d8", "#82ca9d", "#ffc658"];

  return (
    <PieChart width={400} height={300}>
      <Pie data={data} dataKey="value" outerRadius={100} label>
        {data.map((_, index) => (
          <Cell key={index} fill={COLORS[index]} />
        ))}
      </Pie>
      <Tooltip />
    </PieChart>
  );
}

export default OverviewChart;