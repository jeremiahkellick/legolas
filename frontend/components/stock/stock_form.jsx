import React from 'react';
import { formatMoney } from '../../util/util';

class StockForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { shares: '' };
    this.updateShares = this.updateShares.bind(this);
  }

  updateShares(e) {
    this.setState({ shares: e.target.value });
  }

  render () {
    const stock = this.props.stock;
    const shares = this.state.shares;
    const sharesNum = shares === '' ? 0 : parseInt(shares);
    return (
      <form className="stock-form hoverable-inputs">
        <label>
          <div>Shares</div>
          <input
            type="number"
            placeholder="0"
            onChange={this.updateShares}
            value={this.state.shares} />
        </label>
        <div className="form-group bold">
          <div>Market Price</div>
          <div>{formatMoney(stock.priceCents / 100)}</div>
        </div>
        <div className="form-group cost bold">
          <div>Estimated Cost</div>
          <div>{formatMoney(stock.priceCents / 100 * sharesNum)}</div>
        </div>
      </form>
    );
  }
}

export default StockForm;
