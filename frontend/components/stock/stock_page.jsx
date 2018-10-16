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
