import './App.css';
import Home from './pages/home';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Login from './pages/login';
import RealmApolloProvider from "./graphql/RealmApolloProvider";
import { useRealmApp, RealmAppProvider } from "./RealmApp";
import AddProject from './pages/add-project';
import Gateway from './pages/gateway';
import Sidebar from './components/sidebar';

export const APP_ID = "showcase-ofqyl";

const RequireLoggedInUser = ({ children }) => {
  // Only render children if there is a logged in user.
  const app = useRealmApp();
  return app.currentUser ? children : <Login />;
};

function App() {
  console.log('rendered')
  return (
    
    <RealmAppProvider appId={APP_ID}>
      <RequireLoggedInUser>
        <RealmApolloProvider>
          <div className="h-screen flex overflow-hidden bg-white flex-col lg:flex-row">
              
            <Sidebar />
            <div className="m-4 w-full">
              <Router>
                <Switch>
                    <Route path="/" exact component={Gateway} />
                    <Route path="/home" component={Home} />
                    <Route path="/add-project" component={AddProject}/>
                </Switch>
              </Router>
              </div>
          </div>
          
          
        </RealmApolloProvider>
      </RequireLoggedInUser>
    </RealmAppProvider>
  );
}

export default App;
