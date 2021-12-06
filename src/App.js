import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    const name = 'Joh Doe';
    const loading = true;
    const showName = true;

    return (
      <div className='app'>
        {!loading ? <h4>Loading...</h4> : <h1>Hello {showName && name}</h1>}
      </div>
    );
  }
}

export default App;
