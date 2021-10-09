import "./App.css";
import React from "react";
import Home from "./Components/Home/Home";
import "semantic-ui-css/semantic.min.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from "./Components/Dashboard/Dashboard";
import Create from "./Components/Dashboard/Create/Create";
import ProfilePage from "./Components/Dashboard/Profile/Profile";
import Header from "./Components/Shared/Header/Header";
import Exploration from "./Components/Dashboard/Exploration/Exploration";

const App = () => {
  return (
    <div>
      <Router>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/user/dashboard" component={Dashboard} />
          <Route exact path="/user/dashboard/create" component={Create} />
          <Route exact path="/user/dashboard/profile" component={ProfilePage} />
          <Route
            exact
            path="/user/dashboard/exploration"
            component={Exploration}
          />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
