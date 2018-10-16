import React from 'react';

const Article = ({ article }) => (
  <li>
    <a href={article.url} target="_blank">
      <div className="image">
        <div style={{ backgroundImage: `url("${article.urlToImage}")` }} />
      </div>
      <div className="info">
        <h4>{article.title}</h4>
        <p>{article.description}</p>
      </div>
    </a>
  </li>
);

export default Article;
