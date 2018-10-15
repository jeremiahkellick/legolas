import React from 'react';
import Graph from './graph';
import { connect } from 'react-redux';
import { fetchCharts } from '../actions/session';

class Dashboard extends React.Component {
  componentDidMount() {
    this.props.fetchCharts();
  }

  render () {
    const charts = this.props.charts;
    let graph = '';
    if (charts['1D'] !== undefined && charts['1D'].points.length > 0) {
      graph = <Graph data={this.props.charts} />;
    }
    return (
      <div>
        <h1>Welcome to Legolas</h1>
        {graph}
      </div>
    );
  }
}

const mapStateToProps = state => ({ charts: state.session.currentUser.charts });

export default connect(mapStateToProps, { fetchCharts })(Dashboard);
