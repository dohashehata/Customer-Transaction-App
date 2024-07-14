
import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const TransactionGraph = ({ transactions }) => {
  
  const data = transactions.map(t => ({
    date: t.date,
    amount: t.amount,
  }));

  return (
    <div style={{ background: '#121212', padding: '20px', borderRadius: '10px' }}>
      <h2 style={{ color: '#fff', textAlign: 'center' }}>Area Chart</h2>
      <ResponsiveContainer width="100%" height={400}>
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#444" />
          <XAxis dataKey="date" stroke="#888" />
          <YAxis stroke="#888" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="amount"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#colorAmount)"
            animationDuration={1500}
            animationEasing="ease-in-out"
          />
          <defs>
            <linearGradient id="colorAmount" x1="2" y1="1" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
          </defs>
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TransactionGraph;
