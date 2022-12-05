import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {Auth0Provider} from "@auth0/auth0-react"
import { GenreProvider } from './components/GenreContext';
import { MoviesProvider } from './components/MoviesContext';
import { UserProvider } from './components/UserContext';
import { ListsProvider } from './components/ListsContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Auth0Provider
      domain="dev-8aqc2zb5rz4y37em.us.auth0.com"
      clientId="g3L93cBf7b00HFhfbpGagUGIzG7m2jhd"
      redirectUri={window.location.origin}>
      <GenreProvider>
        <MoviesProvider>
          <UserProvider>
            <ListsProvider>
              <App />
            </ListsProvider>
          </UserProvider>
        </MoviesProvider>
      </GenreProvider>
    </Auth0Provider>
);