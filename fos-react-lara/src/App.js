//import react
import React from 'react';

//import react router dom
import { Routes, Route } from "react-router-dom";

//import component Register
import Register from './pages/Register';

//import component Login
import Login from './pages/Login';

//import component Register
import Dashboard from './pages/Dashboard';

// import component AddFood
import AddFood from './pages/AddFood';

function App() {
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<Login/>}/>
        <Route exact path="/login" element={<Login/>}/>
        <Route exact path="/register" element={<Register/>} />
        <Route exact path="/dashboard" element={<Dashboard/>} />
        <Route exact path="/add-food" element={<AddFood/>} />
      </Routes>
    </div>
  );
}

export default App;