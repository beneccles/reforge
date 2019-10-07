import React from 'react';
import routes from './routes';
import Nav from './components/Nav/Nav'
import './App.css';

function App() {
  return (
    <div className="App">
      <Nav />
      <div className="mainBody">
      { routes }
      </div>
    </div>
  );
}

export default App;
