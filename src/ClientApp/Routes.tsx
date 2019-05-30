import * as React from 'react';
import {Route} from 'react-router-dom';
import Home from './components/Routes/Home';
import News from './components/Routes/News';
import ViewNewsInfo from './components/Routes/ViewNewsInfo';
import BlogsListAll from './components/Routes/BlogsListAll';
import Registration from './components/Routes/Registration';
import { 
  pageHome, 
  newsRoute, 
  viewsNewsRoute, 
  blogsListAllRoute, 
  registrationRoute
  } from './settings';
import ErrorHandlingView from './components/View/Common/ErrorHandling';
import pageNotFoundLogic from './components/Logic/Common/PageNotFound';

const NotFound = pageNotFoundLogic(ErrorHandlingView);

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
/*getComponentRoute(Lister, '/lister', [listerFetchData()]),*/

const routes = [
        getComponentRoute(Home, pageHome), //or call directly the function.. atention to not use {} in this case
        getComponentRoute(Registration, registrationRoute), 
        getComponentRoute(News, newsRoute), 
        getComponentRoute(ViewNewsInfo, viewsNewsRoute + '/:ID'), 
        getComponentRoute(BlogsListAll, blogsListAllRoute),    
        getComponentRoute(NotFound, '*')
      ];

export default routes;
