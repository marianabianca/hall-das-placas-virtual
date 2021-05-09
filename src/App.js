import * as React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import "./app.css";
import {
  Board,
  ForgotPassword,
  Home,
  Login,
  OrganizerForm,
  Results,
} from "./pages";
import { auth } from "./firebase/firebaseAuth";

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
          <Route exact path="/esqueci-senha">
            <ForgotPassword />
          </Route>
          <Route exact path="/resultados">
            <Results />
          </Route>
          <Route
            exact
            path="/organizador"
            render={() => {
              if (auth.currentUser) {
                return <OrganizerForm />;
              } else {
                return <Redirect to="/login" />;
              }
            }}
          />
          <Route exact path="/placa/:semester">
            <Board />
          </Route>
        </Switch>
      </Router>
    </ChakraProvider>
  );
}

export default App;
