import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import './foundation.css';
import CourseInformation from './CourseInformation';


class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h1>Dylan Cooper</h1>
        </div>
        <CourseInformation />
      </div>
    );
  }
}

export default App;
