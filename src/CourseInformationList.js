import React, { Component } from 'react';
import CourseInformation from './CourseInformation';
import Axios from 'axios';

const defaultState = {
  studentName: null,
  requestStatus: 'not_started',
  courses: []
}

const courseListState = (state = defaultState, action = {}) => {
  console.log(action);
  switch (action.type) {
    case 'START_REQUEST':
      return Object.assign({}, state, { requestStatus: 'ongoing' });
    case 'POPULATE_COURSES':
      return Object.assign({}, state, 
        { studentName: action.first_name + ' ' + action.last_name,
          courses: action.courses });
    default:
      return state
  }
}

class CourseInformationList extends Component {
  state = courseListState();

  dispatch = (action) => {
    this.setState(prevState => courseListState(prevState, action));
  }
  
  render() {
    var courses = this.state.courses.map((course, index) => {
      return (
        <CourseInformation 
          data={course}
          key={index} />
      );
    })

    return (
      <div>
        { courses }
      </div>
    )
  }

  componentWillReceiveProps(newProps) {
    const studentId = newProps.studentId;
    if (newProps !== this.props && studentId !== null) {
      this.dispatch({ type: 'START_REQUEST' });
      Axios.get('http://localhost:3002/api/students/' + studentId).then(response => {
        console.log(response);
        const first_name = response.data.first_name;
        const last_name = response.data.last_name;
        const courses = response.data.courses;
        this.dispatch({type: 'POPULATE_COURSES', first_name, last_name, courses });
      }).catch(err => {
        console.error(err);
      });
    }
  }
}

export default CourseInformationList;
