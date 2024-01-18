import logo from './logo.svg';
import './App.css';
import React, {Component} from 'react';
import MyContainer from './components/MyContainer';
class App extends Component{
  render() {
    return (<div className="App">
      <h1>Hello World!</h1>
      <MyContainer />
    </div>);
  }
}


export default App;
