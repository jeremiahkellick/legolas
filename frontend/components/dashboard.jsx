import React from 'react';
import Graph from './graph';
import { connect } from 'react-redux';
import { fetchCharts } from '../actions/session';
import News from './news/news';

class Dashboard extends React.Component {
  componentDidMount() {
    this.props.fetchCharts();
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
            <h3><div>Stocks</div></h3>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({ charts: state.session.currentUser.charts });

export default connect(mapStateToProps, { fetchCharts })(Dashboard);
