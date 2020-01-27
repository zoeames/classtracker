import React from 'react';
import moment from 'moment';

import githubRequests from '../../../helpers/data/githubRequests';

import './GoodStudent.scss';

class GoodStudent extends React.Component {
  state = {
    pullRequests: [],
    pushEvents: [],
    todaysCommits: 0,
    yesterdaysCommits: 0,
  }

  componentDidMount() {
    const username = this.props.student.githubUsername;
    const pullRequests = [];
    const pushEvents = [];
    let todaysCommits = 0;
    let yesterdaysCommits = 0;
    if (username.length > 0) {
      githubRequests
        .getRecentActivityRequest(username)
        .then((githubRes) => {
          githubRes.forEach((event) => {
            if (event.type === 'PullRequestEvent' && event.payload.action === 'closed') {
              pullRequests.push(event);
            } else if (event.type === 'PushEvent') {
              pushEvents.push(event);
              if (moment(event.created_at).isSame(moment(), 'day')) {
                todaysCommits += event.payload.commits.length;
              } else if (moment(event.created_at).isSame(moment().subtract(1, 'days'), 'day')) {
                yesterdaysCommits += event.payload.commits.length;
              }
            }
          });
          this.setState({
            pullRequests,
            pushEvents,
            todaysCommits,
            yesterdaysCommits,
          });
        })
        .catch(err => console.error('error with get commits request', err));
    } else {
      this.setState({
        pullRequests: [],
        pushEvents: [],
        todaysCommits: 0,
        yesterdaysCommits: 0,
      });
    }
  }

  render() {
    const { student } = this.props;
    const { pullRequests, todaysCommits, yesterdaysCommits } = this.state;
    const githubLink = `https://github.com/${student.githubUsername}`;
    const lastPr = () => {
      if (pullRequests[0]) {
        return (<h3>Last Merged PR: <a target="_blank" rel="noopener noreferrer" href={pullRequests[0].payload.pull_request.html_url}>{moment(pullRequests[0].created_at).format('lll')}</a></h3>);
      }
      return '';
    };
    return (
      <div className="GoodStudent col-md-4">
        <div className="card border border-primary">
          <div className="card-header bg-primary">
            {student.firstName} {student.lastName}
          </div>
          <div className="card-body">
            <div className="row justify-content-md-center">
              <div className="col-md-auto">
                <a className="github-link" href={githubLink} target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-github fa-2x"></i>
                </a>
              </div>
            </div>
          </div>
          <div>
            <h3>Today's Commits: {todaysCommits}</h3>
            <h3>Yesterday's Commits: {yesterdaysCommits}</h3>
            {lastPr()}
          </div>
        </div>
      </div>
    );
  }
}

export default GoodStudent;
