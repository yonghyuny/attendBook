import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./SignIn/components/organisms/Register";
import Login from "./SignIn/components/organisms/Login";

const App = () => (
  <Router>
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  </Router>
);

export default App;
