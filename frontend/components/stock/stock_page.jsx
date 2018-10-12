import React from 'react';
import { connect } from 'react-redux';
import { fetchStock } from '../../actions/stock';
import { LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';

class StockPage extends React.Component {
  constructor(props) {
    super(props);
    this.symbol = this.symbol.bind(this);
  }

  componentDidMount() {
    if (this.props.stock === undefined) {
      this.props.fetchStock(this.symbol());
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.stock === null) {
      this.props.history.push("/");
    } else if (this.props.stock === undefined) {
      prevProps.fetchStock(this.symbol());
    }
  }

  symbol() {
    return this.props.match.params.symbol.toUpperCase();
  }

  render () {
    if (!this.props.stock) return '';
    // debugger;
    return (
      <div>
        <h1>{this.props.stock.symbol}</h1>
        <LineChart width={676} height={196} data={this.props.stock['1D']}>
          <XAxis dataKey="time" hide={true} />
          <YAxis type="number" domain={['dataMin', 'dataMax']} hide={true} />
          <Line
            type="monotone"
            dataKey="priceCents"
            stroke="#82ca9d"
            dot={false}
            activeDot={{ r: 4 }}
            type="linear" />
          <Tooltip/>
        </LineChart>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  stock: state.stocks[ownProps.match.params.symbol.toUpperCase()]
});

export default connect(mapStateToProps, { fetchStock })(StockPage);
