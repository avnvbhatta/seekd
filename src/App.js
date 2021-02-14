import './App.css';
import Login from './pages/login';
import RealmApolloProvider from "./graphql/RealmApolloProvider";
import { useRealmApp, RealmAppProvider } from "./RealmApp";
import {Provider} from "./contexts/"
import Gateway from './pages/gateway';
import { Router } from 'react-router-dom';
import MainApp from './components/main-app';
import { createBrowserHistory } from 'history'
export const APP_ID = "showcase-ofqyl";

const RequireLoggedInUser = ({ children }) => {
  // Only render children if there is a logged in user.
  const app = useRealmApp();
  return app.currentUser ? children : <Login />;
};


function App() {
  const newHistory = createBrowserHistory();

  return (
    <RealmAppProvider appId={APP_ID}>
      <RequireLoggedInUser>
        <RealmApolloProvider>
          <Provider>
              <Router history={newHistory}>
                <Gateway>
                  <MainApp />
                </Gateway>
              </Router>
          </Provider>
        </RealmApolloProvider>
      </RequireLoggedInUser>
    </RealmAppProvider>
  );
}

export default App;
