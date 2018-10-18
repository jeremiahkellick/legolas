import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';
import { formatMoney } from '../util/util';
import Loader from './loader';

class Graph extends React.Component {
  constructor(props) {
    super(props);
    this.state = { type: '1D' };
    this.showTooltipData = this.showTooltipData.bind(this);
    this.graph = this.graph.bind(this);
    this.price = this.price.bind(this);
    this.priceRef = React.createRef();
    this.hoverPriceRef = React.createRef();
    this.priceChangeRef = React.createRef();
    this.hoverPriceChangeRef = React.createRef();
  }

  showTooltipData(tooltipData) {
    const data = this.props.data;
    const type = this.state.type;
    const price = this.priceRef.current;
    const hover = this.hoverPriceRef.current;
    const priceChange = this.priceChangeRef.current;
    const hoverPriceChange = this.hoverPriceChangeRef.current;
    if (price && hover) {
      if (typeof tooltipData.payload[0] !== 'undefined') {
        price.classList.add('hide');
        hover.innerText = formatMoney(tooltipData.payload[0].value / 100);
      } else {
        price.classList.remove('hide');
        hover.innerText = '';
      }
    }
    if (priceChange && hoverPriceChange) {
      if (typeof tooltipData.payload[0] !== 'undefined') {
        priceChange.classList.add('hide');
        const firstPrice = data[type].points[0].priceCents;
        const priceChangeNum = tooltipData.payload[0].value - firstPrice;
        const percentChange = priceChangeNum / firstPrice * 100;
        hoverPriceChange.innerText = formatMoney(priceChangeNum / 100, true) +
                                     ` (${percentChange.toFixed(2)}%)`;
      } else {
        priceChange.classList.remove('hide');
        hoverPriceChange.innerText = '';
      }
    }
    tooltipData.viewBox = { x: -20, y: 0, width: 716, height: 400 };
    let timeString = '';
    if (this.state.type === '1D') {
      timeString = `${this._formatTime(new Date(tooltipData.label))} ET`;
    } else if (this.weekAndDetailed()) {
      const time = this._formatTime(new Date(tooltipData.label));
      const date = this._formatDate(new Date(tooltipData.label), false);
      timeString = `${time}, ${date} ET`;
    } else {
      timeString = this._formatDate(new Date(tooltipData.label));
    }
    if (tooltipData.label !== undefined) {
      return (
        <div className="time">
          {timeString}
        </div>
      );
    }
  }

  weekAndDetailed() {
    const type = this.state.type;
    return type === '1W' && this.props.data[type].detailed;
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
    return `${hours}:${min} ${peroid}`;
  }

  _formatDate(date, includeYear = true) {
    let [month, day, year] = date.toDateString().split(' ').slice(1);
    if (day === undefined) return '';
    if (day[0] === '0') day = day[1];
    if (includeYear) {
      return `${month} ${day}, ${year}`.toUpperCase();
    } else {
      return `${month} ${day}`.toUpperCase();
    }
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
    const type = this.state.type;
    if (!data || data.priceCents === undefined || !data[type]) {
      return (
        <div>
          <h1 className="price invisible">Price</h1>
          <p className="price-change invisible"></p>
        </div>
      );
    }
    const priceChange = data.priceCents - data[type].points[0].priceCents;
    const percentChange = priceChange / data[type].points[0].priceCents * 100;
    const timeStrings = {
      '1D': 'Today',
      '1W': 'Past Week',
      '1M': 'Past Month',
      '3M': 'Past 3 Months',
      '1Y': 'Past Year',
      '5Y': 'Past 5 Years'
    };
    return (
      <div>
        <h1 className="price">
          <span ref={this.priceRef}>{formatMoney(data.priceCents / 100)}</span>
          <span ref={this.hoverPriceRef}></span>
        </h1>
        <p className="price-change">
          <span ref={this.priceChangeRef}>
            {
              formatMoney(priceChange / 100, true) +
              ` (${percentChange.toFixed(2)}%) ` +
              timeStrings[type]
            }
          </span>
          <span ref={this.hoverPriceChangeRef}></span>
        </p>
      </div>
    );
  }

  graph() {
    const data = this.props.data;
    const type = this.state.type;
    if (data[type] === undefined || data[type].points.length === 0) {
      return <div className="graph-placeholder"><Loader /></div>;
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
          type={this.weekAndDetailed() ? "category" : "number"}
          dataKey="time"
          domain={[data[type].min, data[type].max]}
          hide={true} />
        <YAxis type="number" domain={['dataMin', 'dataMax']} hide={true} />
        <Tooltip
          isAnimationActive={false}
          content={this.showTooltipData}
          position={{ y: -19 }}
          offset={this.weekAndDetailed() ? -60 : -35}
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
