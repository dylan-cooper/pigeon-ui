import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import './foundation.css';
import CourseInformationList from './CourseInformationList';
import StudentSelection from './StudentSelection';

const defaultState = {
  selectedStudentId: null
}

const appState = (state = defaultState, action = {}) => {
  console.log(action);
  switch (action.type) {
    case 'SELECT_STUDENT':
      return Object.assign({}, state, { selectedStudentId: action.selectedStudentId });
    default:
      return state;
  }
}

class App extends Component {
  state = appState()

  dispatch = (action) => {
    this.setState(prevState => appState(prevState, action));
  }

  studentSelected = (studentId) => {
    this.dispatch({
      type: 'SELECT_STUDENT',
      selectedStudentId: studentId,
    });
  }

  render() {

    return (
      <div className="App">
        <div className="App-header">
          <h1>CourseShrink</h1>
        </div>

        <StudentSelection onStudentSelected={this.studentSelected}/>
        <CourseInformationList studentId={this.state.selectedStudentId}/>
      </div>
    );
  }
}

export default App;
