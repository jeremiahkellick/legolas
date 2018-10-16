import React from 'react';
import { LineChart, Line, XAxis, YAxis } from 'recharts';

const SmallGraph = ({ stock }) => {
  const first = stock["1D"].points[0].priceCents;
  const last = stock["1D"].points[stock["1D"].points.length - 1].priceCents;
  const color = first > last ? 'rgb(244, 85, 49)' : 'rgb(33, 206, 153)';
  return (
    <div className="small-graph">
      <LineChart
        width={60}
        height={30}
        data={stock["1D"].points}>
        <XAxis
          type="number"
          dataKey="time"
          domain={[stock["1D"].min, stock["1D"].max]}
          hide={true} />
        <YAxis type="number" domain={['dataMin', 'dataMax']} hide={true} />
        <Line
          type="monotone"
          dataKey="priceCents"
          stroke={color}
          strokeWidth="1"
          dot={false}
          activeDot={{ r: 5, stroke: null, fill: null }}
          type="linear" />
      </LineChart>
    </div>
  );
};

export default SmallGraph;
