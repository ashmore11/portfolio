import './style.scss';

import React, { Component } from 'react';

class App extends Component {
  render() {
    const { children } = this.props;

    return <div className="App">{children}</div>;
  }
}

export default App;
