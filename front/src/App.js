import * as React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import "./app.css";

const Home = () => <div>home</div>;
const Login = () => <div>login</div>;
const Results = () => <div>placas</div>;

function App() {
  return (
    <ChakraProvider>
      <Router>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/placas">Placas</Link>
          </li>
        </ul>
        <br></br>
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
