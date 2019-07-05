# bossteamReact
---------------------------------------------------------------
Bossteam React FrontEnd
---------------------------------------------------------------
run "npm install" on root folder after clone
---------------------------------------------------------------

run scripts to run project in dev mode:
---------------------------------------------------------------
build "npm run build:dev:client"
---------------------------------------------------------------
build and execute "npm run start:dev"
---------------------------------------------------------------

For linux use linux configs (Webpack_Linux)
---------------------------------------------------------------
--- do not commit changes on the webpack config files
---------------------------------------------------------------
--- do not commit node_modules folder
---------------------------------------------------------------

How to change stuff:
---------------------------------------------------------------
1 --- Create Feature/branch or Bugfix/branch
---------------------------------------------------------------
2 --- When all changes are done, make pull request from 
your branch to Releases/release_x.x (last one)
---------------------------------------------------------------
Admin will merge to release if approved. 
---------------------------------------------------------------
If release is ok, merge will be made to master
---------------------------------------------------------------
  
Project structure:  
/-  
---- db.json -> mock database for dev  
---- jsonServer.js -> jsonServer for mock rest data origin  
---- build -> Server side rendering bundle  
---- public/ -> Client App output  
------- images/ -> Static images used on project  
------- javascript/ -> Client bundle  
------- layout/ -> css used in project  
------- index.html -> project home/main page  
---- src/ -> Sources  
------- ServerApp/ -> Server side rendering configuration (should not need changes)  
------- ClientApp/ -> React sources  
---------- index.jsx -> Start of render  
---------- settings.tsx -> Page Settings and keys for error, loading, language, translations  
---------- Routes.tsx -> Available routes and component redirect - use lazy here  
---------- common/ -> project common main methods  
------------- methods.tsx -> General methods  
------------- regex.tsx -> regex verification methods  
------------- session.tsx -> session related, browser memory read and write  
---------- interfaces/ -> interfaces used in project  
------------- ( ~.tsx ) -> interface object  
------------- common.tsx -> common interfaces, errors, translations and loadings must be added here  
------------- store.tsx -> redux store states must be added here  
---------- pageData/language/ -> language translation for menus and components  
------------- ( ~.tsx ) -> language translation file  
------------- index.tsx -> Add translation to be used in app here  
---------- components/ -> components used on the App  
------------- App.tsx -> Main component, renderd the layout and routes  
------------- Menu.tsx -> Renders the top menu based on certain logic and view  
------------- Layout.tsk -> Apply the main layout around components (Menu, side space, footer)  
------------- Routes/ -> Add Component with Hoc applied to view here to be used in Routes.tsx.  
------------------ ( ~.tsx ) -> Route component  
------------- Logic/ -> all component side logic is here, same logic can be used on more than one component view (HOC)  
---------------- Common/ -> main components logic  
------------------ ErrorHandling.tsx -> important Hoc that shows errors, loadings, checks session alive and force logout  
------------------ NeedLogin.tsx -> use this HOC envolving components that need authenticated users  
------------------ PageNotFound.tsx -> Sends 404 and shows error on screen for invalid routes  
------------------ LoginLogic.tsx -> Login and logout logic HOC for login form  
------------------ makeCard.tsx -> Maps data to card item array (not a HOC)  
------------------ Registration.tsx -> Registration form HOC  
------------------ Comment.tsx -> Generic Comment HOC used in various processes  
------------------ AddComment.tsx -> Generic Add Comment HOC used in various processes including user validation  
---------------- ( ~ )/ ( ~ ).tsx -> Specific component HOC  
------------- Views/ -> Views to be used on Hocs  
---------------- Common/( ~ ).tsx -> View for main app or shared in various processes  
---------------- Menu/( ~ ).tsx -> View used for the menu and footer  
---------------- ( ~ )/ ( ~ ).tsx -> Views Pure Component item  
---------- Store/ -> Redux store and data access  
------------- configureStore.tsx -> Creates the redux store from reducers and allow access to states  
------------- actionTypes/index.tsx -> Keys for the redux actions  
------------- reducers/ -> the reducers folder  
---------------- index.tsx -> combine reducers here (add new reducer to list)  
---------------- myAccount.tsx -> user login, session and related data  
---------------- appSettings.tsx -> loading, errors, translation of app menus  
---------------- ( ~ ).tsx -> app reducer  
------------- actions/ -> actions folder -> async server comunication and store manipulation  
---------------- appSettings/ -> App main actions and server comunication common  
------------------ index.tsx -> App language, load server data actions  
------------------ common.tsx -> methos to execute server comunication to activate load and format errors  
---------------- [ActionFolder]/ -> folder for process action  
------------------ [index.tsx] -> action file  
------------------ [Action]ServerCalls.tsx -> Server comunication methods for async calls  
  
    
--//-- Add text translation --//--//----//----//----//----//----//----//----//----//----//----//----//----//----//----  
  
1) add key to settings.tsx  
2) add interface for the text object  
3) add translation interface for languages using keys [ptCode] and [enCode] of the type of previous interface  
4) add key to interfaces/common.tsx IAppText of type of translation interface  
5) add translation file to pageData/language/ folder with object of type of translation interface  
6) add translation object to pageData/language/index.tsx identified by it's key  
---> [TEXT_KEY]: GetPropertyValue( TEXT_OBJECT, language )  
7) use your tranlation with redux store (reduxstate.appSettings.appText[TEXT_KEY]) on your HOC  
  
----//----//----//----//----//----//----//----//----//----//----//----//----//----//----//----//----//----//----//----     
  
  
    
--//-- Add server call ------//--//----//----//----//----//----//----//----//----//----//----//----//----//----//----    

Async server calls are made in the action and the result will go to the redux store.  
There are methods from actions/appSettings/common.tsx to be used for the async server calls for loading and error handling:  
-- Basic:  
  
----commonServerAction( dispatch, [ServerCallMethod], [SuccessAction], [ServerCallArg], [SuccessActionArg], *1 )  
  
*1 Localized loading instead of general loading  
-- true/false, [LOADING KEY] / '', *2  
*2 All other methods:  
-- [MethodThatWillRunBeforeSuccess] / null, [MethodThatWillRunAfterSuccess] / null, [MethodThatWillRunOnError] / null )  
  
If don't want to use localized loading with *2 methods, set flag to false and key to '';  
If don't want to add of the methods, set as null.  
  
The commonServerAction method is to be called on action file index.tsx using redux thunk,  
ActionFunction()  
{  
.....return (dispatch: Function => {  
.......commonServerAction();  
.....});  
}  
  
The server call Arguments can be single var or an object. They will be passed to the server Call Method as single available  
argument and will be available for *2 success methods as second argument.  
The success Arguments will be passed to success action as second argument and on *2 success methos as 3rd argument.  
The server response is of type IServerResponse and the result passed is the payload is of type IServerPayload.  
The IServerPayload interface must have the possible response from the server added, the server must always return  
json data in the format of IServerResponse.  

The action for the redux store is called on success call but aditional actions may be sent in case of *2 methods.  
The success action method template:  
  
function successAction( result: IServerPayload, successArguments: any ): IReduxActionInterface  
{  
....return {  
.......type: [ACTIONTYPE],  
.......payload: {  
...........(-- mapped result data --)  
.......}  
.....}  
}  

*2 success methods:  
function after_beforeSuccess( result: IServerPayload,  serverArgs: any, successArgs: any, dispatch: Function)  
  
*2 error method:  
function runOnError( dispatch: Function, error: IErrorHandling )  

IErrorHandling interface must be respected for error catching as it is the interface of the error information.  

The ServerCallMethod must be created on [action]ServerCalls.tsx and that method will call serverResolve()  
from actions/appSettings/common.tsx  

function ServerCallMethod( serverCallArgs: any ): Promise<any>  
{  
.....return await serverResolve( ( userSession: IUserSession ) => {  
..........return [AXIOS REST CALL].then( result => {  
................return result.data;  
..........});  
.....}, [ERROR_TYPE_KEY]);  
}  

userSession is always passed as argument on serverResolve so you can do operations using authenticated user  
more easily. serverCallArgs can be an object or single item, define the correnct interface.  
result.data is the data returned from server and must respect IServerResponse interface.  
On this project axios is used for the async ajax calls.  
The error key will define user friendly error for the process when out of dev ambient( defined in settings)  
If error is not defined, Generic error is applied.  

----//----//----//----//----//----//----//----//----//----//----//----//----//----//----//----//----//----//----    
  
    
--// Add Error for server call //-//----//----//----//----//----//----//----//----//----//----//----//----//----  
  
  Like translations, you have to create a key for the error in settings.tsx  
  1) Add key to settings.tsx [ERROR_KEY]  
  2) Add key to interfaces/common.tsx to interface IErrorHandlingErrors with type: IErrorHandlingTextTranslation  
  3) Add error key and text to pageData/language/errors.tsx ERRORS object to both [enCode] and [ptCode] keys  
  4) Use the error key when using serverResolve method  

----//----//----//----//----//----//----//----//----//----//----//----//----//----//----//----//----//----//----    
  
  
    
--//-- Add custom loading  --//--//----//----//----//----//----//----//----//----//----//----//----//----//----  
  
Once again, you have to create a key for the localized loading in settings.tsx  
1) Add key to settings.tsx [LOAD_KEY]  
2) Add key to interfaces/common.tsx on ILocalLoading interface as nullable boolean  
3) Use the key on the server commonServerAction method *1 with flag true to activate loading with async call  
4) Use the reduxState.appSettings.fetchData.loading.localLoading[LOAD_KEY] to activate your loading spinner on HOC  

----//----//----//----//----//----//----//----//----//----//----//----//----//----//----//----//----//----//----  

        
--//-- Add a process  ---//----//--//----//----//----//----//----//----//----//----//----//----//----//----//----  
1) Create the needed interfaces  
--- redux states, redux actions, component props, component states, etc  
2) Create a HOC to have logic layer and connection to redux store  
--- if it fetchs data from server on load, add the action to ComponentDidMount  
--- don't forget to erase the data in store with ComponentWillUnmount  
3) Create Text translation for the process  
4) Create a view to be used on the HOC and present data  
5) Add action types and needed actions  
--- use server common methods to fetch data and create custom errors  
6) Add a reducer to recieve data from server  
--- Don't forget to add reducer default state, add the reducers to CombineReducers and to Istore interface  
7) Create the Route Component  
sample:  
------------------------  
const RouteComponent = hocFunctionLogic(ComponentView);  
class RouteComponentRoute extends React.Component{  
...render(){  
.......return(  
...........< Row >  
...............< Col >  
...................< RouteComponent / >  
...............< / Col >  
...........< / Row >  
.......);  
...}  
}  
export default RouteComponentRoute;  
  
------------------------  
--- if the process needs authenticated user 
------ create the need login component const LoginForm = loginLogic(Login);
------ envolve the route component with < NeedLogin > < RouteComponent / > < / NeedLogin >  
  
Create a key to define the url on settings.tsx  
Add route to Routes.tsx  
const RouteComponentRoute = React.lazy(() => import('./components/Routes/RouteComponentRoute'));  
add - getComponentRoute(RouteComponentRoute, routeComponentRouteUrlKey), to routes array  
  
----//----//----//----//----//----//----//----//----//----//----//----//----//----//----//----//----//----//----  
