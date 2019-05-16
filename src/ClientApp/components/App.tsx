import * as React from "react";
//import Routes from '../Routes';
import Layout from './Layout';
import {renderRoutes} from 'react-router-config';
//import { hot } from 'react-hot-loader'

interface IApp {
    route:any;
}

class App extends React.Component<IApp,{}> {
    render()
    {
        const route = this.props.route;
        return (
                <Layout>
                    {renderRoutes(route.routes)}
                </Layout>
        );
    }
}

//export default hot(module)(App);
export default App;
