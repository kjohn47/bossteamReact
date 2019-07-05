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
---------- Routes.tsx -> Available routes and component redirect  
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
------------- Routes/ -> Add Component here to be used in Routes.tsx. These components are the result of apply logic to view  
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
  
    
--//-- Add text translation --//--  
1) add key to settings.tsx  
2) add interface for the text object  
3) add translation interface for languages using keys [ptCode] and [enCode] of the type of previous interface  
4) add key to interfaces/common.tsx IAppText of type of translation interface  
5) add translation file to pageData/language/ folder with object of type of translation interface  
6) add translation object to pageData/language/index.tsx identified by it's key  
---> [TEXT_KEY]: GetPropertyValue( TEXT_OBJECT, language )  
7) use your tranlation with redux store (reduxstate.appSettings.appText[TEXT_KEY]) on your HOC  
  
----//----//----//----//----//----  
  
  
    
--//-- Add server call ------//--  


----//----//----//----//----//----  
  
    
--// Add Error for server call //-  


----//----//----//----//----//----    
  
  
    
--//-- Add custom loading  --//--  


----//----//----//----//----//----  

        
  
