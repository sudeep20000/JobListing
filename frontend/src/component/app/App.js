import React from "react";
import { Route, Routes } from "react-router-dom";
import RegisterPage from "../../pages/register-page/RegisterPage";
import LoginPage from "../../pages/login-page/LoginPage";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/register" element={<RegisterPage />}></Route>
      <Route path="/login" element={<LoginPage />}></Route>
    </Routes>
  );
}

export default App;
