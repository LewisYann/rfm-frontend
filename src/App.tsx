import React from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './pages/login/login'
import Register from './pages/login/register'
import AuthRoute from './components/route'
import Home from './pages/Dashboard/Home'
import Admin from './layouts/Admin'
import UserProfile from "./pages/UserProfile/UserProfile";
import Setting from "./pages/UserProfile/Setting";
import Control from "./pages/TableList/Control";
import NewMission from "./pages/UserProfile/NewMission";
import Missions from "./pages/TableList/Missions";
import Logout from "./pages/login/logout"

import { BrowserRouter as Router, Routes, Navigate, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home/*" element={<Home />} />
        <Route path="/dashboard/*" element={<Home />} />
        <Route path="/control" element={<Control />} />
        <Route path="/missions" element={<Missions />} />
        <Route path="create/mission" element={<NewMission />} />
        <Route path="/settings" element={<Setting />} />
        <Route path="/profil" element={<UserProfile />} />
      </Routes>
    </Router>

  );
}

export default App;
