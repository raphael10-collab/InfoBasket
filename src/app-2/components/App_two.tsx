import React from 'react';
import { hot } from 'react-hot-loader';

declare global {
  interface Window {
    api: any,
  }
}

let fileReceived = window.api.receive("open-second-window")

class App_two extends React.Component {
  render(): JSX.Element {
    return (
      <div className='container'>
        <h2>Welcome in the second window</h2>
        <div className='container'>
          <img src="fileReceived" />
        </div>
      </div>
    );
  }
}

export default hot(module)(App_two);
