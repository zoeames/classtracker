import React from 'react';
import { Button } from 'reactstrap';
import './App.scss';

 class App extends React.Component {
  render() {
    return (
      <div className="App">
        <button className='btn btn-danger'>HELP ME</button>
        <Button
          tag="a"
          color="success"
          size="large"
          href="http://reactstrap.github.io"
          target="_blank"
        >View Reactstrap Docs</Button>
      </div>
    );
  }
}

 export default App;