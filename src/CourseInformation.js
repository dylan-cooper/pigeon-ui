import React, { Component } from 'react';
import Moment from 'moment';
import './CourseInformation.css';
import Button from 'react-foundation-components/lib/button';
import Callout from 'react-foundation-components/lib/callout';
import { Row, Column } from 'react-foundation-components/lib/grid';
import { Line } from 'react-chartjs-2';

const defaultState = {
  filter: 'ALL',
}

const courseState = (state = defaultState, action = {}) => {
  var newState = state;
  switch (action.type) {
    case 'SET_FILTER':
      newState = Object.assign({}, state, { filter: action.filter });
      break;
    default:
      newState = state;
  }
  return newState;
}

class CourseInformation extends Component {
  state = courseState(undefined, {})

  dispatch = (action) => {
    this.setState(prevState => courseState(prevState, action))
  }

  setFilterAll = () => {
    this.dispatch({
      type: 'SET_FILTER',
      filter: 'ALL'
    });
  }

  setFilterQuizzes = () => {
    this.dispatch({
      type: 'SET_FILTER',
      filter: 'QUIZ'
    });
  }

  setFilterAssignments = () => {
    this.dispatch({
      type: 'SET_FILTER',
      filter: 'ASSIGNMENT'
    });
  }

  setFilterExams = () => {
    this.dispatch({
      type: 'SET_FILTER',
      filter: 'EXAM'
    });
  }

  render() {

    console.log(this.state);
    const filteredGrades = this.props.data.grades.filter(grade => 
      this.state.filter === 'ALL' || this.state.filter === grade.type
    );

    const gradesDataPoints = filteredGrades.map(grade => {
      return {
        x: Moment(grade.date_due).toDate(),
        y: grade.grade
      };
    });

    const courseMedianDataPoints = filteredGrades.map(grade => {
      return {
        x: Moment(grade.date_due).toDate(),
        y: grade.course_median
      };
    });


    const chartData = {
      datasets: [{
        label: 'Grades',
        data: gradesDataPoints,
        backgroundColor: ['rgba(255, 99, 132, 0.2)'],
        borderColor: ['rgba(255,99,132,1)'],
        borderWidth: 1
      },{
        label: 'Course Median',
        data: courseMedianDataPoints,
        backgroundColor: ['rgba(132, 99, 255, 0.2)'],
        borderColor: ['rgba(132,99,255,1)'],
        borderWidth: 1
      }]
    };

    const chartOptions = {
      responsive: true,
      scales: {
        xAxes: [{
          type: "time",
          display: true,
        }],
        yAxes: [{
          ticks: {
            min: 0,
            max: 100
          }
        }]
      }
    };

    const hasAssignments = this.props.data.grades.find(grade => grade.type === 'ASSIGNMENT');
    const hasQuizzes = this.props.data.grades.find(grade => grade.type === 'QUIZ');
    const hasExams = this.props.data.grades.find(grade => grade.type === 'EXAM');

    const buttons = (
      <div className="ButtonList">
        <Button onClick={this.setFilterAll}
                hollow={this.state.filter === 'ALL' ? 'hollow' : ''}>
          All
        </Button>

        <Button onClick={this.setFilterAssignments}
                hollow={this.state.filter === 'ASSIGNMENT' ? 'hollow' : ''}
                disabled={hasAssignments ? '' : 'disabled'}>
          Assignments
        </Button>


        <Button onClick={this.setFilterQuizzes}
                hollow={this.state.filter === 'QUIZ' ? 'hollow' : ''}
                disabled={hasQuizzes ? '' : 'disabled'}>
          Quizzes
        </Button>

        <Button onClick={this.setFilterExams}
                hollow={this.state.filter === 'EXAM' ? 'hollow' : ''}
                disabled={hasExams ? '' : 'disabled'}>
          Exams
        </Button>
      </div>
    );


    var message;

    if (this.props.data.overall_grade > 60) {
      message = (
        <Callout color="success">
          <p>Keep up the good work!</p>
        </Callout>
      );
    } else {
      message = (
        <Callout color="warning">
          <p>For information on study groups, look <a href="#">here</a></p>
        </Callout>
      );
    }

    return (
      <div className="CourseInformation">
      <Callout color="secondary" >
        <h3>{this.props.data.name + ' (' + this.props.data.course_code + ')'}</h3>

        { buttons }

        <div>
          <Line data={chartData}
                options={chartOptions} 
                height={100}></Line>
        </div>

        <Callout>
          <Row expanded>
            <Column small={5}>Overall Grade</Column>
            <Column small={5}>{this.props.data.overall_grade}</Column>
          </Row>
        </Callout>

        { message }
      </Callout>
      </div>
    )
  }

  componentWillReceiveProps(newProps) {
    if (newProps !== this.props) {
      this.dispatch({type: 'SET_FILTER', filter: 'ALL'});
    }
  }
}

export default CourseInformation
