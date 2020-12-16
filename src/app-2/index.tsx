import React from 'react';
import ReactDOM from 'react-dom';
import App_two from './components/App_two';
import './styles/index.less';

ReactDOM.render(<App_two />, document.getElementById('app_two'));

/** Hot Module Replacement */
if (process.env.NODE_ENV == 'development' && module.hot) {
  module.hot.accept();
}
