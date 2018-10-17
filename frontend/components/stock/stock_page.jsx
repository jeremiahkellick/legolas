import React from 'react';
import { connect } from 'react-redux';
import { fetchStock } from '../../actions/stock';
import StockSidebar from './stock_sidebar';
import StockMain from './stock_main';

class StockPage extends React.Component {
  constructor(props) {
    super(props);
    this.symbol = this.symbol.bind(this);
  }

  componentDidMount() {
    const stock = this.props.stock;
    if (stock === undefined || stock.companyName === undefined) {
      this.props.fetchStock(this.symbol());
    }
  }

  componentDidUpdate(prevProps) {
    const stock = this.props.stock;
    if (stock === null) {
      this.props.history.push("/");
    } else if (stock === undefined || stock.companyName === undefined) {
      prevProps.fetchStock(this.symbol());
    }
  }

  symbol() {
    return this.props.match.params.symbol.toUpperCase();
  }

  render () {
    if (!this.props.stock.companyName) return '';
    return (
      <div className="container">
        <StockMain stock={this.props.stock} />
        <StockSidebar stock={this.props.stock} />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  stock: state.stocks[ownProps.match.params.symbol.toUpperCase()]
});

export default connect(mapStateToProps, { fetchStock })(StockPage);
