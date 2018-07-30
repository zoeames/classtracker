import React from 'react';
import moment from 'moment';

import githubRequests from '../../firebaseRequests/github';

import './GoodStudent.css';

class GoodStudent extends React.Component {
  state = {
    pullRequests: [],
    pushEvents: [],
    todaysCommits: 0,
    yesterdaysCommits: 0,
  }

  componentDidMount() {
    githubRequests
      .getRecentActivityRequest(this.props.student.githubUsername)
      .then(githubRes => {
        const pullRequests = [];
        const pushEvents = [];
        let todaysCommits = 0;
        let yesterdaysCommits = 0;
        githubRes.forEach((event) => {
          if (event.type === 'PullRequestEvent' && event.payload.action === 'closed') {
            pullRequests.push(event);
          } else if (event.type === 'PushEvent') {
            pushEvents.push(event);
            if (moment(event.created_at).isSame(moment(), 'day')) {
              todaysCommits += event.payload.commits.length;
            } else  if (moment(event.created_at).isSame(moment().subtract(1, 'days'), 'day')) {
              yesterdaysCommits += event.payload.commits.length;
            }
          }
        });
        this.setState({pullRequests, pushEvents, todaysCommits, yesterdaysCommits});
      })
      .catch(err => {
        console.error('error with get commits request', err);
      });
  }

  render() {
    const {student} = this.props;
    const {pullRequests, todaysCommits, yesterdaysCommits} = this.state;
    const treehouseImage = require(`./img/treehouse.png`);
    const githubLink = `https://github.com/${student.githubUsername}`;
    const lastPr = () => {
      if (pullRequests[0]) {
        return (<h3>Last Merged PR: <a target="_blank" href={pullRequests[0].payload.pull_request.html_url}>{moment(pullRequests[0].created_at).format('lll')}</a></h3>);
      } else {
        return ('');
      }
    };
    return (
      <div className="GoodStudent col-xs-4">
        <div className="panel panel-primary">
          <div className="panel-heading">{student.firstName} {student.lastName}</div>
          <div className="panel-body text-center">
            <div className="col-xs-12">
              <div className="col-xs-4">
                <a className="treehouse-link" href={student.treehouse} target="_blank">
                  <img className="treehouse-img" src={treehouseImage} alt="treehouse logo"/>
                </a>
              </div>
              <div className="col-xs-4">
                <a className="github-link" href={githubLink} target="_blank">
                  <i className="fab fa-github fa-2x"></i>
                </a>
              </div>
              <div className="col-xs-4">
                <a className="website-link" href={student.biosite} target="_blank">
                  <i className="fas fa-address-book fa-2x"></i>
                </a>
              </div>
            </div>
            <div>
              <h3>Today's Commits: {todaysCommits}</h3>
              <h3>Yesterday's Commits: {yesterdaysCommits}</h3>
              {lastPr()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default GoodStudent;
