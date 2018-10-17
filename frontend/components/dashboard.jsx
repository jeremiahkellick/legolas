import React from 'react';
import Graph from './graph';
import { connect } from 'react-redux';
import { fetchDayChart, fetchFiveYearsCharts } from '../actions/chart';
import News from './news/news';
import OwnedStocks from './stock/owned_stocks';
import WatchedStocks from './stock/watched_stocks';

class Dashboard extends React.Component {
  componentDidMount() {
    this.props.fetchDayChart();
    this.props.fetchFiveYearsCharts();
  }

  render () {
    const charts = this.props.charts;
    let graph = <div className="graph-placeholder" />;
    if (charts['1D'] !== undefined && charts['1D'].points.length > 0) {
      graph = <Graph data={this.props.charts} />;
    }
    return (
      <div className="container">
        <div className="main">
          <h1>Welcome to Legolas</h1>
          {graph}
          <section>
            <h2>Recent News</h2>
            <News symbol="market" />
          </section>
        </div>
        <div className="sidebar-container">
          <div className="sidebar">
            <div className="sidebar-card">
              <h3><div>Stocks</div></h3>
              <OwnedStocks />
              <h3><div>Watchlist</div></h3>
              <WatchedStocks />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({ charts: state.session.currentUser.charts });

const mapDispatchToProps = { fetchDayChart, fetchFiveYearsCharts };

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
