import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import Login from './page/Login/Login';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route element={<Login/>} path="/Login">

          </Route>
        </Routes>
      </Router>
    
    </div>
  );
}

export default App;
