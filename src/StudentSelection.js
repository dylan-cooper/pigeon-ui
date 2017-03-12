import React, { Component } from 'react';
import './StudentSelection.css';
import Axios from 'axios';

import {
  FormField,
  FormFieldInput,
} from 'react-foundation-components/lib/forms';

const defaultState = {
  students: [],
  requestStatus: 'not_started',
}

const selectionState = (state = defaultState, action = {}) => {
  switch (action.type) {
    case 'START_REQUEST':
      return Object.assign({}, state, { requestStatus: 'ongoing' });
    case 'POPULATE_STUDENTS':
      return Object.assign({}, state, { requestStatus: 'finished', students: action.students });
    default:
      return state;
  }
}

class StudentSelection extends Component {
  state = selectionState()

  dispatch = (action) => {
    this.setState(prevState => selectionState(prevState, action));
  }

  selectStudent = (event) => {
    const studentId = event.target.value;
    this.dispatch({type: 'STUDENT_SELECTED'});
    this.props.onStudentSelected(studentId);
  }

  render() {

    const options = this.state.students.map((student) => (
      <option key={"student-" + student.id}
              value={ student.id }>
        { student.last_name + ", " + student.first_name }
      </option>
    ));

    return(
      <div className="StudentSelection">
        <FormField>
          <FormFieldInput type="select"
                          disabled={this.state.requestStatus !== 'finished' }
                          onChange={this.selectStudent }>
            <option value="" disabled selected>Choose a student</option>
            { options }
          </FormFieldInput>

        </FormField>
      </div>
    );
  }

  componentDidMount() {
    this.dispatch({type: 'START_REQUEST'});
    Axios.get('http://localhost:3002/api/students').then(response => {
      console.log(response);
      this.dispatch({type: 'POPULATE_STUDENTS', students: response.data });
    }).catch(err => {
      console.error(err);
    });
  }
}

export default StudentSelection;

