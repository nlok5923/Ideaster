import './App.css';
import Home from "./Components/Home/Home"
import 'semantic-ui-css/semantic.min.css'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from './Components/Dashboard/Dashboard';
import Create from './Components/Dashboard/Create/Create';

const App = () => {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/user/dashboard" component={Dashboard} />
          <Route exact path="/user/dashboard/create" component={Create} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
