import React from 'react';
// import logo from './logo.svg';
// import Button from './button1';
// import Box from './box1';
// import Button2 from './button2';
// import Box2 from './box2';
import Button3 from './button3';
import Box3 from './box3';
import Box4 from './box4'
// import './App.css';

function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        </header> */}
        <Button3 size="big" />
        <Button3 size="samll" />
        <Box4 size="big" />
        <Box4 size="small" />      
    </div>
  );
}

export default App;
