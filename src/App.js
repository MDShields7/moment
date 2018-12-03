import React, { Component } from 'react';
import './App.css';
import withContext from './components/ContextApi/Context_HOC';
import Admin from './components/Admin/Admin';
import Navbar from './components/Navbar/Navbar';
import routes from './routes';

class App extends Component {
  render() {
    console.log('CONTEXT', this.props.context)
    return (
      <div className="App">
        <Navbar />
        {routes}
      </div>
    );
  }
}

export default withContext(App);
