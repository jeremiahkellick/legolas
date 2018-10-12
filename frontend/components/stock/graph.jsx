import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';

class Graph extends React.Component {
  constructor(props) {
    super(props);
    this.state = { type: '1D' };
  }

  render () {
    const data = this.props.data;
    return (
      <div className="graph">
        <LineChart width={676} height={196} data={data[this.state.type]}>
          <XAxis dataKey="time" hide={true} />
          <YAxis type="number" domain={['dataMin', 'dataMax']} hide={true} />
          <Line
            type="monotone"
            dataKey="priceCents"
            stroke="#21ce99"
            strokeWidth="2"
            dot={false}
            activeDot={{ r: 5 }}
            type="linear" />
          <Tooltip wrapperStyle={{ visibility: 'hidden' }} />
        </LineChart>
        <ul>
          {
            ['1D', '1M', '3M', '1Y', '5Y'].map(type =>
              <li key={type}>
                <button
                  onClick={() => this.setState({ type })}
                  className={this.state.type === type ? "active" : ""}>

                  {type}
                </button>
              </li>
            )
          }
        </ul>
      </div>
    );
  }
}

export default Graph;
