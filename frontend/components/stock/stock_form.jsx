import React from 'react';
import { formatMoney } from '../../util/util';
import { connect } from 'react-redux';
import { createTransaction } from '../../actions/transaction';
import { clearErrors } from '../../actions/error';
import ErrorSVG from '../error/error_svg';

class StockForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { shares: '', tab: 'buy' };
    this.updateShares = this.updateShares.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTab = this.handleTab.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.stock.symbol !== this.props.stock.symbol) {
      this.setState({ shares: '', tab: 'buy' });
    }
  }

  updateShares(e) {
    this.setState({ shares: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.shares !== '' && parseInt(this.state.shares) > 0) {
      const sign = this.state.tab === 'buy' ? 1 : -1;
      this.props.createTransaction({
        shares: this.state.shares * sign,
        symbol: this.props.stock.symbol
      }).then(() => this.setState({ shares: '' }));
    }
  }

  handleTab(e, name) {
    e.preventDefault();
    this.props.clearErrors();
    this.setState({ shares: '', tab: name });
  }

  render () {
    const { stock, currentUser, errors } = this.props;
    const shares = this.state.shares;
    const sharesNum = shares === '' ? 0 : parseInt(shares);
    const submitText = this.state.tab === 'buy' ? 'Submit Buy' : 'Submit Sell';
    return (
      <div>
        <h3>
          <a
            className={this.state.tab === 'buy' ? 'active' : ''}
            onClick={(e) => this.handleTab(e, 'buy')}>

            Buy {stock.symbol}
          </a>
          <a
            className={this.state.tab === 'sell' ? 'active' : ''}
            onClick={(e) => this.handleTab(e, 'sell')}>

            Sell {stock.symbol}
          </a>
        </h3>
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
            <div>Estimated {this.state.tab === 'buy' ? 'Cost' : 'Credit'}</div>
            <div>{formatMoney(stock.priceCents / 100 * sharesNum)}</div>
          </div>
          { errors.map(error =>
            <div className="error" key={error}>
              <ErrorSVG />
              <div>{error}</div>
            </div>
          ) }
          <input type="submit" value={submitText} />
        </form>
        <section className="user-info">
          {
            this.state.tab === 'buy' ? (
              <div>
                {formatMoney(currentUser.balanceCents / 100)}&nbsp;
                Buying Power Available
              </div>
            ) : (
              <div>
                {currentUser.sharesOf[stock.symbol]} Shares Available
              </div>
            )
          }
        </section>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.session.currentUser,
  errors: state.errors
});

const mapDispatchToProps = { createTransaction, clearErrors };

export default connect(mapStateToProps, mapDispatchToProps)(StockForm);
