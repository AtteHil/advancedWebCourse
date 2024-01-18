
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import About from "./components/About";
import MyContainer from "./components/MyContainer";
import Header from './components/Header';
import * as React from 'react';
import './i18n';

function App() {
  return (
    <Router>
      <div className="App">
        
        <Routes>
          <Route path="/about" element={<><Header /><About /></>}> </Route>
          <Route path="/" element= {<><Header /><MyContainer /></>}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
