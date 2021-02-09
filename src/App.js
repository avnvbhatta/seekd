import './App.css';
import Home from './components/home/home';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Confirm from './components/confirm/confirm';
import Login from './components/login/login';
import RealmApolloProvider from "./graphql/RealmApolloProvider";
import { useRealmApp, RealmAppProvider } from "./RealmApp";
import AlmostThere from './components/almost-there/almost-there';
import Gateway from './components/gateway';
import AddProject from './components/add-project';

export const APP_ID = "showcase-ofqyl";

const RequireLoggedInUser = ({ children }) => {
  // Only render children if there is a logged in user.
  const app = useRealmApp();
  return app.currentUser ? children : <Login />;
};

function App() {
  return (
    
    <RealmAppProvider appId={APP_ID}>
      <RequireLoggedInUser>
        <RealmApolloProvider>
          <Router>
              <Switch>
                <Route path="/" exact component={Gateway} />
                <Route path="/home" component={Home} />
                <Route path="/add-project" component={AddProject}/>
              </Switch>
          </Router>
        </RealmApolloProvider>
      </RequireLoggedInUser>
    </RealmAppProvider>
  );
}

export default App;
