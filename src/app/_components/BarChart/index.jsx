'use client'
import styles from './bar.module.css'
import React from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// const data = [
//     {
//         name: "Jan",
//         total: Math.floor(Math.random() * 5000) + 1000,
//     },
//     {
//         name: "Feb",
//         total: Math.floor(Math.random() * 5000) + 1000,
//     },
//     {
//         name: "Mar",
//         total: Math.floor(Math.random() * 5000) + 1000,
//     },
//     {
//         name: "Apr",
//         total: Math.floor(Math.random() * 5000) + 1000,
//     },
//     {
//         name: "May",
//         total: Math.floor(Math.random() * 5000) + 1000,
//     },
//     {
//         name: "Jun",
//         total: Math.floor(Math.random() * 5000) + 1000,
//     },
//     {
//         name: "Jul",
//         total: Math.floor(Math.random() * 5000) + 1000,
//     },
//     {
//         name: "Aug",
//         total: Math.floor(Math.random() * 5000) + 1000,
//     },
//     {
//         name: "Sep",
//         total: Math.floor(Math.random() * 5000) + 1000,
//     },
//     {
//         name: "Oct",
//         total: Math.floor(Math.random() * 5000) + 1000,
//     },
//     {
//         name: "Nov",
//         total: Math.floor(Math.random() * 5000) + 1000,
//     },
//     {
//         name: "Dec",
//         total: Math.floor(Math.random() * 5000) + 1000,
//     },
// ]


const BarChartComponent = ({data, dataKeyX}) => {
    return (
        <ResponsiveContainer width="100%" height={350}>
        <BarChart data={data}>
          <XAxis
            dataKey={dataKeyX}
            stroke="#ffffff"
            fontSize={10}
            tickLine={false}
            axisLine={false}
            angle={-45} textAnchor="end"
          />
          <YAxis
            
            stroke="#ffffff"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `${value}`}
          />
          <Bar
            legendType="plainline"
            dataKey="total"
            fill="currentColor"
            radius={[4, 4, 0, 0]}
            className="fill-primary"
          />
        </BarChart>
      </ResponsiveContainer>
    )
}

export default BarChartComponent;