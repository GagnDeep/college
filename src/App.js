import React from 'react';
import './App.css';
import Result from './containers/result/result'
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {createStore} from 'redux';

import reducer from './store/reducer/reducer';

const store = createStore(reducer)


function App() {

  return (
    <Provider store = {store}>
    
      <BrowserRouter>
        <Result/>
      </BrowserRouter>
      
    </Provider>
  )
}

export default App;
