import React from 'react';
import logo from './logo.svg';
import './App.css';
import TodoList from './TodoList';
import './test.css'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <TodoList />
      </header>
    </div>
  );
}

export default App;

console.log(`REACT_APP_DATA_API= ${process.env.REACT_APP_DATA_API}`);
console.log(`REACT_APP_LOGIN_API= ${process.env.REACT_APP_LOGIN_API}`);