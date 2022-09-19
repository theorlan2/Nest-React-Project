import React from "react";
import { BrowserRouter as Router, Route,  Switch } from "react-router-dom";
import News from '../pages/news/news';
 
function App() {

  return ( 
      <Router  >
        <Switch>
          <Route exact path="/">
            <News />
          </Route> 
        </Switch>
      </Router> )
}

 

export default App;