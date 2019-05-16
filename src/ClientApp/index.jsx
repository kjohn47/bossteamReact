import * as ReactDOM from "react-dom";
import * as React from "react";
import { browserHistory } from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './Routes';
import {renderRoutes} from "react-router-config";
import { Provider } from 'react-redux';
import configureStore from "./store/configureStore";
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import {currentLanguage, setLanguage} from './settings';

const currLang = currentLanguage();
if (currLang === null || currLang === '' || currLang === undefined )
{
    setLanguage();
}

//import { AppContainer } from 'react-hot-loader'
const store = configureStore(window.__STATE__);
const render = () =>
    ReactDOM.hydrate(
        <Provider store={store}>
            <Router history={browserHistory}>
                {renderRoutes(Routes)}
            </Router>
        </Provider>,
        document.getElementById("root"));

render();
/*
// webpack Hot Module Replacement API
if (module.hot) {
    module.hot.accept('./components/App', () => {
      // if you are using harmony modules ({modules:false})
      render()
    })
  }*/