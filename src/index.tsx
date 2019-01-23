import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { App } from './components/App';
import { Provider } from 'react-redux';
import {createStore} from 'redux'; 
import allReducers from './reducers';
// import { Router } from 'react-router';
import { BrowserRouter as Router, Route,Link, withRouter } from 'react-router-dom';
import AddComponent from './components/AddComponent';
import updateComponent from './components/updateComponent';
// ReactDOM.render(<Hello compiler="Typescript" framework="React" bundler="Webpack" />,

const store = createStore(allReducers);
// console.log("initial state: ", store.getState());
ReactDOM.render(
    <Provider store={store}>
        <Router>
            <div>
            <Route exact path='/' component={App}></Route>
            <Route path='/addEvent' component={AddComponent}></Route>
            <Route path='/editEvent/:id/' component={updateComponent}></Route>
            </div>
        </Router>
    </Provider>,
document.getElementById('root'));