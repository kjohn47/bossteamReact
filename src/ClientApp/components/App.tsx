import * as React from "react";
import Layout from './Layout';
import {renderRoutes} from 'react-router-config';
import routes from '../Routes';

class App extends React.Component<{},{}> {
    render()
    {
        return (
            <Layout>
                {renderRoutes(routes)}
            </Layout>
        );
    }
}

export default App;
