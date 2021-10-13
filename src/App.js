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
import IdeaPage from "./Components/IdeaPage/IdeaPage";
import UserAddressProvider from "./Provider/UserAddressProvider";

const App = () => {
  return (
    <div>
      <UserAddressProvider>
        <Router>
          <Header />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/user/dashboard" component={Dashboard} />
            <Route exact path="/user/dashboard/create" component={Create} />
            <Route
              exact
              path="/user/dashboard/profile"
              component={ProfilePage}
            />
            <Route
              exact
              path="/user/dashboard/exploration"
              component={Exploration}
            />
            <Route
              exact
              path="/user/dashboard/exploration/:ideaAddress"
              component={IdeaPage}
            />
          </Switch>
        </Router>
      </UserAddressProvider>
    </div>
  );
};

export default App;
