import React from 'react';
import { hot } from 'react-hot-loader';

class App_two extends React.Component {
  render(): JSX.Element {
    return (
      <div className='container'>
        <h2>Welcome in the second window</h2>
        <div className='container'>
        </div>
      </div>
    );
  }
}

export default hot(module)(App_two);
