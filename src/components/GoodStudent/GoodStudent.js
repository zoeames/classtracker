import React from 'react';

import './GoodStudent.css';

class GoodStudent extends React.Component {
  render() {
    const {student} = this.props;
    const treehouseImage = require(`./img/treehouse.png`);
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
                <a className="github-link" href={student.github} target="_blank">
                  <i className="fab fa-github fa-2x"></i>
                </a>
              </div>
              <div className="col-xs-4">
                <a className="website-link" href={student.biosite} target="_blank">
                  <i className="fas fa-address-book fa-2x"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default GoodStudent;
