import * as ReactDOM from "react-dom";
import * as React from "react";
//import { browserHistory } from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from "./store/configureStore";
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import Popper from 'popper.js';
import '@babel/polyfill';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import App from './components/App';

const store = configureStore(window.__STATE__);
const render = () =>
    ReactDOM.hydrate(
        <Provider store={store}>
            <Router /*history={browserHistory}*/>
                <App />
            </Router>
        </Provider>,
        document.getElementById("root"));

render();