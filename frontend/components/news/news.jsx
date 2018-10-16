import React from 'react';
import { connect } from 'react-redux';
import { fetchNews, fetchMarketNews } from '../../actions/news';
import Article from './article';

class News extends React.Component {
  constructor(props) {
    super(props);
    this.fetchNews = this.fetchNews.bind(this);
  }

  componentDidMount() {
    this.fetchNews();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.symbol !== this.props.symbol) {
      this.fetchNews();
    }
  }

  fetchNews() {
    if (this.props.symbol === 'market') {
      this.props.fetchMarketNews();
    } else {
      this.props.fetchNews(this.props.symbol);
    }
  }

  render () {
    if (this.props.news === undefined) return '';
    return (
      <div>
        <ul className="news">
          { this.props.news.map(article =>
            <Article key={article.url} article={article} />
          ) }
        </ul>
        <p className="credit">
          <a href="https://newsapi.org">Powered by News API</a>
        </p>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  news: state.news[ownProps.symbol]
});

export default connect(mapStateToProps, { fetchNews, fetchMarketNews })(News);
