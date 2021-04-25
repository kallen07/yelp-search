import React from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Details from "./components/Details";
import Home from "./components/Home";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/details/:id">
          <Details/>
        </Route>
        <Route path="/">
          <Home/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
