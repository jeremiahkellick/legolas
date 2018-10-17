import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';
import { formatMoney } from '../util/util';

class Graph extends React.Component {
  constructor(props) {
    super(props);
    this.state = { type: '1D' };
    this.showTooltipData = this.showTooltipData.bind(this);
    this.graph = this.graph.bind(this);
    this.price = this.price.bind(this);
  }

  showTooltipData(data) {
    const price = document.getElementById('price');
    const hover = document.getElementById('hover-price');
    if (price !== null && hover !== null) {
      if ( typeof data.payload[0] !== 'undefined') {
        price.classList.add('hide');
        hover.innerText = formatMoney(data.payload[0].value / 100);
      } else {
        price.classList.remove('hide');
        hover.innerText = '';
      }
    }
    data.viewBox = { x: -20, y: 0, width: 716, height: 400 };
    if (data.label !== undefined) {
      return (
        this.state.type === '1D' ? (
          <div className="time">{this._formatTime(new Date(data.label))}</div>
        ) : (
          <div className="time">
            {this._formatDate(new Date(data.label))}
          </div>
        )
      );
    }
  }

  _formatTime(time) {
    let min = time.getUTCMinutes().toString();
    if (min.length < 2) min = `0${min}`;
    let hours = time.getUTCHours() - 4;
    let peroid = 'AM';
    if (hours > 12) {
      hours -= 12;
      peroid = 'PM';
    }
    return `${hours}:${min} ${peroid} ET`;
  }

  _formatDate(date) {
    let [month, day, year] = date.toDateString().split(' ').slice(1);
    if (day === undefined) return '';
    if (day[0] === '0') day = day[1];
    return `${month} ${day}, ${year}`.toUpperCase();
  }

  render () {
    const data = this.props.data;
    return (
      <div>
        { this.price() }
        <div className="graph">
          { this.graph() }
          <ul>
            {
              ['1D', '1W', '1M', '3M', '1Y', '5Y'].map(type =>
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
      </div>
    );
  }

  price() {
    const data = this.props.data;
    if (data === undefined || data.priceCents === undefined) {
      return (
        <h1 className="price invisible">Price</h1>
      );
    }
    return (
      <h1 className="price">
        <span id="price">{formatMoney(data.priceCents / 100)}</span>
        <span id="hover-price"></span>
      </h1>
    );
  }

  graph() {
    const data = this.props.data;
    const type = this.state.type;
    if (data[type] === undefined || data[type].points.length === 0) {
      return <div className="graph-placeholder" />;
    }
    const currData = data[type].points;
    if (currData[0].priceCents > currData[currData.length - 1].priceCents) {
      document.body.classList.add('red');
    } else {
      document.body.classList.remove('red');
    }
    return (
      <LineChart
        width={676}
        height={196}
        data={data[type].points}>
        <XAxis
          type="number"
          dataKey="time"
          domain={[data[type].min, data[type].max]}
          hide={true} />
        <YAxis type="number" domain={['dataMin', 'dataMax']} hide={true} />
        <Tooltip
          isAnimationActive={false}
          content={this.showTooltipData}
          position={{ y: -19 }}
          offset={-35}
          cursor={{ stroke: null }}
          viewBox={{ x: -20, y: 0, width: 716, height: 400 }} />
        <Line
          type="monotone"
          dataKey="priceCents"
          stroke={null}
          strokeWidth="2"
          dot={false}
          activeDot={{ r: 5, stroke: null, fill: null }}
          type="linear" />
      </LineChart>
    );
  }
}

export default Graph;
