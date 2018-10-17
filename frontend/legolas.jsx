import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store';
import Root from './components/root';

function getCookie(name) {
  const cookies = document.cookie.split('; ');
  for (let i = 0; i < cookies.length; i++) {
    let [key, value] = cookies[i].split('=');
    if (key === name) return value;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const preloadedState = {};
  if (window.currentUser) {
    preloadedState.session = { currentUser: window.currentUser };
    preloadedState.session.currentUser.charts = {};
  }
  const store = configureStore(preloadedState);

  // TODO: Remove from window
  window.getState = store.getState;
  window.dispatch = store.dispatch;

  if (getCookie('theme') === 'dark') {
    document.body.classList.add('dark');
  }

  ReactDOM.render(<Root store={store} />, document.getElementById('root'));
});
