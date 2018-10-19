import React from 'react';
import Graph from './graph';
import { connect } from 'react-redux';
import {
  fetchDayChart,
  fetchFiveYearsCharts,
  fetchWeekChart
} from '../actions/chart';
import News from './news/news';
import OwnedStocks from './stock/owned_stocks';
import WatchedStocks from './stock/watched_stocks';
import HoldingsDiversity from './user/holdings_diversity';

class Dashboard extends React.Component {
  componentDidMount() {
    this.props.fetchDayChart();
    this.props.fetchFiveYearsCharts();
    this.props.fetchWeekChart();
  }

  render () {
    return (
      <div className="container">
        <div className="main dashboard">
          <Graph data={this.props.charts} />
          <section>
            <HoldingsDiversity />
          </section>
          <section>
            <h2>Recent News</h2>
            <News symbol="market" />
          </section>
        </div>
        <div className="sidebar-container">
          <div className="sidebar">
            <div className="sidebar-card">
              <OwnedStocks />
              <WatchedStocks />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({ charts: state.session.currentUser.charts });

const mapDispatchToProps = {
  fetchDayChart,
  fetchFiveYearsCharts,
  fetchWeekChart
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
