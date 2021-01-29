import React from "react";
import { Login } from "./Login";
import { Home } from "./Home";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useSelector } from "react-redux";
import { Tstate } from "./Store/Reducer";
import "./style/App.css";

function App() {
  const Auth = useSelector<Tstate, string>((state) => state.Auth);

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/">
            {Auth === "" ? <Redirect to="/login" /> : <Home />}
          </Route>
          <Route path="/login">
            <Login />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
