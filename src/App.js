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

export const APP_ID = "showcase-ofqyl";

const RequireLoggedInUser = ({ children }) => {
  // Only render children if there is a logged in user.
  const app = useRealmApp();
  return app.currentUser ? children : <Login />;
};

function App() {
  return (
    // <Router>
    //   <div>
    //     <Switch>
    //       <Route path="/" exact component={Home} />
    //       <Route path="/home" component={Home}/>
    //       <Route path="/confirm" component={Confirm}/>
    //       <Route path="/login" component={Login}/>
    //     </Switch>
    //   </div>
    // </Router>
    <RealmAppProvider appId={APP_ID}>
      <RequireLoggedInUser>
        <RealmApolloProvider>
          <Home />
        </RealmApolloProvider>
      </RequireLoggedInUser>
    </RealmAppProvider>
  );
}

export default App;
