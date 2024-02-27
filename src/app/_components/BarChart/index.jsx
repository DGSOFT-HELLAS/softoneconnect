'use client'
import styles from './bar.module.css'
import React from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';




const BarChartComponent = ({data, dataKeyX, label}) => {
    return (
        <ResponsiveContainer width="100%" height={350}>
        <BarChart data={data}  >
          <XAxis
            dataKey={dataKeyX}
            stroke={"var(--foreground)"}
            fontSize={10}
            tickLine={false}
            axisLine={false}
           
          />
          <YAxis
            stroke={"var(--foreground)"}
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `${value}`}
          />
            <Tooltip cursor={{fill: 'var(--background-main)'}} content={<CustomTooltip />} />

          <Bar
            legendType="circle"
            dataKey="total"
            fill="currentColor"
            radius={[4, 4, 0, 0]}
            className="fill-primary"
          />
        </BarChart>
      </ResponsiveContainer>
    )
}


const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const dataItem = payload[0].payload;
      return (
        <div style={{ background: 'var(--background-main)', padding: '10px', borderRadius: '5px'}}>
          <p>{`Agent: `} 
            <span className={styles.tickets_toolip_agent}>
              {dataItem.agent}
            </span>
          </p>
          <p>{`Total Tickets: `}
          <span className={styles.tickets_toolip_agent}>
              {dataItem.total}
            </span>
          </p>
        </div>
      );
    }
  
    return null;
  };
export default BarChartComponent;