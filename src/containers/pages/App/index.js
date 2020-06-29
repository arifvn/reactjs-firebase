import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";

import { store } from "../../../config/redux";
import Dasboard from "../Dashboard";
import Login from "../Login";
import Register from "../Register";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Route path="/" exact component={Dasboard} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
      </Router>
    </Provider>
  );
}

export default App;
