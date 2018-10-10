import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store';
import Root from './components/root';

document.addEventListener('DOMContentLoaded', () => {
  const preloadedState = {};
  if (window.currentUser) {
    preloadedState.session = { currentUser: window.currentUser };
  }
  const store = configureStore(preloadedState);

  // TODO: Remove from window
  window.getState = store.getState;
  window.dispatch = store.dispatch;

  ReactDOM.render(<Root store={store} />, document.getElementById('root'));
});
