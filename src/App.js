import React from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Details from "./components/Details.tsx";
import Search from './components/Search.tsx';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/details/:id">
          <Details/>
        </Route>
        <Route path="/">
          <Search/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
