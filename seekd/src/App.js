import logo from './logo.svg';
import './App.css';
import Home from './components/home/home';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";import Confirm from './components/confirm/confirm';
import Login from './components/login/login';

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/home" component={Home}/>
          <Route path="/confirm" component={Confirm}/>
          <Route path="/login" component={Login}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
