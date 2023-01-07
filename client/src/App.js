import logo from './logo.svg';
import React from 'react';
import './App.css';

function App() {
  return (
      <div className="App">
        <header className="App-header">
          <video controls muted>
            <source src="http://localhost:4000/video" type="video/mp4"></source>
          </video>
        </header>
      </div>
  );
}

export default App;
