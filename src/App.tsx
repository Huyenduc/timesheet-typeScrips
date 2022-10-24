import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import MainApp from './components/MainApp/MainApp';

import Login from './page/Login/Login';
import PrivateRoutes from './router/PrivateRoutes';
import PublicRoute from './router/PublicRoute';
// import Tasks from './page/Login/Tasks/Tasks';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="" element={<Navigate to="/app/task" replace />} />
        <Route element={<PrivateRoutes />}>
          <Route path="/*" element={<MainApp />} />
        </Route>
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>

    </div>
  );
}

export default App;
