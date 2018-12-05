import React from 'react';
import { connect } from 'react-redux';
import { PieChart, Pie } from 'recharts';
import Loader from '../loader';

const data = [];
const allocationData = [];

class PieCharts extends React.Component {
  renderLabel(data, {cx, cy, midAngle, innerRadius, outerRadius, percent, index}) {
    const radius = innerRadius + (outerRadius - innerRadius) * 1.8;
    const x = cx + radius * Math.cos(-midAngle * Math.PI / 180);
    const y = cy + radius * Math.sin(-midAngle * Math.PI / 180);

    const item = data[index];

    return (
      <text
        x={x}
        y={y}
        fill="black"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
        key={`label-${data.Id}-${item.Id}`}>

        {item.name}
      </text>
    );
  }

  stocksLoaded() {
    const { stocks, sharesOf } = this.props;
    return Object.keys(sharesOf).every(symbol =>
      stocks[symbol] && stocks[symbol].priceCents
    );
  }

  cashAllocationGraph() {
    if (!this.stocksLoaded()) return '';
    const { balanceCents, stocks, sharesOf } = this.props;
    const symbols = Object.keys(sharesOf);
    let assetsValue = 0;
    for (let i = 0; i < symbols.length; i++) {
      const symbol = symbols[i];
      assetsValue += stocks[symbol].priceCents * sharesOf[symbol];
    }
    while (allocationData.length > 0) {
      allocationData.pop();
    }
    allocationData.push({ name: 'Cash', value: balanceCents });
    allocationData.push({ name: 'Assets', value: assetsValue });
    return (
      <Pie
        animationEasing="ease-in-out"
        animationDuration={500}
        data={allocationData}
        dataKey="value"
        cx={150}
        cy={140}
        innerRadius={60}
        outerRadius={80}
        fill={null}
        stroke={null}
        startAngle={225}
        endAngle={-135}
        label={this.renderLabel.bind(this, allocationData)}
        labelLine={false} />
    );
  }

  holdingsPieChart() {
    if (!this.stocksLoaded()) return '';
    const { sharesOf, stocks } = this.props;
    while (data.length > 0) data.pop();
    Object.keys(sharesOf).forEach(symbol => {
      if (sharesOf[symbol] > 0) {
        data.push({
          name: symbol,
          value: Math.round(sharesOf[symbol] * stocks[symbol].priceCents)
        });
      }
    });
    return (
      <Pie
        animationEasing="ease-in-out"
        animationDuration={500}
        data={data}
        dataKey="value"
        cx={500}
        cy={140}
        innerRadius={60}
        outerRadius={80}
        fill={null}
        stroke={null}
        startAngle={225}
        endAngle={-135}
        label={this.renderLabel.bind(this, data)}
        labelLine={false} />
    );
  }

  render () {
    if (!this.stocksLoaded()) {
      return <div className="pie-charts-placeholder"><Loader /></div>;
    }
    return (
      <PieChart width={800} height={260}>
        <text
          className="heading"
          x="500"
          y="10"
          textAnchor="middle"
          dominantBaseline="central">Holdings</text>
        {this.holdingsPieChart()}
        <text
          className="heading"
          x="150"
          y="10"
          textAnchor="middle"
          dominantBaseline="central">

          Cash Allocation
        </text>
        { this.cashAllocationGraph() }
      </PieChart>
    );
  }
}

const mapStateToProps = state => ({
  balanceCents: state.session.currentUser.balanceCents,
  sharesOf: state.session.currentUser.sharesOf,
  stocks: state.stocks
});

export default connect(mapStateToProps)(PieCharts);
