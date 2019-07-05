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
---------- settings.tsx -> Page Settings and keys  
---------- Routes.tsx -> Available routes and component redirect  
        
  
