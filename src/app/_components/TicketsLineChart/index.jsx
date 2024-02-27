'use client'
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  {
    date: '2023-01-01',
    toDo: 3,
    completed: 0,
    inProgress: 3,
  },
  {
    date: '2023-01-02',
    toDo: 2,
    completed: 5,
    inProgress: 3,
  },
  {
    date: '2023-01-03',
    toDo: 2,
    completed: 5,
    inProgress: 3,
  },
  {
    date: '2023-01-04',
    toDo: 8,
    completed: 2,
    inProgress: 5,
  },
 
];

const TicketsLineChart = () => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart
        layout="horizontal"
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 10,
        }}
      >
        <CartesianGrid strokeDasharray="4 4"   stroke="white"  opacity={0.2}/>
        <XAxis 
            dataKey="date" 
            stroke="var(--foreground)"
            fontSize={12}
            tickMargin={10}
            />
        <YAxis 
            stroke="var(--foreground)" 
            tickMargin={10}
            />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="toDo" stroke="var(--primary)" activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="inProgress" stroke="#ff0bb6" activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="completed" stroke="#21e607" activeDot={{ r: 8 }} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default TicketsLineChart;
