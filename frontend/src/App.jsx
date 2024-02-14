import ReactDOM from "react-dom/client";
import {  Routes, Route } from "react-router-dom";

import Login from "./components/Login.jsx";
import Signup from "./components/Signup.jsx";
import Home from "./components/Home.jsx";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Signup />} />
      <Route path="home" element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />
    </Routes>
  );
};
export default App;
