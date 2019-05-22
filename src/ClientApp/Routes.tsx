import * as React from 'react';
import {Route} from 'react-router-dom';
import Home from './components/Home';
import News from './components/News';
import ViewNewsInfo from './components/ViewNewsInfo';
import App from './components/App';
import { pageHome, newsRoute, viewsNewsRoute } from './settings';
//@ts-ignore
const Status = ({ code, children }) => (
    <Route render={({ staticContext }) => {
      if (staticContext)
        //@ts-ignore
        staticContext.status = code
      return children
    }}/>
  )

  const NotFound = () => (
    <Status code={404}>
      <div>
        <h1>Sorry, can’t find that.</h1>
      </div>
    </Status>
  )

//adds the loadData function with the desired data fetch action for server side rendering
//how to use: getComponentRoute(Component Name, Route string like '/something', action array or [action1(), action2(), action3()])
const getComponentRoute = (component:any, path:string, actions:any[] = []) => {
    //for server side rendering

    function loadData(store:any){
      let promises:any[] = [];
      actions.forEach(action => {
          promises.push(store.dispatch(action));
      });
      return Promise.all(promises);
    }

    if(actions.length > 0)
    {
      return  {
        component: component, 
        loadData,//loadData promise to be executed server side
        path: path,
        exact: true};
    }
    return {
        component: component, 
        path: path,
        exact: true};
};

//generates the routes for home and lister with the needed datafetch for server side rendering
//const homeRoute = getComponentRoute(Home, '/', [listerFetchData()]);
//const listerRoute = getComponentRoute(Lister, '/lister', [listerFetchData()]);

const Routes = [
  {
    component: App,
    routes: [
        getComponentRoute(Home, pageHome), //or call directly the function.. atention to not use {} in this case
        getComponentRoute(News, newsRoute), 
        getComponentRoute(ViewNewsInfo, viewsNewsRoute + '/:ID'), 
        /*getComponentRoute(Lister, '/lister', [listerFetchData()]),
        getComponentRoute(TSTest, '/tstest'),*/
        { path: '*',
        component: NotFound
        }
      ]
  }
];

export default Routes;
