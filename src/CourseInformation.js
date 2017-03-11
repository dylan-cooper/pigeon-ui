import React, { Component } from 'react';
import './CourseInformation.css';
import Button from 'react-foundation-components/lib/button';
import Callout from 'react-foundation-components/lib/callout';
import { Row, Column } from 'react-foundation-components/lib/grid';
import { Line } from 'react-chartjs';

const data = {
  labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
  datasets: [{
    label: '# of Votes',
    data: [12, 19, 3, 5, 2, 3],
    backgroundColor: [
      'rgba(255, 99, 132, 0.2)',
      'rgba(54, 162, 235, 0.2)',
      'rgba(255, 206, 86, 0.2)',
      'rgba(75, 192, 192, 0.2)',
      'rgba(153, 102, 255, 0.2)',
      'rgba(255, 159, 64, 0.2)'
    ],
    borderColor: [
      'rgba(255,99,132,1)',
      'rgba(54, 162, 235, 1)',
      'rgba(255, 206, 86, 1)',
      'rgba(75, 192, 192, 1)',
      'rgba(153, 102, 255, 1)',
      'rgba(255, 159, 64, 1)'
    ],
    borderWidth: 1
  }]
};

const options = {
  scales: {
    yAxes: [{
      ticks: {
        beginAtZero:true
      }
    }]
  }
};

class CourseInformation extends Component {
  render() {
    return (
      <div className="CourseInformation">
        <h3>CIS*1500</h3>
        <div className="ButtonList">
          <Button color="primary">Primary Color</Button>
          <Button color="secondary">Secondary Color</Button>
          <Button color="success">Success Color</Button>
          <Button color="alert">Alert Color</Button>
          <Button color="warning">Warning Color</Button>
          <Button>Chart 1</Button>
          <Button>Chart 2</Button>
        </div>

        <div>
          <Line data={data} options={options} width="600" height="250"></Line>
        </div>

        <Callout>
          <Row expanded>
            <Column small={2}>Course Median</Column>
            <Column small={10}>91</Column>
          </Row>
          <Row expanded>
            <Column small={2}>Course Median</Column>
            <Column small={10}>91</Column>
          </Row>
        </Callout>
      </div>
    )
  }
}

export default CourseInformation
