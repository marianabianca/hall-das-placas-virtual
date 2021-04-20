import * as React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import "./app.css";
import Home from "./Home";

const Login = () => <div>login</div>;
const Results = () => <div>placas</div>;

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/placas">
            <Results />
          </Route>
        </Switch>
      </Router>
    </ChakraProvider>
  );
}

export default App;
