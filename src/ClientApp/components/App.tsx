import * as React from "react";
import Layout from './Layout';
import {renderRoutes} from 'react-router-config';

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

export default App;
