import React from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const data = [
    {
        name: "InfoText",
        email: "+250786461106",
        messageBody: "Waguan Bad man",
        target: "Home",
        value:450
    },
    {
        name: "InfoText",
        email: "+250786461106",
        messageBody: "Waguan Bad man 1",
        target: "Home",
        value:235
    },
    {
        name: "InfoText",
        email: "+250786461106",
        messageBody: "Waguan Bad man 2",
        target: "Home",
        value:650
    },
    {
        name: "InfoText",
        email: "+250786461106",
        messageBody: "Waguan Bad man 3",
        target: "Home",
        value:350
    }
];

const Chart = () => {
  return (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer>
        <AreaChart
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis  />
          <Tooltip />
          <Area type="monotone" dataKey="value" stroke="#8884d8" fill="#8884d8" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
