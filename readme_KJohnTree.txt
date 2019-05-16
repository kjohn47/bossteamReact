Install the dependencies
        npm install (on project folder)

make your changes;

run the project:
        npm run start:dev  ---> compiles and runs client side version
        npm run start:prod ---> compiles and runs with server rendering - access on localhost:3040
        npm run build:all ---> compiles both server and client bundles

        other script:
        npm run jsonserver --> start json rest server only - localhost:4000/rest
        npm run build:client --> build client bundle.js
        npm run build:server --> build server serverbundle.js
        npm run start:client --> start dev server client - localhost:45700
        npm run start:server --> start server express for serverside rendering localhost:3040


project tree:
    ./-- public/-- index.html (html index page)
                -- javascript/ (bundle.js is created here)
                -- site.css (css file for the page)
    
    ./-- build/-- serverbundle.js (server webpack generated javascript -run on express server side)

    ./-- src/-- ClientApp/-- components/-- Views/-- ListerView.tsx (data disposition for lister component)
                                                 -- ListerViewAlt.tsx (other data disposition for lister with buttons instead of links)
 
                                        -- Logic/-- ListerLogic.tsx (HOC for handling data read and update that recieves a view)

                                        -- App.jsx (react main app page where we apply the layout components)
                                        -- Home.tsx (home page component accessed on "/" route. It also has a component made with ListerLogic and ListerViewAlt)
                                        -- Lister.tsx (component made with HOC ListerLogic and ListerView accessed with route /lister)
                                        -- TSTest.tsx (Just a test of typescript. Access with route /tstest)

                          -- interfaces/-- lister.tsx (interfaces for objects related with lister)
                                        -- store.tsx (interface of the current store, update if add new reducers)

                          -- store/-- actionTypes/-- index.tsx (action types constants to use with action {type: })

                                   -- actions/-- lister.tsx (actions for lister, data fetch and data update with axios)

                                   -- reducers/-- index.tsx (combine reducers here, update with new reducers)
                                               -- lister.tsx (reducers for lister (axios middleware used here))

                                   -- configureStore.jsx (store creation and configuration with axios middleware. commented line for testing imutable states on reducers)

                          -- index.jsx (react main page, where we render, add the store and router)
                          -- Routes.jsx (react routes, update when new routes are needed, 404 component in here)                
                          -- Layout.jsx (Layout Component, make your header and footer here, or add more costumization)

             -- ServerApp/-- index.jsx (server express configuration, 404 handle, and data fetch promises handling for server side)
                          -- Renderer.jsx (page template to render on server side)

    ./-- .babelrc (babel config)       
      -- db.json (json server data origin)
      -- jsonServer.js (json server configuration)
      -- main.js (not needed)
      -- package.json (project config and dependencies)
      -- package-lock.json 
      -- tsconfig.js (typescript config)
      -- tslint.js (lint rules typescript)
      -- webpack.base.js (common config of webpack)
      -- webpack.client.js (client config for bundle generation and dev server)
      -- webpack.server.js (server config for serverbundle generation)
    

    install reactstrap, bootstrap and
    npm install style-loader css-loader postcss-loader precss autoprefixer sass-loader --save

    add to index.jsx 

import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';

  module: {
      rules: [
          {
            test: /\.(ts|tsx|js|jsx)$/,
            exclude: /node_modules/,
            use: [
              {
                loader: 'babel-loader'
              }
            ],
          },
          {
            test: /\.css$/,
            use: ['style-loader', 'css-loader'],
          }
        ]
    }
}