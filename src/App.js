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
import {Provider} from "./contexts/"
import Profile from './pages/profile';
import WithContextRoute from './components/context-hoc';
import Projects from './pages/projects';
import Project from './pages/project';

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
          <Provider>
            <Router>
            <div className="bg-gray-100 h-screen w-full">
              <div className="h-full flex overflow-hidden bg-white flex-col lg:flex-row  mx-auto w-full">
                  <Sidebar />
                  <div className="flex flex-col w-full flex-1 overflow-hidden bg-gray-50">
                      <Switch>
                          <WithContextRoute path="/" exact component={Gateway} />
                          <WithContextRoute path="/home"  component={Home} />
                          <WithContextRoute path="/projects/:project"  component={Project} />
                          <WithContextRoute path="/projects"  component={Projects} />
                          <WithContextRoute path="/add-project"  component={AddProject}/>
                          <WithContextRoute path="/profile"  component={Profile}/>
                          <WithContextRoute path="/profile/:userName" component={Profile}/>
                      </Switch>
                  </div>
                </div>
            </div>
            </Router>
          </Provider>
          
          
          
        </RealmApolloProvider>
      </RequireLoggedInUser>
    </RealmAppProvider>
  );
}

export default App;
