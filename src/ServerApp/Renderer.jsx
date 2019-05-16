import React from 'react';
import {renderToString} from 'react-dom/server';
import {StaticRouter as Router} from 'react-router-dom';
import {renderRoutes} from 'react-router-config';
import Routes from '../ClientApp/Routes';
import { Provider } from 'react-redux';
import serialize from 'serialize-javascript';
//takes the incoming request route and renders the static page
//context contains the status that later is used for return a 404 or the html for the client
export default (req, store, context) => {
    // This context object contains the results of the render
    const content = renderToString(
        <Provider store = {store}>
            <Router location={req.path} context={context}>
                {renderRoutes(Routes)}
            </Router>
        </Provider>
    );

    return {
        htmlcode: `
        <!DOCTYPE html>
            <html>
                <head>
                    <title>MyTest</title>
                    <link rel="stylesheet" href="/layout/site.css" type="text/css">
                    <meta http-equiv="Content-Type" content="text/html">
                </head>
                <body>
                    <div id="root">${content}</div>
                    <script>
                    window.__STATE__=${serialize(store.getState())}
                    </script>
                    <script src="/javascript/bundle.js" type="text/javascript"></script> 
                </body>
            </html>`,

            routestatus: context.status
    }
};