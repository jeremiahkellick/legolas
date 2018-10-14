import React from 'react';
import { formatMoney } from '../../util/util';
import { connect } from 'react-redux';
import { createTransaction } from '../../actions/transaction';
import ErrorSVG from '../error/error_svg';

class StockForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { shares: '' };
    this.updateShares = this.updateShares.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  updateShares(e) {
    this.setState({ shares: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.shares !== '' && parseInt(this.state.shares) > 0) {
      this.props.createTransaction({
        shares: this.state.shares,
        symbol: this.props.stock.symbol
      }).then(() => this.setState({ shares: '' }));
    }
  }

  render () {
    const { stock, currentUser, errors } = this.props;
    const shares = this.state.shares;
    const sharesNum = shares === '' ? 0 : parseInt(shares);
    return (
      <div>
        <form
          onSubmit={this.handleSubmit}
          className="stock-form hoverable-inputs">

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
          { errors.map(error =>
            <div class="error">
              <ErrorSVG />
              <div>{error}</div>
            </div>
          ) }
          <input type="submit" value="Submit Order" />
        </form>
        <section className="buying-power">
          {formatMoney(currentUser.balanceCents / 100)}&nbsp;
          Buying Power Available
        </section>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.session.currentUser,
  errors: state.errors
});

export default connect(mapStateToProps, { createTransaction })(StockForm);
