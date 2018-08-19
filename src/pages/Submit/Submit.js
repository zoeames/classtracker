import React from 'react';

import './Submit.css';
class Submit extends React.Component {
  state = {
    tasks: [
      { name: 'Learn Angular', category: 'backlog', bgcolor: 'yellow' },
      { name: 'React', category: 'backlog', bgcolor: 'pink' },
      { name: 'Vue', category: 'done', bgcolor: 'skyblue' },
      { name: 'Vue2', category: 'inProgress', bgcolor: 'skyblue' },
      { name: 'Vue3', category: 'inProgress', bgcolor: 'skyblue' },
      { name: 'Vue4', category: 'done', bgcolor: 'skyblue' },
    ],
  };

  onDragStart = (ev, id) => {
    ev.dataTransfer.setData('id', id);
  };

  onDragOver = ev => {
    ev.preventDefault();
  };

  onDrop = (ev, cat) => {
    const id = ev.dataTransfer.getData('id');

    const tasks = this.state.tasks.filter(task => {
      if (task.name === id) {
        task.category = cat;
      }
      return task;
    });

    this.setState({
      ...this.state,
      tasks,
    });
  };

  render() {
    const tasks = {
      backlog: [],
      inProgress: [],
      done: [],
    };

    this.state.tasks.forEach(t => {
      tasks[t.category].push(
        <div
          key={t.name}
          onDragStart={e => this.onDragStart(e, t.name)}
          draggable
          className="draggable"
          style={{ backgroundColor: t.bgcolor }}
        >
          {t.name}
        </div>
      );
    });

    return (
      <div className="Submit">
        <h1>Submit Assignments</h1>
        <div className="row">
          <div className="col">
            <div
              className="backlog"
              onDragOver={e => this.onDragOver(e)}
              onDrop={e => {
                this.onDrop(e, 'backlog');
              }}
            >
              <span className="task-header">Backlog</span>
              {tasks.backlog}
            </div>
          </div>
          <div className="col">
            <div
              className="inProgress"
              onDragOver={e => this.onDragOver(e)}
              onDrop={e => this.onDrop(e, 'inProgress')}
            >
              <span className="task-header">inProgress</span>
              {tasks.inProgress}
            </div>
          </div>
          <div className="col">
            <div
              className="done"
              onDragOver={e => this.onDragOver(e)}
              onDrop={e => this.onDrop(e, 'done')}
            >
              <span className="task-header">Done</span>
              {tasks.done}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Submit;
