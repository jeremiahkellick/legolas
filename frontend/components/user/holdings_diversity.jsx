import React from 'react';
import { connect } from 'react-redux';
import { PieChart, Pie } from 'recharts';

const data = [];

class HoldingsDiversity extends React.Component {
  renderLabel({cx, cy, midAngle, innerRadius, outerRadius, percent, index}) {
    const radius = innerRadius + (outerRadius - innerRadius) * 1.5;
    const x = cx + radius * Math.cos(-midAngle * Math.PI / 180);
    const y = cy + radius * Math.sin(-midAngle * Math.PI / 180);

    const item = data[index];

    return (
      <text x={x} y={y} fill="black" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" key={`label-${data.Id}-${item.Id}`}>
        {item.name}
      </text>
    );
  }

  render () {
    const sharesOf = this.props.sharesOf;
    while (data.length > 0) data.pop();
    const total = Object.values(sharesOf).reduce((acc, el) => acc + el, 0);
    Object.keys(sharesOf).forEach(symbol => {
      if (sharesOf[symbol] > 0) {
        data.push({
          name: symbol,
          value: Math.round(sharesOf[symbol] / total * 100)
        });
      }
    });
    return (
      <PieChart width={800} height={240}>
        <Pie
          animationEasing="ease-in-out"
          animationDuration={500}
          data={data}
          cx={500}
          cy={120}
          innerRadius={60}
          outerRadius={80}
          fill="#82ca9d"
          startAngle={225}
          endAngle={-135}
          label={this.renderLabel}
          labelLine={false} />
      </PieChart>
    );
  }
}

const mapStateToProps = state => ({
  sharesOf: state.session.currentUser.sharesOf
});

export default connect(mapStateToProps)(HoldingsDiversity);
