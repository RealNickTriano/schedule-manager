import { Routes, Route, Link } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <div className="">
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='login' element={<Login />} />
        <Route path='dashboard' element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;
