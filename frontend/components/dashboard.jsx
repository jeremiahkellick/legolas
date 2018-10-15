import React from 'react';
import Graph from './graph';
import { connect } from 'react-redux';
import { fetchCharts } from '../actions/session';

class Dashboard extends React.Component {
  componentDidMount() {
    this.props.fetchCharts();
  }

  render () {
    if (this.props.charts["1D"] === undefined) return '';
    return (
      <div>
        <h1>Welcome to Legolas</h1>
        <Graph data={this.props.charts} />
      </div>
    );
  }
}

const mapStateToProps = state => ({ charts: state.session.currentUser.charts });

export default connect(mapStateToProps, { fetchCharts })(Dashboard);
