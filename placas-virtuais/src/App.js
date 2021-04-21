import * as React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./app.css";
import { Home, Login, OrganizerForm, Results, StudentForm } from "./pages";

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
          <Route exact path="/estudante">
            <StudentForm />
          </Route>
          <Route exact path="/organizador">
            <OrganizerForm />
          </Route>
        </Switch>
      </Router>
    </ChakraProvider>
  );
}

export default App;
