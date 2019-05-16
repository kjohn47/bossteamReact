const express = require('express');
const app = express();

app.use(express.static('public', {
    index: false
}));

import Routes from "../ClientApp/Routes";
import configureStore from '../ClientApp/store/configureStore';
import {renderRoutes,matchRoutes} from "react-router-config";


//add this to handle server requests and incoming url
import Renderer from './Renderer';
app.get('*', (req, res) => {

    const store = configureStore();
    const myRoutes = matchRoutes(Routes, req.path);
    //console.log(req.path);
    //verifies if there is loadData method before rendering the
    //components
    const promises = myRoutes.map(({route, match}) => { 
        //console.log(route);
        return route.loadData
            ? route.loadData(store)
            : Promise.resolve(null)
    });

    Promise.all(promises).then(() => {
        const context = {};
        const rendererInstance = Renderer(req, store, context);
        //console.log(rendererInstance.routestatus)

        if (rendererInstance.routestatus == 404) {
            res.status(404).end(Renderer(req, store, context).htmlcode);
        }
        else
            res.send(Renderer(req, store, context).htmlcode);
    });
});

app.listen(3040, function () {
    console.log('Listening on port 3040');
});