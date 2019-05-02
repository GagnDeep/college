import React from 'react';
import logo from './logo.svg';
import './App.css';
import data from './data/studentDataForES6';
import Result from './containers/result/result'
import {BrowserRouter} from 'react-router-dom'

function App() {

  return (
    <BrowserRouter>
    
    <Result/>
    
    </BrowserRouter>
  )
}

export default App;
