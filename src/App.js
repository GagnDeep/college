import React from 'react';
import './App.css';
import Result from './containers/result/result'
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk'

import resultList_reducer from './store/reducers/resultList';

const rootReducer = combineReducers({
    list: resultList_reducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));


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
