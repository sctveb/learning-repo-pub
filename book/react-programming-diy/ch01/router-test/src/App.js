import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import Rooms from './rooms'

// class App extends Component {
//   componentDidMount() {
//     window.onpopstate = function(event) {
//       console.log(`location: ${document.location}, state: ${event.state}`)
//     }
//   }
//   render(){
//     return (
//       <div>
//         <button onClick={()=> {window.history.pushState('v1', '', '/page1')}}>page1</button>
//         <button onClick={()=> {window.history.pushState('v2', '', '/page2')}}>page2</button>
//       </div>
      
//     )
//   }
// }

// class App extends Component {
//   state = {
//     pageName: '',
//   }
//   componentDidMount(){
//     window.onpopstate = event => {
//       this.onChangePage(event.state)
//     }
//   }
//   onChangePage = pageName => {
//     this.setState({ pageName });
//   }
//   onClick1 = () => {
//     const pageName = 'page1';
//     window.history.pushState(pageName, '', '/page1');
//     this.onChangePage(pageName);
//   }
//   onClick2 = () => {
//     const pageName = 'page2';
//     window.history.pushState(pageName, '', '/page2');
//     this.onChangePage(pageName);
//   }
//   render(){
//     const { pageName } = this.state;
//     return (
//       <div>
//         <button onClick={this.onClick1}>page1</button>
//         <button onClick={this.onClick2}>page2</button>
//         {!pageName && <Home />}
//         {pageName === 'page1' && <Page1 />}
//         {pageName === 'page2' && <Page2 />}
//       </div>
      
//     )
//   }
// }

// function Home() {
//   return <h2>Home</h2>
// }

// function Page1() {
//   return <h2>Page1</h2>
// }

// function Page2() {
//   return <h2>Page2</h2>
// }

class App extends Component {
  render() {
    return (
      <BrowserRouter>
      <div style={{ padding: 20, border: '5px solid gray'}}>
        <Link to="/">홈</Link> <br/>
        <Link to="/photo">사진</Link> <br/>
        <Link to="/rooms">방 소개</Link> <br/>
        <Route exact path="/" component={Home}/>
        <Route path="/photo" component={Photo}/>
        <Route path="/rooms" component={Rooms}/>
      </div>
      </BrowserRouter>
    )
  }
}

function Home({match}) {
  return <h2>홈페이지</h2>
}

function Photo({match}) {
  return <h2>사진</h2>
}
export default App;